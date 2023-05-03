import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/login', // Your custom login page
    signOut: false, // Use the default signOut page provided by NextAuth
    error: false, // Use the default error page provided by NextAuth
    verifyRequest: false, // Use the default verifyRequest page provided by NextAuth
    newUser: null, // Disable the newUser page (this will redirect new users to the callback URL)
  },

  // callbacks: {
  //   async signIn({ account, profile }) {
  //     if (account.provider === "google") {
  //       return profile.email_verified && profile.email.endsWith("@example.com")
  //     }
  //     return true // Do different verification for other providers that don't have `email_verified`
  //   },
  // }
  
};

export default NextAuth(authOptions);
