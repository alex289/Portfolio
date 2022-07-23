import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidRequest } from '@sanity/webhook';
import { sanityClient } from '@/lib/sanity/sanity-server';
import { postUpdatedQuery } from '@/lib/sanity/queries';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!isValidRequest(req, process.env.SANITY_STUDIO_REVALIDATE_SECRET ?? '')) {
    return res.status(401).json({ message: 'Invalid request' });
  }

  const { _id: id } = req.body;
  if (typeof id !== 'string' || !id) {
    return res.status(400).json({ message: 'Invalid _id' });
  }

  try {
    const slug = await sanityClient.fetch(postUpdatedQuery, { id });
    await Promise.all([
      res.revalidate('/blog'),
      res.revalidate(`/blog/${slug}`),
    ]);
    return res.status(200).json({ message: `Updated ${slug}` });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    } else {
      return res.status(500).json({ message: 'Unknown error' });
    }
  }
}
