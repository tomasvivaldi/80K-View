import { useQuery } from '@apollo/client';
import { queries } from 'graphql/queries';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';


const Subscription = () => {
  const { data: session } = useSession();
  const user_query = queries.GET_USER_BY_EMAIL
  const [userRef, setUserRef] = useState<string | null>(null);

  const { loading, data, stopPolling } = useQuery<Record<string, any>>(user_query, {
    variables: { email: session?.user?.email },
    pollInterval: 500, // re-run the query every 500ms
  });
  
  useEffect(() => {
    if (!loading && data && data.userByEmail) {
      const userRef = data.userByEmail?.id;
      console.log('user_ref', userRef);
      setUserRef(userRef);
      stopPolling(); // stop re-running the query once the user is fetched
    }
  }, [loading, data, stopPolling]);

  if(!userRef){console.log('!userRef',userRef)}

  let stripeHTML = ''; // initialize stripeHTML as an empty string

  if(userRef){ // if userRef exists, then define stripeHTML
    stripeHTML = `
      <stripe-pricing-table 
        pricing-table-id="prctbl_1Nc0foIrrtDVRB0pQKFEmNjO" 
        publishable-key="pk_test_51NNWTwIrrtDVRB0pW9iXxyK6xF3SbJdZ5Ry6hyHEFFDxYDsvajmy2o7inI9C7rnj9yOjyKzPWrejrDBGBP0MvuxM00Zhd5xpez"
        client-reference-id=${userRef!}>
      </stripe-pricing-table>
    `;
  }

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col justify-center items-center">
      <Head>
        <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      </Head>
      <div className="bg-white p-12 rounded-lg shadow-xl w-3/4 text-center  flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4 ">Subscribe to 80K View</h1>
        <p className="text-gray-700 mb-4 max-w-md">
          We are on a mission to empower and improve people's life! When you sign up, we are giving you an <span className=' font-bold'>entire year</span> of <span className=' font-bold'>free subscription!</span>
        </p>
        <div className='w-full' dangerouslySetInnerHTML={{ __html: stripeHTML }} />
        <div className="flex flex-col space-y-4">
          <p>OR</p>
          <button
            className="text-blue-600 hover:underline transition"
            onClick={() => window.location.href = '/'}
          >
            Back to Home
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Subscription;
