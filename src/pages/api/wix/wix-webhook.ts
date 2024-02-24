import { NextApiRequest, NextApiResponse } from 'next';
// import jwt from 'jsonwebtoken';
import { ADD_WIX_SUBSCRIPTION } from 'graphql/mutations';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import fetch from 'cross-fetch';

import { useQuery } from '@apollo/client';
import { GET_USER_BY_EMAIL } from 'graphql/queries';
import { ACTIVATE_USER_SUBSCRIPTION } from 'graphql/mutations';

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

  try {
    const wixSubscription = req.body.data

    const { data: userData, loading: userDataLoading } = useQuery(GET_USER_BY_EMAIL, {
      variables: { email: wixSubscription?.contact?.email },
      skip: !wixSubscription?.contact?.email,
    });

    if (userData && !userDataLoading) {
      // If userData exists, update subscription
      if (userData?.userByEmail) {
        try {
          const response = await client.mutate({
            mutation: ACTIVATE_USER_SUBSCRIPTION,
            variables: { email: wixSubscription?.contact?.email, isActive: true },
          });
        
          console.log(`Response:`, response);
          
          if (response.data?.activateUserSubscription) {
            console.log(`User subscription status updated!`, response.data.activateUserSubscription);
          } else {
            console.error(`No user found with email: ${wixSubscription?.contact?.email}`);
          }
        } catch (err) {
          console.error(`Failed to update user subscription status: ${err}`);
        }
      }
    } else {
      if (wixSubscription!) {
      
        try {
          const response = await client.mutate({
            mutation: ADD_WIX_SUBSCRIPTION,
            variables: {
              email: wixSubscription?.contact?.email,
              wix_order_id: wixSubscription.plan_order_id,
              data: wixSubscription,
              recorded_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          });
          console.log(`Response:`, response);
        } catch (err) {
          console.error(`Failed to update user subscription status: ${err}`);
        }
      }
    }

    res.status(200).json({ message: 'Webhook successfully received' });
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
}
;

export default wixWebhookHandler;
