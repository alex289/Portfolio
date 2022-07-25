import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import { sanityClient } from '@/lib/sanity/sanity-server';
import { postUpdatedQuery } from '@/lib/sanity/queries';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!process.env.SANITY_STUDIO_REVALIDATE_SECRET) {
    return res
      .status(500)
      .json({ message: 'Missing sanity studio revalidate secret' });
  }

  const signature = req.headers[SIGNATURE_HEADER_NAME] as string;
  const body = await readBody(req); // Read the body into a string
  if (
    !isValidSignature(
      body,
      signature,
      process.env.SANITY_STUDIO_REVALIDATE_SECRET
    )
  ) {
    return res.status(401).json({ message: 'Invalid request' });
  }

  const { _id: id } = JSON.parse(body);
  if (typeof id !== 'string' || !id) {
    return res.status(400).json({ message: 'Invalid _id' });
  }

  try {
    const slug = await sanityClient.fetch(postUpdatedQuery, { id });
    await Promise.all([
      res.revalidate('/blog'),
      res.revalidate(`/blog/${slug}`),
    ]);
    return res.status(200).json({ message: `Revalidated '${slug}' (${id})` });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    } else {
      return res.status(500).json({ message: 'Unknown error' });
    }
  }
}

// Next.js will by default parse the body, which can lead to invalid signatures
export const config = {
  api: {
    bodyParser: false,
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function readBody(readable: any) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}
