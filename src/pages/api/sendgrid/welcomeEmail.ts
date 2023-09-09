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
            Dear ${username},
        
            Welcome to the beginning of a transformative journey at 80kView!
        
            Life is a vast, intricate tapestry, and sometimes, we get caught up in the finer details, losing sight of the grand, beautiful picture it paints. At 80kView, we invite you to step back, reflect, and gain a broader perspective on your own life.
        
            Our platform serves as a nurturing space where you can:
            1. Journal Your Thoughts: Capture your feelings, thoughts, and experiences in a secure, online journal.
            2. Gain New Insights: Reflect on different aspects of your life and discover patterns and insights that help you grow.
            3. Progress Forward: Use your reflections as a tool for personal growth and progression.
        
            As you begin this journey of self-discovery and reflection, remember, you're not alone. Our community is here to support you every step of the way.
        
            We're eager to witness the beautiful journey that unfolds for you at 80kView. Welcome aboard!
        
            Warm wishes,
            The 80kView Team
          `,
          html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
              <h1 style="color: #2a9d8f;">Dear ${username},</h1>
              
              <p>Welcome to the beginning of a transformative journey at <strong>80kView</strong>!</p>
              
              <p>Life is a vast, intricate tapestry, and sometimes, we get caught up in the finer details, losing sight of the grand, beautiful picture it paints. At 80kView, we invite you to step back, reflect, and gain a broader perspective on your own life.</p>
              
              <p>Our platform serves as a nurturing space where you can:</p>
              <ul>
                <li>Journal Your Thoughts: Capture your feelings, thoughts, and experiences in a secure, online journal.</li>
                <li>Gain New Insights: Reflect on different aspects of your life and discover patterns and insights that help you grow.</li>
                <li>Progress Forward: Use your reflections as a tool for personal growth and progression.</li>
              </ul>
              
              <p>As you begin this journey of self-discovery and reflection, remember, you're not alone. Our community is here to support you every step of the way.</p>
              
              <p>We're eager to witness the beautiful journey that unfolds for you at 80kView. Welcome aboard!</p>
              
              <p style="margin-bottom: 0;">Warm wishes,</p>
              <p style="margin-top: 0;"><strong>The 80kView Team</strong></p>
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
