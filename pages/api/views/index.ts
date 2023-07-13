import { isValidHttpMethod, MethodNotAllowed, ServerError } from '@/lib/api';
import { prisma } from '@/lib/prisma';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!isValidHttpMethod(req.method, ['GET'])) {
    return MethodNotAllowed(res);
  }

  try {
    const totalViews = await prisma.views.aggregate({
      _sum: {
        count: true,
      },
    });

    return res.status(200).json({ total: totalViews._sum.count?.toString() });
  } catch (e) {
    return ServerError(res, e);
  }
}
