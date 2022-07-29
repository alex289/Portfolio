import { prisma } from '@/lib/prisma';
import {
  BadRequest,
  isValidHttpMethod,
  MethodNotAllowed,
  ServerError,
} from '@/lib/api';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!isValidHttpMethod(req.method, ['GET', 'POST'])) {
    return MethodNotAllowed(res);
  }

  try {
    const slug = req.query.slug?.toString();

    if (!slug) {
      return BadRequest(res, 'Invalid slug');
    }

    if (req.method === 'POST') {
      const newOrUpdatedViews = await prisma.views.upsert({
        where: { slug },
        create: {
          slug,
        },
        update: {
          count: {
            increment: 1,
          },
        },
      });

      return res.status(200).json({
        total: newOrUpdatedViews.count.toString(),
      });
    }

    if (req.method === 'GET') {
      const views = await prisma.views.findUnique({
        where: {
          slug,
        },
      });

      return res.status(200).json({ total: views?.count.toString() });
    }
  } catch (e) {
    return ServerError(res, e);
  }
}
