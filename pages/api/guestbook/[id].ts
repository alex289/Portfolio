import { unstable_getServerSession } from 'next-auth/next';

import prisma from '@/lib/prisma';
import { authOptions } from '../auth/[...nextauth]';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const { id } = req.query;

  const entry = await prisma.guestbook.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!entry) {
    return res.status(400).send('Can not find the entry');
  }

  if (req.method === 'GET') {
    return res.json({
      id: entry.id.toString(),
      body: entry.body,
      created_by: entry.created_by,
      updated_at: entry.updated_at,
    });
  }

  if (!session || session.user?.email !== entry.email) {
    return res.status(403).send('Unauthorized');
  }

  if (req.method === 'DELETE') {
    await prisma.guestbook.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({});
  }

  if (req.method === 'PUT') {
    const body = (req.body.body || '').slice(0, 500);

    await prisma.guestbook.update({
      where: {
        id: Number(id),
      },
      data: {
        body,
        updated_at: new Date().toISOString(),
      },
    });

    return res.status(201).json({
      ...entry,
      body,
    });
  }

  return res.send('Method not allowed.');
}
