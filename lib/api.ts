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

export const BadRequestEdge = (message?: string) => {
  return new Response(JSON.stringify({ message: message || 'Bad request' }), {
    status: 400,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
