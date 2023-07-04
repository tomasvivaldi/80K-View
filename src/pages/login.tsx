import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_USERS } from 'graphql/mutations';
import { GET_USER_BY_EMAIL } from 'graphql/queries';

import { Meta } from '@/layout/Meta';
import { AppConfig } from '@/utils/AppConfig';
import { LoginForm } from '@/template/auth/LoginForm';
import { User } from "next-auth";

interface UserWithProvider extends User {
  provider?: string;
}



const Login = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user as UserWithProvider;
  const [addUsers] = useMutation(ADD_USERS);
  const {
    data: userData,
    loading: userDataLoading,
    refetch: refetchUser,
  } = useQuery(GET_USER_BY_EMAIL, {
    variables: { email: session?.user?.email },
    skip: !session,
  });

  useEffect(() => {
    const addUsersDataToDatabase = async () => {
      if (session) {
        await refetchUser();

        if (!userDataLoading) {
          const existingUser = userData?.userByEmail;

          if (!existingUser) {
            const created_at = new Date().toISOString();
            const username = user?.name;
            const email = user?.email;
            console.log("email:",email)
            const provider = user?.provider || "Auth0";
            const password = '';

            await addUsers({
              variables: {
                username: username,
                created_at: created_at,
                email: email,
                provider: provider,
                password: password,
              },
            });
          }

          router.push('/');
        }
      }
    };

    addUsersDataToDatabase();
  }, [session, router, addUsers, userData, userDataLoading, refetchUser]);

  const handleLogin = async (provider: string) => {  // Updated line
    await signIn(provider, {});  // Updated line
  };

  return (
    <div className="text-gray-900 antialiased">
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <LoginForm handleLogin={handleLogin} />  // Make sure to update LoginForm component too
    </div>
  );
};

export default Login;
