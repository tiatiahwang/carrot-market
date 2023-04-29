import twilio from 'twilio';
import nodemailer from 'nodemailer';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import client from '@/libs/server/client';

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASS,
  },
});

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const { email, phone } = req.body;
  const user = phone ? { phone } : email ? { email } : null;
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
  if (email) {
    // const mailOptions = {
    //   from: process.env.MAILER_EMAIL,
    //   to: email,
    //   subject: 'Carrot Market Authentication Email',
    //   text: `Authentication Code: ${payload}`,
    // };
    // await transporter.sendMail(mailOptions, (error, result) => {
    //   if (error) {
    //     console.log('Email Authentication Error :', error);
    //   } else {
    //     console.log('Email Sent: ', result.response);
    //   }
    // });
  }
  // if (phone) {
  //   const message = await twilioClient.messages.create({
  //     messagingServiceSid: process.env.TWILIO_MSID,
  //     to: process.env.MY_PHONE!,
  //     body: `Your login token is ${payload}`,
  //   });
  //   console.log(message);
  // }
  return res.json({
    ok: true,
  });
}

export default withHandler({ method: 'POST', handler, isPrivate: false });
