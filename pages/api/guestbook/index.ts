import { unstable_getServerSession } from 'next-auth/next';

import { prisma } from '@/lib/prisma';
import { authOptions } from '../auth/[...nextauth]';
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
  if (!isValidHttpMethod(req.method, ['GET', 'POST'])) {
    return MethodNotAllowed(res);
  }

  const session = await unstable_getServerSession(req, res, authOptions);

  if (req.method === 'GET') {
    if (req.query.count) {
      const count = await prisma.guestbook.count();
      return res.status(200).json({ count });
    }

    const entries = await prisma.guestbook.findMany({
      orderBy: {
        updated_at: 'desc',
      },
    });

    return res.status(200).json(
      entries.map((entry) => ({
        id: entry.id.toString(),
        body: entry.body,
        email: session?.user?.email === entry.email ? entry.email : null,
        created_by: entry.created_by,
        updated_at: entry.updated_at,
      }))
    );
  }

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

  const newEntry = await prisma.guestbook.create({
    data: {
      email,
      body: req.body.body.slice(0, 500),
      created_by: name,
    },
  });

  await res.revalidate('/guestbook');

  return res.status(200).json({
    id: newEntry.id.toString(),
    body: newEntry.body,
    created_by: newEntry.created_by,
    updated_at: newEntry.updated_at,
  });
}
