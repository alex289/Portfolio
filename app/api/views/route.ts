import { queryBuilder } from '@/lib/db';

export async function GET() {
  try {
    const data = await queryBuilder
      .selectFrom('views')
      .select(['slug', 'count'])
      .execute();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    return new Response(JSON.stringify(e), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
