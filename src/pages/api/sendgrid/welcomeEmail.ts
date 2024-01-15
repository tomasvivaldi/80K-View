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
          subject: 'Embark on Your Journey of Reflection with 80kView!',
          text: `
          Hey ${username}!

          It’s Sam, thanks for signing up to use 80k View.

          6 years ago - “I knew I was capable of more”.

          I bet you know this too. In your job, in your career, in your personal life and deep down it sits with you every day.

          So I took action, built a spreadsheet to help me understand my current position, identify opportunities, and point me in the right direction with the hope of it leading to a more fulfilling life.

          Thankfully it worked and I’ve used it religiously every month since - 73 and counting - so thought it might be something that could help others, therefore decided to turn it into an app.

          The main thing I’ve learned is too many people get stuck planning. The reality is, it’s all about action.

          80k View is unusual because unlike other apps, it has been designed so you only need to use it once a month to receive the full benefits. If you miss a month, no worries the world still spins, pick it up next month.

          1x, 20-30 minute reflection session a month to calm your anxieties and ensure you are on right track, giving you the rest of the month to take action.

          We’re excited to support you on your journey and if you have any questions, feel free to reach out. 

          We respond to all emails.

          Sam

          Ps. if you do it for long enough, the HUGE bonus benefit is you are left with an incredible life journal for retrospection. 

          How it works video here: https://youtu.be/LMPz4TBG7B8
        `,
          html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h1 style="color: #2a9d8f;">Hey ${username}!</h1>
            
            <p>It’s Sam, thanks for signing up to use 80k View.</p>
            
            <p>6 years ago - “I knew I was capable of more”.</p>

            <p>I bet you know this too. In your job, in your career, in your personal life and deep down it sits with you every day.</p>

            <p>So I took action, built a spreadsheet to help me understand my current position, identify opportunities, and point me in the right direction with the hope of it leading to a more fulfilling life.</p>

            <p>Thankfully it worked and I’ve used it religiously every month since - 73 and counting - so thought it might be something that could help others, therefore decided to turn it into an app.</p>

            <p>The main thing I’ve learned is too many people get stuck planning. The reality is, it’s all about action.</p>

            <p>80k View is unusual because unlike other apps, it has been designed so you only need to use it once a month to receive the full benefits. If you miss a month, no worries the world still spins, pick it up next month.</p>

            <p>1x, 20-30 minute reflection session a month to calm your anxieties and ensure you are on right track, giving you the rest of the month to take action.</p>

            <p>We’re excited to support you on your journey and if you have any questions, feel free to reach out. We respond to all emails.</p>

            <p><strong>Sam</strong></p>

            <p>Ps. if you do it for long enough, the HUGE bonus benefit is you are left with an incredible life journal for retrospection.</p>

            <p><a href="https://youtu.be/LMPz4TBG7B8">How it works video here</a></p>
          </div>
          `,
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
