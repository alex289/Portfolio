import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

import { sanityClient } from '@/lib/sanity/sanity-server';
import { postUpdatedQuery } from '@/lib/sanity/queries';
import {
  BadRequest,
  isValidHttpMethod,
  MethodNotAllowed,
  ServerError,
} from '@/lib/api';

import type { NextApiRequest, NextApiResponse } from 'next';

async function stringifyRequest(req: NextApiRequest) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!isValidHttpMethod(req.method, ['POST'])) {
    return MethodNotAllowed(res);
  }

  if (!process.env.SANITY_STUDIO_REVALIDATE_SECRET) {
    return res
      .status(500)
      .json({ message: 'Missing sanity studio revalidate secret' });
  }

  const signature = req.headers[SIGNATURE_HEADER_NAME]?.toString();
  const stringifiedRequest = await stringifyRequest(req);

  if (!signature) {
    return BadRequest(res, 'Missing signature');
  }

  if (
    !isValidSignature(
      stringifiedRequest,
      signature,
      process.env.SANITY_STUDIO_REVALIDATE_SECRET
    )
  ) {
    return res.status(401).json({ message: 'Invalid request' });
  }

  const { _id: id } = JSON.parse(stringifiedRequest);
  if (typeof id !== 'string' || !id) {
    return BadRequest(res, 'Invalid _id');
  }

  try {
    const post = await sanityClient.fetch(postUpdatedQuery, { id });
    const pathToRevalidate = `${post.language === 'de' ? '/de' : ''}/blog/${
      post.slug
    }`;

    await res.revalidate('/blog');
    await res.revalidate(pathToRevalidate);

    return res
      .status(200)
      .json({ message: `[Revalidated] '${pathToRevalidate}' (${id})` });
  } catch (err) {
    return ServerError(res, err);
  }
}

// Next.js will by default parse the body, which can lead to invalid signatures
export const config = {
  api: {
    bodyParser: false,
  },
};
