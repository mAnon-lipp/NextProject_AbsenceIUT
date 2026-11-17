import { CheckIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-red-100 text-red-700': status === 'ABSENT',
          'bg-orange-100 text-orange-700': status === 'RETARD',
          'bg-green-500 text-white': status === 'JUSTIFIE',
        },
      )}
    >
      {status === 'ABSENT' ? (
        <>
          Absent
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'RETARD' ? (
        <>
          Retard
          <ExclamationTriangleIcon className="ml-1 w-4" />
        </>
      ) : null}
      {status === 'JUSTIFIE' ? (
        <>
          Justifié
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
