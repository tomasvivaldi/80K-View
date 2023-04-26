import { useSession } from 'next-auth/react';
import React from 'react';

function Welcome() {
  const { data: session } = useSession();
  return session ? (
    <div className="font-semibold text-slate-800">
      <p>
        Welcome back
        <span className="relative mx-2 inline-block before:absolute before:-inset-1 before:block before:rounded-lg before:bg-blue-800">
          <span className="relative px-1 text-white">
            {session?.user?.name}
          </span>
        </span>
      </p>
    </div>
  ) : (
    <div className="">
      <p>Please Log In</p>
    </div>
  );
}

export default Welcome;
