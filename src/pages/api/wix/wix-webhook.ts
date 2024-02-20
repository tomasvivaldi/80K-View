import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
// import { buffer } from 'micro';
// import { UPDATE_USER_SUBSCRIPTION } from 'graphql/mutations';
// import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
// import fetch from 'cross-fetch';


// const httpLink = createHttpLink({ 
//   uri: process.env.STEPZEN_ENDPOINT,
//   fetch
// });

// const authLink = setContext((_, { headers }) => {
//   return {
//     headers: {
//       ...headers,
//       Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
//     },
//   };
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

export const config = {
  api: {
    bodyParser: false,
  },
};


const wixWebhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
        
  console.log(`Webhook hit with method: ${req.method}`);
  if (req.method === 'POST') {


    const token = req.headers['digest']; // Assuming 'digest' contains the JWT
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

// Ensure token is a string
const tokenString = Array.isArray(token) ? token[0] : token;

try {
  const decoded = jwt.verify(tokenString!, process.env.WIX_PUBLIC_KEY!);

    console.log('Verified JWT:', decoded);





    console.log('Received Wix Webhook:', req.body);

    // Log detailed information
    const {
      plan_id,
      plan_valid_until,
      site_email,
      plan_order_id,
      plan_description,
      site_name,
      plan_title,
      plan_price, // { value, currency }
      plan_start_date,
      contact_id,
      plan_cycle_duration,
      contact, // Includes nested properties like name, email, locale, company, etc.
    } = req.body;

    // Log basic info
    console.log(`Site Name: ${site_name}, Site Email: ${site_email}, Plan Title: ${plan_title}`);
    console.log(`Plan ID: ${plan_id}, Order ID: ${plan_order_id}, Plan Description: ${plan_description}`);
    console.log(`Plan Start Date: ${plan_start_date}, Plan Valid Until: ${plan_valid_until}`);
    console.log(`Plan Price: ${plan_price?.value} ${plan_price?.currency}, Plan Cycle Duration: ${plan_cycle_duration}`);
    console.log(`Contact ID: ${contact_id}`);
    
    // Log contact details
    console.log(`Contact Name: ${contact?.name?.first} ${contact?.name?.last}, Contact Email: ${contact?.email}`);
    console.log(`Contact Locale: ${contact?.locale}, Contact Company: ${contact?.company}`);
    console.log(`Contact Address: ${contact?.address?.formattedAddress}, Contact Phone: ${contact?.phone}`);
    console.log(`Contact Job Title: ${contact?.jobTitle}, Contact Birthdate: ${contact?.birthdate}`);
    
    // Additional contact details if needed
    console.log(`Contact City: ${contact?.address?.city}, Contact Country: ${contact?.address?.country}`);
    console.log(`Contact Postal Code: ${contact?.address?.postalCode}`);
    console.log(`Contact Address Line 1: ${contact?.address?.addressLine}, Contact Address Line 2: ${contact?.address?.addressLine2}`);
    console.log(`Contact Address Subdivision: ${contact?.address?.subdivision}`);

    res.status(200).json({ message: 'Webhook received and verified' });
  } catch (error) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
  }
  } else {
    // If the request is not a POST, send a 405 Method Not Allowed response
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default wixWebhookHandler;




