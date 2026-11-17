import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices } from '@/app/lib/data';
import InvoiceStatus from '@/app/ui/invoices/status';

export default async function LatestInvoices() {
  const absences = await fetchLatestInvoices();
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Dernières absences</h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {absences.map((absence, i) => (
            <div key={absence.id} className={clsx('flex items-center justify-between py-4', { 'border-t': i !== 0 })}>
              <div>
                <p className="text-sm font-semibold md:text-base">{absence.student_name}</p>
                <p className="text-sm text-gray-500">{absence.group_name} · {absence.course_title}</p>
              </div>
              <InvoiceStatus status={absence.status} />
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Mis à jour à l'instant</h3>
        </div>
      </div>
    </div>
  );
}
