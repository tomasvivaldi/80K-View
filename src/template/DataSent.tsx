import Link from 'next/link';
import React from 'react';

import { Button } from '@/button/Button';

interface BeginFormProps {}

const BeginForm: React.FC<BeginFormProps> = () => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-md border-gray-200 bg-white px-4 py-5">
      <div className="my-4 w-full text-center text-2xl font-semibold text-gray-800">
        Congratulations!!!
      </div>
      {/* Success Icon */}
      <div className=" mx-auto w-fit space-y-4">
        <p>Your data was Sent!</p>
      </div>
      <Link href="/" className="mx-auto my-16">
        <Button>Back to Dashboard</Button>
      </Link>
    </div>
  );
};

export default BeginForm;
