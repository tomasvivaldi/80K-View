import { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, username } = req.body;

  if (req.method === 'POST') {
    try {
      if (email && typeof email === 'string' && username && typeof username === 'string') {
        const msg = {
          to: email,
          from: 'team@80kview.com', // replace with your email
          subject: 'Thank You for Subscribing',
          text: `Hello ${username}, thank you for subscribing to our service. We are happy to have you with us.`,
          html: `<strong>Hello ${username}, thank you for subscribing to our service. We are happy to have you with us.</strong>`,
        };

        await sgMail.send(msg);
        res.status(200).send('Email sent successfully');
      } else {
        res.status(400).send('Invalid input');
      }
    } catch (error: any) {
      console.error(error);
      res.status(500).send('Error sending email');
    }
  } else {
    res.status(405).send('Method not allowed');
  }
}
