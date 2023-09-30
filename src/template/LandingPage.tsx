import { Button } from '@/button/Button';
import ExampleData from '@/template/ExampleData';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      <div className="space-y-6 md:space-y-8 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-500 p-6 md:p-8 rounded-xl text-white shadow-lg">
        <h1 className="text-5xl md:text-6xl font-bold leading-none">Welcome to 80k View</h1>
        <p className="text-xl md:text-2xl font-light">Anxiety and depression rates are at an all-time high. Our rapidly changing world, the overwhelming plethora of options, and the resulting decision fatigue can often leave us feeling unfulfilled and lost. We're here to help.</p>
        <p className="text-xl md:text-2xl font-light">80k View offers a comprehensive and reflective tool that can help you navigate the complexities of life. We don't tell you what to do but help you identify key trends and potential opportunities to make informed decisions based on a comprehensive outlook. Dive in and start building a life story to be proud of!</p>
      </div>
      <div className="px-4 p-2 rounded-md my-2 space-y-2">
        <h2 className="text-2xl lg:text-5xl font-semibold text-gray-800 dark:text-slate-100">Why choose 80k View?</h2>
        <ul className="list-disc list-inside text-lg lg:text-2xl text-gray-700 dark:text-slate-200">
          <li>Discover areas in your life that need focus and improvement.</li>
          <li>Gain a clear direction for your future and predict your path.</li>
          <li>Create a life journal in just 15-30 minutes a month.</li>
        </ul>
      </div>
      <h2 className="text-2xl lg:text-5xl font-semibold text-gray-800 dark:text-slate-100 mx-6">Here's what 80k View looks like in action:</h2>
      <ExampleData />
      <div className="text-center py-6">
        <h2 className="text-2xl lg:text-5xl font-semibold text-gray-800 dark:text-slate-200 py-8">Ready to take control of your life?</h2>
        <Link onClick={signIn} href="/">
          <Button>Sign Up for 80k View</Button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
