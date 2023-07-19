import { Meta } from '@/layout/Meta';
import { SignUpForm } from '@/template/auth/SignUpForm';
import { AppConfig } from '@/utils/AppConfig';
import bcrypt from 'bcryptjs';

import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_USERS } from 'graphql/mutations';
import { useRouter } from 'next/router';

import { GET_USER_BY_EMAIL } from 'graphql/queries';
import LoadingBox from '@/template/LoadingBox';
import { useEffect, useState } from 'react';


const SignUp = () => {
  const router = useRouter();
  const [addUsers] = useMutation(ADD_USERS);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { data: userData, loading: userDataLoading } = useQuery(GET_USER_BY_EMAIL, {
    variables: { email: userEmail },
    skip: !userEmail,
  });

  useEffect(() => {
    if (!userDataLoading && userData?.user) {
      router.push('/'); // redirects to homepage
    }
  }, [userDataLoading, userData, router]);

  const handleSignUp = async (username: string, email: string, password: string) => {
    const created_at = new Date().toISOString();
    const provider = 'local';
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
  
    // set the email for useQuery
    setUserEmail(email);
    // Wait for the user data to be fetched
    await new Promise(resolve => {
      const intervalId = setInterval(() => {
        if (!userDataLoading) {
          clearInterval(intervalId);
          resolve(null);
        }
      }, 100);
    });
  
    // If user exists, try to log them in
    if (userData?.userData) {
      const response = await signIn('credentials', { email, password, redirect: false });
      if (response?.error) {
        // Login failed
        console.log(response.error);
      } else {
        router.push('/');
      }
    } else {
      // User does not exist, so register them
      await addUsers({
        variables: {
          username: username,
          created_at: created_at,
          email: email,
          provider: provider,
          password: hashedPassword,
        },
      });
  
      const response = await signIn('credentials', { email, password, redirect: false });
      if (response?.error) {
        console.log(response.error);
      } else {
        router.push('/');
      }
    }
  };
  

  if (userDataLoading) return <LoadingBox spinnerClassName='mx-24' containerClassName='m-auto h-screen' />;

  return (
    <div className="text-gray-900 antialiased">
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <SignUpForm handleSignUp={handleSignUp} />
    </div>
  );
}

export default SignUp;