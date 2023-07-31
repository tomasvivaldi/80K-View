import { SocialButton } from '@/button/SocialButton';
import { Button } from '@/button/Button';
import { FormElement } from '@/form/FormElement';
import { Label } from '@/form/Label';

import { FullCenterSection } from '@/layout/FullCenterSection';

interface LoginFormProps {
  handleLogin: (provider: string) => Promise<void>;
  handleEmailLogin: (email: string, password: string) => void;
  loginFailed: boolean; 
}

const LoginForm: React.FC<LoginFormProps> = ({ handleLogin, handleEmailLogin, loginFailed }) => {

  return (
    <FullCenterSection title="Sign in to your account">
      <form
        className="grid gap-y-2 mb-4"
        onSubmit={async (event) => {
          event.preventDefault();
          const target = event.target as typeof event.target & {
            email: { value: string };
            password: { value: string };
          };
          await handleEmailLogin(target.email.value, target.password.value);
        }}        
      >
        <Label htmlFor="email">Email</Label>
        <FormElement>
          <input id="email" type="text" required className={loginFailed ? ' ring-red-500 ring-2' : ''} />
        </FormElement>

        <Label htmlFor="password">Password</Label>
        <FormElement>
          <input id="password" type="password" required className={loginFailed ? ' ring-red-500 ring-2' : ''} />
        </FormElement>

        {loginFailed && <p className="text-red-500">Invalid email or password</p>}


      <div className="mt-3">
        <button type="submit" className="w-full">
          <Button full>Log in</Button>
        </button>
      </div>
    </form>
    <div className='flex flex-row justify-center items-center gap-2'>
      <div className='w-full h-[1px] bg-black mt-1'/><p>or</p><div className='w-full h-[1px] bg-black mt-1'/>
    </div>
    <div className="mt-5 space-y-4">
      <button className="w-full" type="button" onClick={() => handleLogin('google')}>  
        <SocialButton
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <defs>
                <path
                  id="a"
                  d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                />
              </defs>
              <clipPath id="b">
                <use xlinkHref="#a" overflow="visible" />
              </clipPath>
              <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
              <path
                clipPath="url(#b)"
                fill="#EA4335"
                d="M0 11l17 13 7-6.1L48 14V0H0z"
              />
              <path
                clipPath="url(#b)"
                fill="#34A853"
                d="M0 37l30-23 7.9 1L48 0v48H0z"
              />
              <path
                clipPath="url(#b)"
                fill="#4285F4"
                d="M48 48L17 24l-4-3 35-10z"
              />
            </svg>
          }
        >
          Sign in with Google
        </SocialButton>
      </button>
      <button className="w-full" type="button" onClick={() => handleLogin('facebook')}>  
        <SocialButton
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14222 14222">
              <circle cx="7111" cy="7112" r="7111" fill="#1977f3" />
              <path
                d="M9879 9168l315-2056H8222V5778c0-562 275-1111 1159-1111h897V2917s-814-139-1592-139c-1624 0-2686 984-2686 2767v1567H4194v2056h1806v4969c362 57 733 86 1111 86s749-30 1111-86V9168z"
                fill="#fff"
              />
            </svg>
          }
        >
          Sign in with Facebook
        </SocialButton>
      </button>
      <button className="w-full" type="button" onClick={() => handleLogin('auth0')}>  
        <SocialButton
          icon={
            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Auth0</title><path d="M21.98 7.448L19.62 0H4.347L2.02 7.448c-1.352 4.312.03 9.206 3.815 12.015L12.007 24l6.157-4.552c3.755-2.81 5.182-7.688 3.815-12.015l-6.16 4.58 2.343 7.45-6.157-4.597-6.158 4.58 2.358-7.433-6.188-4.55 7.63-.045L12.008 0l2.356 7.404 7.615.044z"/></svg>
          }
        >
          Sign in with Auth0
        </SocialButton>
      </button>
      <div className="mt-5 text-center text-xs">
  Don't have an account?{' '}
    <a href="/signup" className="text-primary-500 hover:text-primary-600">
      Sign up now
    </a>
  .
</div>
    </div>
  </FullCenterSection>
);
        }

export { LoginForm };
