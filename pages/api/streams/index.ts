import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  if (req.method === 'GET') {
    const {
      query: { page },
    } = req;
    const requestedPage = !page ? +page!.toString() : 1;
    let skip: number = (requestedPage - 1) * 10;
    if (!skip) skip = 1;
    const total = await client.stream.count({
      select: {
        _all: true,
      },
    });
    const streams = await client.stream.findMany({
      take: 10,
      skip,
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json({
      ok: true,
      streams,
      total,
    });
  }
  if (req.method === 'POST') {
    const {
      body: { name, price, description },
      session: { user },
    } = req;
    const streams = await client.stream.create({
      data: {
        name,
        price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      streams,
    });
  }
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler }),
);
