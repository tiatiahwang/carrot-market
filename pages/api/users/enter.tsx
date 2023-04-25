import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import client from '@/libs/server/client';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const { email, phone } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;
  if (!user)
    return res.status(400).json({
      ok: false,
    });
  const payload = Math.floor(100000 + Math.random() * 900000) + '';
  // const user = await client.user.upsert({
  //   where: {
  //     ...payload,
  //   },
  //   create: {
  //     name: 'anonymous',
  //     ...payload,
  //   },
  //   update: {},
  // });
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: 'anonymous',
            ...user,
          },
        },
      },
    },
  });
  return res.json({
    ok: true,
  });
}

export default withHandler('POST', handler);
