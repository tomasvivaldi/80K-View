import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const Subscription = () => {
  const { data: session } = useSession();
  console.log('session',session)
  
  const [stripeHTML, setStripeHTML] = useState('');

  useEffect(() => {
    console.log('session', session);
    if (session?.user?.email) {
      setStripeHTML(`
        <stripe-pricing-table 
          pricing-table-id="prctbl_1Nc0foIrrtDVRB0pQKFEmNjO" 
          publishable-key="pk_test_51NNWTwIrrtDVRB0pW9iXxyK6xF3SbJdZ5Ry6hyHEFFDxYDsvajmy2o7inI9C7rnj9yOjyKzPWrejrDBGBP0MvuxM00Zhd5xpez"
          client-reference-id=${session.user.email}>
        </stripe-pricing-table>
      `);
    }
  }, [session]);

  console.log("stripeHTML", stripeHTML);
  
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
