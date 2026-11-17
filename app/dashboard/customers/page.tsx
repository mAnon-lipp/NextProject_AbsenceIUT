import StudentsTable from '@/app/ui/customers/table';
import { fetchFilteredCustomers } from '@/app/lib/data';

export default async function Page(props: { searchParams?: Promise<{ query?: string }> }) {
  const searchParams = await props.searchParams;
  const students = await fetchFilteredCustomers(searchParams?.query ?? '');
  return <StudentsTable students={students} />;
}