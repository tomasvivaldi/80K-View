import { NextApiRequest, NextApiResponse } from 'next';
// import jwt from 'jsonwebtoken';

import { UPDATE_USER_SUBSCRIPTION } from 'graphql/mutations';

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import fetch from 'cross-fetch';


export const config = {
  api: {
    bodyParser: true, 
  },
};



const wixWebhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {


  const httpLink = createHttpLink({ 
    uri: process.env.STEPZEN_ENDPOINT,
    fetch
  });
  
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
      },
    };
  });
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

if (req.method === 'POST') {
  console.log('Webhook hit with method: POST');
  // console.log('req',req);


  // Assuming the JWT is sent directly in the body or in a specific field
  const token = req.body; // Adjust this if the JWT is nested within the body
console.log('body',req.body);
  // Decode JWT without verifying
  try {
    const wixSubscription = token?.body
console.log("wixSubscription",wixSubscription)

    if (wixSubscription!) {
      try {
        const response = await client.mutate({
          mutation: UPDATE_USER_SUBSCRIPTION,
          variables: { email: wixSubscription, isActive: true },
        });
      
        console.log(`Response:`, response);
        
        if (response.data?.updateUsers) {
          console.log(`User subscription status updated!`, response.data.updateUsers);
        } else {
          console.error(`No user found with email: ${wixSubscription}`);
        }
      } catch (err) {
        console.error(`Failed to update user subscription status: ${err}`);
      }
    }

    console.log('Successfully logged to database!');



    res.status(200).json({ message: 'webhook received' });
  } catch (error) {
    console.error("JWT decoding failed:", error);

    // Log the error and return a response
    return res.status(400).json({ message: 'Failed to decode JWT', error });
  }
} else {
  console.log(`Received method: ${req.method}, only POST is allowed.`);
  res.setHeader('Allow', ['POST']);
  res.status(405).end('Method Not Allowed');
}
};

export default wixWebhookHandler;
