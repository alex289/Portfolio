import type { NextApiResponse } from 'next';

export function isValidHttpMethod(
  method: string | undefined,
  allowedMethods: string[]
): boolean {
  if (!method) {
    return false;
  }
  return allowedMethods.indexOf(method) !== -1;
}

export const MethodNotAllowed = (res: NextApiResponse) => {
  res.setHeader('Content-Type', 'application/json');
  return res.status(405).json({ message: 'Method not allowed' });
};

export const MethodNotAllowedEdge = () => {
  return new Response(JSON.stringify({ message: 'Method not allowed' }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

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
