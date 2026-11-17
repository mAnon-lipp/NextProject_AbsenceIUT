// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Student = {
  id: string;
  name: string;
  group: string;
};

export type CourseField = {
  id: string;
  title: string;
  start: string;
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestAbsence = {
  id: string;
  student_name: string;
  group_name: string;
  course_title: string;
  status: AbsenceStatus;
};

export type AbsenceStatus = 'ABSENT' | 'RETARD' | 'JUSTIFIE';

export type AbsenceTable = {
  id: string;
  student_name: string;
  group_name: string;
  course_title: string;
  start: string;
  status: AbsenceStatus;
  motif: string | null;
};

export type StudentsTable = {
  id: string;
  name: string;
  group_name: string;
  total_absences: number;
};

export type AbsenceForm = {
  id: string;
  student_id: string;
  course_id: string;
  status: AbsenceStatus;
  motif: string | null;
};
