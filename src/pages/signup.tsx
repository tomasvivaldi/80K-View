import { Meta } from '@/layout/Meta';
import { SignUpForm } from '@/template/auth/SignUpForm';
import { AppConfig } from '@/utils/AppConfig';
import bcrypt from 'bcryptjs';

import { signIn } from 'next-auth/react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_USERS } from 'graphql/mutations';
import { useRouter } from 'next/router';

import { GET_USER_BY_EMAIL } from 'graphql/queries';
import { useEffect, useState } from 'react';
import LoadingBoxTransparent from '@/template/LoadingBoxTransparent';


const SignUp = () => {
  const router = useRouter();
  const [addUsers] = useMutation(ADD_USERS);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { data: userData, loading: userDataLoading } = useQuery(GET_USER_BY_EMAIL, {
    variables: { email: userEmail },
    skip: !userEmail,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // // This useEffect will be executed whenever errorMessage state changes
  // useEffect(() => {
  //   console.log("Error message:",errorMessage)
  // }, [errorMessage]);

  useEffect(() => {
    if (!userDataLoading && userData?.user) {
      window.location.href = '/';
    }
    if (errorMessage){
      console.log("Error message:",errorMessage)
    }
  }, [userDataLoading, userData, router, errorMessage]);

  const handleSignUp = async (username: string, email: string, password: string) => {
    const recorded_at = new Date().toISOString();
    const provider = 'local';
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    // const isActive = true
    
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
    if (userData?.user) {
      console.log("userData?.user",userData?.user)
      // const response = await signIn('credentials', { email, password, redirect: false });
      // if (response?.error) {
        // Login failed
        setErrorMessage("This email is already in use. Please use a different email.");
      // }
      //  else {
      //   router.push('/subscribe');
      // }
    } else {
      // User does not exist, so register them
      try {
        await addUsers({
          variables: {
            username: username,
            recorded_at: recorded_at,
            email: email,
            provider: provider,
            password: hashedPassword,
            // isActive: isActive,
          },
        });
    
        // If registration is successful, attempt to sign in
        const response = await signIn('credentials', { email, password, redirect: false });
        if (response?.error) {
          // Sign in failed
          setErrorMessage(response.error);
        } else {
          if (typeof window !== 'undefined') {
            // window.location.href = '/';
            router.push('/welcome')
          }
        }        
      } catch (e) {
        // Sign up failed, set the error message
        setErrorMessage("There was an error during sign up. Please try again.");
      }

      try {
        const response = await fetch('https://app.80kview.com/api/sendgrid/welcomeEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: `${email}`, 
            username: `${username}`
          })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }

      
    
    }
  };
  
  return (
    <div className="relative text-gray-900 dark:text-slate-200 antialiased">
      {userDataLoading && <LoadingBoxTransparent spinnerClassName='mx-24' />}
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <SignUpForm handleSignUp={handleSignUp} errorMessage={errorMessage}/>
    </div>  
  );
}

export default SignUp;
