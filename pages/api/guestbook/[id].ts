import { getServerSession } from 'next-auth/next';

import { authOptions } from '../auth/[...nextauth]';
import { queryBuilder } from '@/lib/db';
import {
  BadRequest,
  isValidHttpMethod,
  MethodNotAllowed,
  Unauthorized,
} from '@/lib/api';

import type { NextApiRequest, NextApiResponse } from 'next/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!isValidHttpMethod(req.method, ['DELETE'])) {
    return MethodNotAllowed(res);
  }

  const session = await getServerSession(req, res, authOptions);
  const { id } = req.query;

  if (!id || !Number(id)) {
    return BadRequest(res, 'Invalid id');
  }

  const entryResult = await queryBuilder
    .selectFrom('guestbook')
    .selectAll()
    .where('id', '=', Number(id))
    .execute();

  const entry = entryResult[0];

  if (!entry) {
    return BadRequest(res, 'Entry not found');
  }

  if (
    !session ||
    !session.user ||
    session.user.email !== entry.email ||
    !session.user.isAdmin
  ) {
    return Unauthorized(res);
  }

  await queryBuilder
    .deleteFrom('guestbook')
    .where('id', '=', Number(id))
    .where('email', '=', session.user.email)
    .execute();

  return res.status(204).json({ message: `Deleted entry ${id}` });
}
