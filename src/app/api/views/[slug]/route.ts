import { eq } from 'drizzle-orm';

import { getBlogPosts } from '@/lib/blog';
import { db } from '@/lib/db';
import { views } from '@/lib/db/schema';

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const slug = (await params).locale;
  if (!slug) {
    return new Response(JSON.stringify({ error: 'No slug provided' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    return new Response(JSON.stringify({ error: 'Post not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const data = await db
    .select()
    .from(views)
    .where(eq(views.slug, slug))
    .execute();

  const actualViews = data.length ? Number(data[0]?.count) : 0;

  if (actualViews === 0) {
    await db.insert(views).values({ slug: slug, count: 1 }).execute();
  } else {
    await db
      .update(views)
      .set({ count: actualViews + 1 })
      .where(eq(views.slug, slug))
      .execute();
  }

  return new Response(null, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
