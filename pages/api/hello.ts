// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// https://nextjs.org/docs/basic-features/typescript#api-routes
import type { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;
  res.json({ name: 'John Doe' });
};
