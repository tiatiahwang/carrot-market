import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import client from '@/libs/server/client';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });
  res.json({
    ok: true,
    profile,
  });
}

export default withIronSessionApiRoute(withHandler('GET', handler), {
  cookieName: 'carrotsession',
  password:
    '13425982905890492039849203844920398492038449203984920384492039849203840923840',
});