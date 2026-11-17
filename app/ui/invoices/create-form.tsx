import { CourseField, Student } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInvoice } from '@/app/lib/actions';

export default function Form({
  students,
  courses,
}: {
  students: Student[];
  courses: CourseField[];
}) {
  return (
     <form action={createInvoice}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="student" className="mb-2 block text-sm font-medium">
            Élève
          </label>
          <div className="relative">
            <select
              id="student"
              name="studentId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Sélectionner un élève
              </option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} ({student.group})
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="course" className="mb-2 block text-sm font-medium">
            Cours
          </label>
          <select id="course" name="courseId" required className="block w-full rounded-md border border-gray-200 py-2 text-sm">
            <option value="" disabled>Sélectionner un cours</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>{course.title} - {course.start}</option>
            ))}
          </select>
        </div>

        <fieldset>
          <legend className="mb-2 block text-sm font-medium">Statut</legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="absent"
                  name="status"
                  type="radio"
                  value="ABSENT"
                  defaultChecked
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="absent"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Absent <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input id="justified" name="status" type="radio" value="JUSTIFIE" className="h-4 w-4 cursor-pointer" />
                <label htmlFor="justified" className="ml-2 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-700">
                  Justifié
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="late"
                  name="status"
                  type="radio"
                  value="RETARD"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="late"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Retard <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
        <label htmlFor="motif" className="mb-2 mt-4 block text-sm font-medium">Motif (facultatif)</label>
        <input id="motif" name="motif" maxLength={255} className="block w-full rounded-md border border-gray-200 py-2 text-sm" />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Créer l'absence</Button>
      </div>
    </form>
  );
}
