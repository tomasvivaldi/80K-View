import { useSession, signIn } from 'next-auth/react';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_EMAIL } from 'graphql/queries';

import { Meta } from '@/layout/Meta';
import { AppConfig } from '@/utils/AppConfig';
import { LoginForm } from '@/template/auth/LoginForm';
import { User } from "next-auth";

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

// use userDataLoading to handle loading state
if (userDataLoading) return <div>Loading...</div>;

// use userData to show some user information, assuming `GET_USER_BY_EMAIL` query returns user's data directly
if (userData) return <div>Hello, {userData.username}</div>;


  const handleLogin = async (provider: string) => {  
    await signIn(provider, {});  
  };

  const handleEmailLogin = async (email: string, password: string) => {
    await signIn('credentials', { email, password });  
  };

  return (
    <div className="text-gray-900 antialiased">
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <LoginForm handleLogin={handleLogin}  handleEmailLogin={handleEmailLogin}/> 

    </div>
  );
};

export default Login;
