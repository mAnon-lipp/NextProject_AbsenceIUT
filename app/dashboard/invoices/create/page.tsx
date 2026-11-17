import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchCourses } from '@/app/lib/data';
 
export default async function Page() {
  const [students, courses] = await Promise.all([fetchCustomers(), fetchCourses()]);
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form students={students} courses={courses} />
    </main>
  );
}