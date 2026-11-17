import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { StudentsTable } from '@/app/lib/definitions';

export default function StudentsTableView({ students }: { students: StudentsTable[] }) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>Élèves</h1>
      <Search placeholder="Rechercher un élève ou un groupe..." />
      <div className="mt-6 overflow-x-auto rounded-md bg-gray-50 p-2">
        <table className="min-w-full text-left text-gray-900">
          <thead className="text-sm font-medium">
            <tr><th className="px-4 py-5">Nom</th><th className="px-3 py-5">Groupe</th><th className="px-3 py-5">Absences</th></tr>
          </thead>
          <tbody className="bg-white text-sm">
            {students.map((student) => (
              <tr key={student.id} className="border-b">
                <td className="px-4 py-4">{student.name}</td>
                <td className="px-3 py-4">{student.group_name}</td>
                <td className="px-3 py-4">{student.total_absences}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
