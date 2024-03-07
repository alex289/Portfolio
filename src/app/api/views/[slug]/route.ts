import { getBlogPosts } from '@/lib/blog';
import { queryBuilder } from '@/lib/db';

export async function POST(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  if (!params.slug) {
    return new Response(JSON.stringify({ error: 'No slug provided' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    return new Response(JSON.stringify({ error: 'Post not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const data = await queryBuilder
    .selectFrom('views')
    .where('slug', '=', params.slug)
    .select(['count'])
    .execute();

  const views = data.length ? Number(data[0]?.count) : 0;

  if (views === 0) {
    await queryBuilder
      .insertInto('views')
      .values({ slug: params.slug, count: 1 })
      .execute();
  } else {
    await queryBuilder
      .updateTable('views')
      .set({ count: views + 1 })
      .where('slug', '=', params.slug)
      .execute();
  }

  return new Response(null, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
