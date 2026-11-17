'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth, signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { db } from './db';

const FormSchema = z.object({
  id: z.coerce.number().int().positive().optional(),
  studentId: z.coerce.number().int().positive(),
  courseId: z.coerce.number().int().positive(),
  status: z.enum(['ABSENT', 'RETARD', 'JUSTIFIE']),
  motif: z.string().max(255).nullable(),
});

async function requireAuthentication() {
  const session = await auth();
  if (!session?.user) {
    throw new Error('Unauthorized');
  }
}

export async function createInvoice(formData: FormData): Promise<void> {
  await requireAuthentication();
  const values = FormSchema.omit({ id: true }).parse({
    studentId: formData.get('studentId'),
    courseId: formData.get('courseId'),
    status: formData.get('status'),
    motif: formData.get('motif') || null,
  });

  try {
    await db.query(
      'INSERT INTO absence (eleve_id, cours_id, statut, motif) VALUES (?, ?, ?, ?)',
      [values.studentId, values.courseId, values.status, values.motif],
    );
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Database Error: Failed to create absence.', { cause: error });
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, formData: FormData): Promise<void> {
  await requireAuthentication();
  const values = FormSchema.omit({ id: true }).parse({
    studentId: formData.get('studentId'),
    courseId: formData.get('courseId'),
    status: formData.get('status'),
    motif: formData.get('motif') || null,
  });

  try {
    await db.query(
      'UPDATE absence SET eleve_id = ?, cours_id = ?, statut = ?, motif = ? WHERE id = ?',
      [values.studentId, values.courseId, values.status, values.motif, id],
    );
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Database Error: Failed to update absence.', { cause: error });
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string): Promise<void> {
  await requireAuthentication();
  try {
    await db.query('DELETE FROM absence WHERE id = ?', [id]);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Database Error: Failed to delete absence.', { cause: error });
  }
  revalidatePath('/dashboard/invoices');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      return error.type === 'CredentialsSignin'
        ? 'Invalid credentials.'
        : 'Something went wrong.';
    }
    throw error;
  }
}
