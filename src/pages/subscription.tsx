import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const SubscriptionPage: NextPage = () => {
  const router = useRouter();

  // On mount, check if user has active subscription
  useEffect(() => {
    const checkSubscription = async () => {
      // TODO: Replace with your actual subscription checking logic
      const hasSubscription = false;

      if (hasSubscription) {
        // If user has active subscription, redirect to main page
        router.push('/main');
      }
    };

    checkSubscription();
  }, [router]);

  return (
    <div className='h-screen flex flex-col justify-center  bg-gray-900'>
      <div className='mx-auto w-full max-w-lg p-8 rounded-lg backdrop-filter backdrop-blur-md bg-white bg-opacity-20 text-xl'>
        <h1 className='text-3xl font-bold text-center mb-4 text-gray-200'>Subscription Required</h1>
        <p className='text-gray-200 mb-4'>
        Take advantage of our 3-month free trial to enjoy our premium content! You have full control and can cancel your subscription at any moment.
        </p>
        <span className=' font-extrabold text-red-500'>Important:</span>
        <p className='text-red-500 font-semibold mb-4'>
          Please make sure to subscribe with the same email address used for your 80k account.
        </p>
        <div className='text-center'>
          <Link href="https://buy.stripe.com/test_28o2an8ee7a38Xm7ss">
            <button className='w-full py-3 px-4 text-gray-200 font-bold bg-blue-600 hover:bg-blue-700 active:bg-blue-600 rounded-lg'>Subscribe Now!</button>
          </Link>
        </div>
        <div className="mt-5 text-center text-xs text-gray-200">
        Already have an subscription?{' '}
          <a href="/" className="text-primary-500 hover:text-primary-600">
            Go to home page
          </a>
        .
      </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
