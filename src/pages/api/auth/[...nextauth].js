import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from "next-auth/providers/facebook";
import Auth0Provider from "next-auth/providers/auth0";

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
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    })
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
  //   async jwt(token, user, account, profile, isNewUser) {
  //     console.log("JWT callback triggered");
    
  //     // Check if user object is undefined
  //     if (user) {
  //       console.log("SignIn Event");
  //       console.log("User: ", user);
  //       console.log("Account: ", account);
  //       console.log("Profile: ", profile);
  //       console.log("isNewUser: ", isNewUser);
    
  //       // Modify the token
  //       token.email = user.email;
  //       token.name = user.name;
  //       token.picture = user.image;
    
  //       // Modify the token with other properties
  //       token.provider = account.provider;
  //       token.accessToken = account.access_token;
  //       token.providerSubId = profile.sub;
  //       token.isNewUser = isNewUser;
  //     } else {
  //       console.log("Not a SignIn Event");
  //     }
    
  //     return token;
  //   },
    
    
  
  //   async session(session, token) {
  //     console.log('Session callback', { session, token });
    
  //     if (token) {
  //       session.user.email = token.email;
  //       session.user.name = token.name;
  //       session.user.picture = token.picture;
  //       session.user.provider = token.provider;
  //     } else {
  //       console.log("Token is undefined");
  //     }
    
  //     return session;
  //   }
  // }    
  
};

export default NextAuth(authOptions);
