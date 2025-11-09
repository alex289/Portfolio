import { getBlogPosts } from '@/lib/blog';

export const runtime = 'edge';

export async function GET() {
  try {
    const posts = getBlogPosts();
    const translationMap = posts.reduce(
      (acc, post) => {
        acc[post.slug] = post.translation;
        return acc;
      },
      {} as Record<string, string>,
    );

    return new Response(JSON.stringify(translationMap), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (e) {
    console.error('Error fetching blog translations:', e);
    return new Response(JSON.stringify({}), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

