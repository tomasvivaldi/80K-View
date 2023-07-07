import { useRouter } from 'next/router';
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
type UserData = {
  id: number;
  username: string;
  email: string;
  password: string;
  provider: string;
  created_at: string;
}


const Login = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user as UserWithProvider;
  console.log("session",session);
  console.log("session?.user?.email",user?.email);
  
  let userData: UserData;
  let userDataLoading: any;
  let refetchUser: any;
  
  // Query runs even when there's no email, but will be skipped based on the skip condition.
  const { data, loading, refetch } = useQuery(GET_USER_BY_EMAIL, {
    variables: { email: user?.email },
    skip: !user?.email,
  });
  
  userData = data;
  userDataLoading = loading;
  refetchUser = refetch;

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
