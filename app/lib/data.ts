import {
  AbsenceForm,
  AbsenceTable,
  CourseField,
  LatestAbsence,
  Revenue,
  Student,
  StudentsTable,
} from './definitions';
import { queryRows } from './db';

const ITEMS_PER_PAGE = 6;

export async function fetchRevenue(): Promise<Revenue[]> {
  try {
    return await queryRows<Revenue>(`
      SELECT DATE_FORMAT(c.heure_debut, '%b') AS month,
             COUNT(a.id) AS revenue
      FROM cours c
      LEFT JOIN absence a ON a.cours_id = c.id
      WHERE c.heure_debut >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
      GROUP BY YEAR(c.heure_debut), MONTH(c.heure_debut), DATE_FORMAT(c.heure_debut, '%b')
      ORDER BY YEAR(c.heure_debut), MONTH(c.heure_debut)
    `);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch absence statistics.');
  }
}

export async function fetchLatestInvoices(): Promise<LatestAbsence[]> {
  try {
    return await queryRows<LatestAbsence>(`
      SELECT a.id, e.nom_prenom AS student_name,
             g.groupe AS group_name, c.titre AS course_title,
             a.statut AS status
      FROM absence a
      JOIN eleve e ON e.id = a.eleve_id
      JOIN groupe g ON g.id = e.groupe_id
      JOIN cours c ON c.id = a.cours_id
      ORDER BY a.created_at DESC
      LIMIT 5
    `);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch latest absences.');
  }
}

export async function fetchCardData() {
  try {
    const [absenceCount, studentCount, courseCount, justifiedCount] =
      await Promise.all([
        queryRows<{ count: number }>('SELECT COUNT(*) AS count FROM absence'),
        queryRows<{ count: number }>('SELECT COUNT(*) AS count FROM eleve'),
        queryRows<{ count: number }>('SELECT COUNT(*) AS count FROM cours'),
        queryRows<{ count: number }>(
          "SELECT COUNT(*) AS count FROM absence WHERE statut = 'JUSTIFIE'",
        ),
      ]);

    return {
      numberOfInvoices: Number(absenceCount[0]?.count ?? 0),
      numberOfCustomers: Number(studentCount[0]?.count ?? 0),
      numberOfCourses: Number(courseCount[0]?.count ?? 0),
      numberOfJustified: Number(justifiedCount[0]?.count ?? 0),
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch absence summary.');
  }
}

const absenceSearch = (query: string) => {
  const value = `%${query}%`;
  return [value, value, value, value, value];
};

const absenceWhere = `
  WHERE e.nom_prenom LIKE ?
     OR g.groupe LIKE ?
     OR c.titre LIKE ?
     OR a.statut LIKE ?
     OR COALESCE(a.motif, '') LIKE ?
`;

const absenceJoins = `
  FROM absence a
  JOIN eleve e ON e.id = a.eleve_id
  JOIN groupe g ON g.id = e.groupe_id
  JOIN cours c ON c.id = a.cours_id
`;

export async function fetchFilteredInvoices(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    return await queryRows<AbsenceTable>(
      `SELECT a.id, e.nom_prenom AS student_name,
              g.groupe AS group_name, c.titre AS course_title,
              c.heure_debut AS start, a.statut AS status, a.motif
       ${absenceJoins}
       ${absenceWhere}
       ORDER BY c.heure_debut DESC
       LIMIT ? OFFSET ?`,
      [...absenceSearch(query), ITEMS_PER_PAGE, offset],
    );
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch absences.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const data = await queryRows<{ count: number }>(
      `SELECT COUNT(*) AS count ${absenceJoins} ${absenceWhere}`,
      absenceSearch(query),
    );
    return Math.ceil(Number(data[0]?.count ?? 0) / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of absences.');
  }
}

export async function fetchInvoiceById(id: string): Promise<AbsenceForm | undefined> {
  try {
    const data = await queryRows<AbsenceForm>(
      `SELECT id, eleve_id AS student_id, cours_id AS course_id,
              statut AS status, motif
       FROM absence WHERE id = ?`,
      [id],
    );
    return data[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch absence.');
  }
}

export async function fetchCustomers(): Promise<Student[]> {
  try {
    return await queryRows<Student>(`
      SELECT e.id, e.nom_prenom AS name, g.groupe AS \`group\`
      FROM eleve e JOIN groupe g ON g.id = e.groupe_id
      ORDER BY e.nom_prenom
    `);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch students.');
  }
}

export async function fetchCourses(): Promise<CourseField[]> {
  try {
    return await queryRows<CourseField>(
      'SELECT id, titre AS title, heure_debut AS start FROM cours ORDER BY heure_debut DESC',
    );
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch courses.');
  }
}

export async function fetchFilteredCustomers(query: string): Promise<StudentsTable[]> {
  try {
    return await queryRows<StudentsTable>(
      `SELECT e.id, e.nom_prenom AS name,
              g.groupe AS group_name, COUNT(a.id) AS total_absences
       FROM eleve e
       JOIN groupe g ON g.id = e.groupe_id
       LEFT JOIN absence a ON a.eleve_id = e.id
       WHERE e.nom_prenom LIKE ? OR g.groupe LIKE ?
       GROUP BY e.id, e.nom_prenom, g.groupe
       ORDER BY e.nom_prenom`,
      [`%${query}%`, `%${query}%`],
    );
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch student table.');
  }
}
