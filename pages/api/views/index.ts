import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const totalViews = await prisma.views.aggregate({
      _sum: {
        count: true,
      },
    });

    return res.status(200).json({ total: totalViews._sum.count?.toString() });
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    } else {
      return res.status(500).json({ message: 'Unknown error' });
    }
  }
}
