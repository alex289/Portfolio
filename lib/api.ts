import type { NextApiResponse } from 'next/types';

export const BadRequest = (res: NextApiResponse, message?: string) => {
  res.setHeader('Content-Type', 'application/json');
  return res.status(400).json({ message: message || 'Bad request' });
};

export const BadRequestEdge = (message?: string) => {
  return new Response(JSON.stringify({ message: message || 'Bad request' }), {
    status: 400,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const Unauthorized = (res: NextApiResponse) => {
  res.setHeader('Content-Type', 'application/json');
  return res.status(401).json({ message: 'Unauthorized' });
};

export const ServerError = (res: NextApiResponse, error: unknown) => {
  res.setHeader('Content-Type', 'application/json');
  if (error instanceof Error) {
    return res.status(500).json({ message: error.message });
  } else {
    return res.status(500).json({ message: 'Unknown error' });
  }
};
