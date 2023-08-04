import { useSession, signIn } from 'next-auth/react';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_EMAIL } from 'graphql/queries';

import { Meta } from '@/layout/Meta';
import { AppConfig } from '@/utils/AppConfig';
import { LoginForm } from '@/template/auth/LoginForm';
import { User } from "next-auth";
import { useEffect, useState } from 'react';
import router from 'next/router';
import LoadingBox from '@/template/LoadingBox';


interface UserWithProvider extends User {
  provider?: string;
}
// type UserData = {
//   id: number;
//   username: string;
//   email: string;
//   password: string;
//   provider: string;
//   created_at: string;
// }


const Login = () => {
  const { data: session } = useSession();
  const user = session?.user as UserWithProvider;
  console.log("session",session);
  console.log("session?.user?.email",user?.email);

const { data: userData, loading: userDataLoading } = useQuery(GET_USER_BY_EMAIL, {
    variables: { email: user?.email },
    skip: !user?.email,
  });

  useEffect(() => {
    // check if loading has finished and if user data is available
    if (!userDataLoading && userData) {
      window.location.href = '/';
    }
  }, [userDataLoading, userData, router]); // re-run effect when these variables change


  const handleLogin = async (provider: string) => {  
    await signIn(provider, {});  
  };

  // define state
const [loginFailed, setLoginFailed] = useState(false);

const handleEmailLogin = async (email: string, password: string): Promise<void> => {
  setLoginFailed(false);
  const response = await signIn('credentials', { email, password, redirect: false });
  if (response?.error) {
    setLoginFailed(true);
  }
};




console.log("login failed?", loginFailed)

// use userDataLoading to handle loading state
if (userDataLoading) return <LoadingBox spinnerClassName='mx-24' containerClassName='m-auto h-screen' />;

// use userData to show some user information, assuming `GET_USER_BY_EMAIL` query returns user's data directly
if (userData) return 

return (
  <div className="text-gray-900 antialiased">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <LoginForm handleLogin={handleLogin} handleEmailLogin={handleEmailLogin} loginFailed={loginFailed}/>
  </div>
);

};

export default Login;
