import { ServerError } from '@/lib/api';
import { queryBuilder } from '@/lib/db';

import type { NextApiRequest, NextApiResponse } from 'next/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await queryBuilder
      .selectFrom('views')
      .select(['slug', 'count'])
      .execute();

    return res.status(200).json(data);
  } catch (e) {
    return ServerError(res, e);
  }
}
