import '../styles/global.css';

import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

import client from '../../apollo-client';
import { ThemeProvider } from 'next-themes';

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => (
  <ApolloProvider client={client}>
    <SessionProvider session={session}>
      <Toaster />
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  </ApolloProvider>
);

export default MyApp;
