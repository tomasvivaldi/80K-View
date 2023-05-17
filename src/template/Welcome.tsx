import { useSession } from 'next-auth/react';
import React from 'react';

function Welcome() {
  const { data: session } = useSession();
  return (
    <div className="font-semibold text-slate-800 text-xl sm:text-2xl md:text-3xl ">
      <p>
        Welcome back, {session?.user?.name}.
      </p>
    </div>
  );
}

export default Welcome;
