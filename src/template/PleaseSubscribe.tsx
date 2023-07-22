import React from "react";
import Link from 'next/link';

const PleaseSubscribe = () => (
  <div className="min-h-screen flex justify-center items-center">
    <div className="max-w-lg mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">No Active Subscription</h1>
      <p className="text-lg mb-8">You currently don't have an active subscription and can't access certain features. To access all the features, please activate your subscription!</p>
      <div className="mx-auto shadow-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 w-fit rounded-full">
        <Link href="https://buy.stripe.com/test_28o2an8ee7a38Xm7ss" className="mx-auto my-16">
          <button className=' text-lg w-44 bg-blue-300/20 rounded-full p-1 border-2 text-gray-100 border-gray-200 hover:bg-blue-400/20 active:bg-blue-200/20'>Subscribe Now!</button>
        </Link>
      </div>
    </div>
  </div>
);

export { PleaseSubscribe };
