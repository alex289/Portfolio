import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  res.clearPreviewData();
  res.redirect(307, '/');
  res.end();
}
