import { useSession } from 'next-auth/react'
import React from 'react'

function Welcome() {
  const {data: session} = useSession()
  return (
    session ? (
    <div className='text-slate-800 font-semibold'>
      <p>Welcome back 
        <span className="mx-2 before:block before:absolute before:-inset-1 before:bg-blue-800 before:rounded-lg relative inline-block">
          <span className="relative text-white px-1">{session?.user?.name}</span>
        </span>
      </p>
    </div>
    ) : (<div className=''>
    <p>Please Log In</p>
  </div>)
    
    
  )
}

export default Welcome