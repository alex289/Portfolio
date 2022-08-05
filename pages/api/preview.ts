import { postBySlugQuery } from '@/lib/sanity/queries';
import { previewClient } from '@/lib/sanity/sanity-server';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.SANITY_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  res.setPreviewData({});

  if (req.query.slug) {
    const post = await previewClient.fetch(postBySlugQuery, {
      slug: req.query.slug,
    });

    if (!post) {
      return res.status(401).json({ message: 'Invalid slug' });
    }

    res.writeHead(307, { Location: `/blog/${post.slug}` });
  } else {
    res.writeHead(307, { Location: '/blog' });
  }

  return res.end();
}
