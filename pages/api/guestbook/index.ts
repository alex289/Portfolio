import { getServerSession } from 'next-auth/next';

import { authOptions } from '../auth/[...nextauth]';
import { queryBuilder } from '@/lib/db';
import {
  BadRequest,
  isValidHttpMethod,
  MethodNotAllowed,
  Unauthorized,
} from '@/lib/api';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!isValidHttpMethod(req.method, ['POST'])) {
    return MethodNotAllowed(res);
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user || !session.user.email || !session.user.name) {
    return Unauthorized(res);
  }

  const { email, name } = session.user;

  if (
    typeof req.body.body !== 'string' ||
    req.body.body.trim().length === 0 ||
    !req.body.body
  ) {
    return BadRequest(res, 'Invalid body');
  }

  const newEntry = await queryBuilder
    .insertInto('guestbook')
    .values({
      email,
      body: (req.body.body || '').slice(0, 500),
      created_by: name,
    })
    .execute();

  if (!newEntry[0]) {
    return BadRequest(res, 'Could not create entry');
  }

  return res.status(201).json({
    id: Number(newEntry[0].insertId),
    body: (req.body.body || '').slice(0, 500),
    created_by: name,
    updated_at: Date.now(),
  });
}
