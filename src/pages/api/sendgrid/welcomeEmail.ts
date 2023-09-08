import { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import Cors from 'cors';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

// Initializing the cors middleware
const cors = Cors({
  methods: ['POST', 'HEAD'], // Allow these methods
  origin: ["https://app.80kview.com", "http://localhost:3000"] // Add your origins here
});

// Helper method to run cors
function runCors(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// Modify your handler function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run CORS first
  await runCors(req, res, cors);

  const { email, username } = req.body;

  if (req.method === 'POST') {
    try {
      if (email && typeof email === 'string' && username && typeof username === 'string') {
        const msg = {
          to: email,
          from: 'team@80kview.com',
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
