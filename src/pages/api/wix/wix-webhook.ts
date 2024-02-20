// import { NextApiRequest, NextApiResponse } from 'next';

// // import { buffer } from 'micro';
// // import { UPDATE_USER_SUBSCRIPTION } from 'graphql/mutations';
// // import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// // import { setContext } from '@apollo/client/link/context';
// // import fetch from 'cross-fetch';
// import crypto from 'crypto';

// // Example function to validate the HMAC-SHA256 signature
// const validateSignature = (sharedSecret: string, body: string, retrievedSignature: string | string[]) => {
//   const computedSignature = crypto.createHmac('SHA256', sharedSecret).update(body).digest('base64');
//   const computed = Buffer.from(computedSignature, 'base64');
//   const retrieved = Buffer.from(Array.isArray(retrievedSignature!) ? retrievedSignature[0]! : retrievedSignature, 'base64');
//   return crypto.timingSafeEqual(computed, retrieved);
// };


// // const httpLink = createHttpLink({ 
// //   uri: process.env.STEPZEN_ENDPOINT,
// //   fetch
// // });

// // const authLink = setContext((_, { headers }) => {
// //   return {
// //     headers: {
// //       ...headers,
// //       Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
// //     },
// //   };
// // });

// // const client = new ApolloClient({
// //   link: authLink.concat(httpLink),
// //   cache: new InMemoryCache(),
// // });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const wixWebhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
        
//   console.log(`Webhook hit with method: ${req.method}`);
//   if (req.method === 'POST') {


//     const token = req.headers['x-vercel-sc-headers']; 
//     console.log("req.headers",req.headers)
//     if (!token) {
//       return res.status(401).json({
//         message: 'No token provided',
//         headers: req.headers // Pass the headers in the response for debugging
//     });
        
//     }
// // Assuming you've set your shared secret as an environment variable
// const sharedSecret = process.env.WIX_WEBHOOK_KEY!;
    
// // Retrieve the signature from the headers
// const retrievedSignature = req.headers['x-answers-signature'];
// if (!retrievedSignature) {
//   return res.status(401).json({ message: 'No signature provided' });
// }

// // Raw body is needed for signature validation, ensure your Next.js API route is configured to parse body as text
// const body = await new Promise<string>((resolve) => {
//   let data = '';
//   req.on('data', (chunk) => {
//     data += chunk;
//   });
//   req.on('end', () => {
//     resolve(data);
//   });
// });

// const isValidSignature = validateSignature(sharedSecret, body, retrievedSignature);
// if (!isValidSignature) {
//   return res.status(401).json({ message: 'Invalid signature',headers: req.headers  });}





//     console.log('Received Wix Webhook:', req.body);

//     // Log detailed information
//     const {
//       plan_id,
//       plan_valid_until,
//       site_email,
//       plan_order_id,
//       plan_description,
//       site_name,
//       plan_title,
//       plan_price, // { value, currency }
//       plan_start_date,
//       contact_id,
//       plan_cycle_duration,
//       contact, // Includes nested properties like name, email, locale, company, etc.
//     } = req.body;

//     // Log basic info
//     console.log(`Site Name: ${site_name}, Site Email: ${site_email}, Plan Title: ${plan_title}`);
//     console.log(`Plan ID: ${plan_id}, Order ID: ${plan_order_id}, Plan Description: ${plan_description}`);
//     console.log(`Plan Start Date: ${plan_start_date}, Plan Valid Until: ${plan_valid_until}`);
//     console.log(`Plan Price: ${plan_price?.value} ${plan_price?.currency}, Plan Cycle Duration: ${plan_cycle_duration}`);
//     console.log(`Contact ID: ${contact_id}`);
    
//     // Log contact details
//     console.log(`Contact Name: ${contact?.name?.first} ${contact?.name?.last}, Contact Email: ${contact?.email}`);
//     console.log(`Contact Locale: ${contact?.locale}, Contact Company: ${contact?.company}`);
//     console.log(`Contact Address: ${contact?.address?.formattedAddress}, Contact Phone: ${contact?.phone}`);
//     console.log(`Contact Job Title: ${contact?.jobTitle}, Contact Birthdate: ${contact?.birthdate}`);
    
//     // Additional contact details if needed
//     console.log(`Contact City: ${contact?.address?.city}, Contact Country: ${contact?.address?.country}`);
//     console.log(`Contact Postal Code: ${contact?.address?.postalCode}`);
//     console.log(`Contact Address Line 1: ${contact?.address?.addressLine}, Contact Address Line 2: ${contact?.address?.addressLine2}`);
//     console.log(`Contact Address Subdivision: ${contact?.address?.subdivision}`);

//     res.status(200).json({ message: 'Webhook received and verified' });
//   // } catch (error) {
//   //     return res.status(401).json({ message: 'Failed to authenticate token' });
//   // }
//   } else {
//     // If the request is not a POST, send a 405 Method Not Allowed response
//     res.setHeader('Allow', 'POST');
//     res.status(405).end('Method Not Allowed');
//   }
// };

// export default wixWebhookHandler;



import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export const config = {
  api: {
    bodyParser: false, // Important for accessing the raw body
  },
};

const wixWebhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(`Webhook hit with method: ${req.method}`);

  console.log("Received headers:", req.headers);

  if (req.method !== 'POST') {
    console.warn(`Received non-POST method: ${req.method}`);
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
    return;
  }

  const signatureHeader = req.headers['x-answers-signature'];
  console.log("X-Answers-Signature Header:", signatureHeader);

  if (!signatureHeader) {
    console.warn("X-Answers-Signature header not found. Proceeding without signature validation for testing purposes only.");
    // In production, you should not bypass this validation.
    // res.status(401).json({ message: 'No X-Answers-Signature header provided' });
    // return;
  }
  

  // Assuming you've set your Wix secret as an environment variable
  const sharedSecret = process.env.WIX_PUBLIC_KEY;
  console.log("Shared secret is set:", !!sharedSecret); // Logs true if set, false otherwise. Do not log the secret itself.

  try {
    const body = await new Promise<string>((resolve) => {
      let data = '';
      req.on('data', (chunk) => {
        data += chunk;
      });
      req.on('end', () => {
        resolve(data);
      });
    });

    console.log("Raw body received for signature validation.");

    //@ts-ignore
    const hash = crypto.createHmac('SHA256', sharedSecret).update(body).digest('base64');
    console.log("Computed hash:", hash);

    if (signatureHeader !== hash) {
      console.error("Computed hash does not match X-Answers-Signature header.");
      res.status(401).json({ message: 'Invalid signature' });
      return;
    }

    // Proceed with processing the webhook payload
    console.log("Signature validated successfully.");
    res.status(200).json({ message: 'Webhook received and signature validated' });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default wixWebhookHandler;
