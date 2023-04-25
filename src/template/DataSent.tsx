import { Button } from '@/button/Button';
import Link from 'next/link';
import React from 'react'

interface BeginFormProps {
  
}

const BeginForm: React.FC<BeginFormProps> = () => {
  return (
    <div className="flex flex-col rounded-md border-gray-200 bg-white px-4 py-5 w-full gap-4">
      <div className="text-2xl font-semibold text-gray-800 text-center w-full my-4">Congratulations!!!</div>
      {/* Success Icon */}
      <div className=' w-fit mx-auto space-y-4'>
        <p>Your data was Sent!</p>
      </div>
      <Link href="/" className='mx-auto my-16'>
          <Button >Back to Dashboard</Button>
      </Link>
    </div>
  );
};

export default BeginForm;