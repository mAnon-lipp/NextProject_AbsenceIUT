import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal } from '@/app/lib/utils';
import { fetchFilteredInvoices } from '@/app/lib/data';

export default async function InvoicesTable({ query, currentPage }: { query: string; currentPage: number }) {
  const absences = await fetchFilteredInvoices(query, currentPage);
  return (
    <div className="mt-6 flow-root">
      <div className="overflow-x-auto rounded-lg bg-gray-50 p-2">
        <table className="min-w-full text-gray-900">
          <thead className="text-left text-sm font-medium">
            <tr>
              <th className="px-4 py-5">Élève</th>
              <th className="px-3 py-5">Groupe</th>
              <th className="px-3 py-5">Cours</th>
              <th className="px-3 py-5">Date</th>
              <th className="px-3 py-5">Statut</th>
              <th className="px-3 py-5"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {absences.map((absence) => (
              <tr key={absence.id} className="border-b text-sm">
                <td className="px-4 py-3">{absence.student_name}</td>
                <td className="px-3 py-3">{absence.group_name}</td>
                <td className="px-3 py-3">{absence.course_title}</td>
                <td className="px-3 py-3">{formatDateToLocal(absence.start, 'fr-FR')}</td>
                <td className="px-3 py-3"><InvoiceStatus status={absence.status} /></td>
                <td className="px-3 py-3">
                  <div className="flex justify-end gap-3">
                    <UpdateInvoice id={absence.id} />
                    <DeleteInvoice id={absence.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
