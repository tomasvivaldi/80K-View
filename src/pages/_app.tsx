import { ApolloProvider } from '@apollo/client';
import '../styles/global.css';
import { SessionProvider } from "next-auth/react";
import client from '../../apollo-client.js'

import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

const MyApp = ({ Component, pageProps:{session, ...pageProps} }: AppProps) => (
  (

  <ApolloProvider client={client}>
    <SessionProvider session={session}>
      <Toaster />
      <Component {...pageProps} />
    </SessionProvider>
  </ApolloProvider>
)
);

export default MyApp;

