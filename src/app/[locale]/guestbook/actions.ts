'use server';

import { and, count, desc, eq, gte } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { guestbook } from '@/lib/db/schema';
import { z } from 'zod';
import { routing } from '@/i18n/routing';

export async function getMessages() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const entries = await db
    .select()
    .from(guestbook)
    .orderBy(desc(guestbook.created_at))
    .limit(100);

  if (session) {
    return entries.map((entry) => ({
      id: entry.id,
      createdBy: entry.created_by,
      body: entry.body,
      createdAt: entry.created_at,
      isOwn:
        entry.email === session.user.email ||
        session.user.email === process.env.ADMIN_EMAIL,
    }));
  }

  return entries.map((entry) => ({
    id: entry.id,
    createdBy: entry.created_by,
    body: entry.body,
    createdAt: entry.created_at,
  }));
}

const messageSchema = z.string().min(1).max(500);

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

export async function createMessage(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error('Unauthorized');
  }

  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS);
  const [{ value: recentCount }] = await db
    .select({ value: count() })
    .from(guestbook)
    .where(
      and(
        eq(guestbook.email, session.user.email),
        gte(guestbook.created_at, windowStart),
      ),
    );

  if (recentCount >= RATE_LIMIT_MAX) {
    throw new Error('RATE_LIMIT_EXCEEDED');
  }

  const message = formData.get('message');
  const validationResult = messageSchema.safeParse(message);

  if (!validationResult.success) {
    throw new Error(validationResult.error.message);
  }

  await db.insert(guestbook).values({
    email: session.user.email,
    created_by: session.user.name,
    body: validationResult.data.trim(),
  });

  for (const lang of routing.locales) {
    revalidatePath(`/${lang}/guestbook`, 'page');
  }
}

export async function deleteMessage(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error('Unauthorized');
  }

  const entryResult = await db
    .select()
    .from(guestbook)
    .where(eq(guestbook.id, id))
    .execute();

  const entry = entryResult[0];

  if (!entry) {
    throw new Error('Message not found');
  }

  if (
    entry.email !== session.user.email &&
    session.user.email !== process.env.ADMIN_EMAIL
  ) {
    throw new Error('Unauthorized');
  }

  await db.delete(guestbook).where(eq(guestbook.id, id));

  for (const lang of routing.locales) {
    revalidatePath(`/${lang}/guestbook`, 'page');
  }
}
