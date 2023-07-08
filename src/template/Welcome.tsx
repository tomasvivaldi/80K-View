import { useSession } from 'next-auth/react';
import React from 'react';


type WelcomeProps = {
  data?: UserDataById;
}

function Welcome( { data }: WelcomeProps) {
  const { data: session } = useSession();
  return (
    <div className="font-semibold text-slate-800 text-xl sm:text-2xl md:text-3xl ">
      <p>
        Welcome back, {session?.user?.name || data?.username}.
      </p>
    </div>
  );
}

export default Welcome;
