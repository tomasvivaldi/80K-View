import { NextApiRequest, NextApiResponse } from 'next';

const wixWebhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    console.log('Received Wix Webhook:', req.body);

    // Send a response back to Wix to acknowledge receipt
    res.status(200).json({ message: 'Webhook received successfully' });
  } else {
    // If the request is not a POST, send a 405 Method Not Allowed response
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default wixWebhookHandler;
