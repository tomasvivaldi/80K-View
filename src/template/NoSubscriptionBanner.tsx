
import Link from 'next/link';
import React from 'react';

function NoSubscriptionBanner() {

    return (
      <div className="font-semibold rounded-lg shadow-lg my-4
      bg-gradient-to-r from-red-500 via-orange-400 to-orange-600 text-white 
      sm:text-base p-2 md:p-8 md:pr-16 flex flex-col md:flex-row md:h-20 items-center justify-between">
        <div className='flex h-fit my-4'>
          <p className='text-xl text-center'>
            To access all the features activate your subscription!
          </p>
        </div>
        <div className='my-4'>
          <Link href="https://buy.stripe.com/test_28o2an8ee7a38Xm7ss" className="mx-auto my-16">
          <button className='text-lg w-44 bg-blue-300/20 rounded-full p-1 border-2 text-gray-100 border-gray-400 hover:bg-blue-200/20 active:bg-blue-300/20'>Subscribe Now!</button>
          </Link>
        </div>
      </div>
    );
}

export default NoSubscriptionBanner;
