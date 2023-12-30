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

  const post = getBlogPosts().find(
    (post) => post.id === Number(params.slug.split('-').pop()),
  );

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
    .where('slug', '=', post.slug)
    .select(['count'])
    .execute();

  const views = !data.length ? 0 : Number(data[0]?.count);

  await queryBuilder
    .insertInto('views')
    .values({ slug: params.slug, count: 1 })
    .onDuplicateKeyUpdate({ count: views + 1 })
    .execute();

  return new Response(null, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
