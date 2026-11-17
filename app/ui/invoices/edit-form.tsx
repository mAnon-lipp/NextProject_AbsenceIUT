import { AbsenceForm, CourseField, Student } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateInvoice } from '@/app/lib/actions';

export default function EditAbsenceForm({
  invoice,
  students,
  courses,
}: {
  invoice: AbsenceForm;
  students: Student[];
  courses: CourseField[];
}) {
  const updateAbsence = updateInvoice.bind(null, invoice.id);

  return (
    <form action={updateAbsence}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <label htmlFor="student" className="mb-2 block text-sm font-medium">Élève</label>
        <select id="student" name="studentId" defaultValue={invoice.student_id} required className="mb-4 block w-full rounded-md border border-gray-200 py-2 text-sm">
          {students.map((student) => (
            <option key={student.id} value={student.id}>{student.name} ({student.group})</option>
          ))}
        </select>
        <label htmlFor="course" className="mb-2 block text-sm font-medium">Cours</label>
        <select id="course" name="courseId" defaultValue={invoice.course_id} required className="mb-4 block w-full rounded-md border border-gray-200 py-2 text-sm">
          {courses.map((course) => (
            <option key={course.id} value={course.id}>{course.title} - {course.start}</option>
          ))}
        </select>
        <label htmlFor="status" className="mb-2 block text-sm font-medium">Statut</label>
        <select id="status" name="status" defaultValue={invoice.status} required className="mb-4 block w-full rounded-md border border-gray-200 py-2 text-sm">
          <option value="ABSENT">Absent</option>
          <option value="RETARD">Retard</option>
          <option value="JUSTIFIE">Justifié</option>
        </select>
        <label htmlFor="motif" className="mb-2 block text-sm font-medium">Motif (facultatif)</label>
        <input id="motif" name="motif" defaultValue={invoice.motif ?? ''} maxLength={255} className="block w-full rounded-md border border-gray-200 py-2 text-sm" />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/invoices" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600">Annuler</Link>
        <Button type="submit">Modifier l'absence</Button>
      </div>
    </form>
  );
}
