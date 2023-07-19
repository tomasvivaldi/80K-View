import { Button } from '@/button/Button';
import { FormElement } from '@/form/FormElement';
import { Label } from '@/form/Label';
import { FullCenterSection } from '@/layout/FullCenterSection';
import { useState } from 'react';

interface SignUpFormProps {
  handleSignUp: (username: string, email: string, password: string) => Promise<void>;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ handleSignUp })=> {
  const [_password, setPassword] = useState("");
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [hasMinLength, setHasMinLength] = useState(false);
  const [passwordFailed, setPasswordFailed] = useState(false); // New state

  const isValidPassword = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && hasMinLength;

  const handlePasswordChange = (event: { target: { value: any; }; }) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setHasUpperCase(/[A-Z]/.test(newPassword));
    setHasLowerCase(/[a-z]/.test(newPassword));
    setHasNumber(/[0-9]/.test(newPassword));
    setHasSpecialChar(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(newPassword));
    setHasMinLength(newPassword.length >= 8);
    setPasswordFailed(false);  // Reset passwordFailed whenever the user types something
  }

  const handleSubmit = (event: { preventDefault: () => void; target: any; }) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      username: { value: string };
      email: { value: string };
      password: { value: string };
    };

    if (!isValidPassword) {
      setPasswordFailed(true);
      return;
    }

    handleSignUp(target.username.value, target.email.value, target.password.value);
  }

  return(
  <FullCenterSection
    title="Create your account"
    description="Sign up with your email address and password."
  >
    <form className="grid gap-y-2" onSubmit={handleSubmit}>
      <Label htmlFor="username">Username</Label>
      <FormElement>
        <input id="username" type="text" required />
      </FormElement>
      
      <Label htmlFor="email">Email</Label>
      <FormElement>
        <input id="email" type="email" required />
      </FormElement>

      <Label htmlFor="password">Password</Label>
      <FormElement>
        <input 
          id="password" 
          type="password" 
          required 
          className={passwordFailed ? ' ring-red-500 ring-2' : ''}
          onChange={handlePasswordChange}
        />
      </FormElement>

      {passwordFailed && <p className="text-red-500">Password does not meet the requirements</p>}


      <FormElement>
  <div className="-mt-1 ml-1">
    <div className={hasMinLength ? "text-green-500 text-sm" : "text-gray-500 text-sm"}>
      {hasMinLength ? null : null}
      Your password must be at least 8 characters.
    </div>
    <div className={hasUpperCase ? "text-green-500 text-sm" : "text-gray-500 text-sm"}>
      {hasUpperCase ? null : null}
      Your password must contain at least 1 upper case character.
    </div>
    <div className={hasLowerCase ? "text-green-500 text-sm" : "text-gray-500 text-sm"}>
      {hasLowerCase ? null : null}
      Your password must contain at least 1 lower case character.
    </div>
    <div className={hasNumber ? "text-green-500 text-sm" : "text-gray-500 text-sm"}>
      {hasNumber ? null : null}
      Your password must contain at least 1 number.
    </div>
    <div className={hasSpecialChar ? "text-green-500 text-sm" : "text-gray-500 text-sm"}>
      {hasSpecialChar ? null : null}
      Your password must contain at least 1 special character.
    </div>
  </div>
</FormElement>


      <div className="mt-3">
        <button type="submit" className="w-full">
          <Button full>Sign up</Button>
        </button>
      </div>
    </form>

    <div className="mt-5 text-center text-xs">
      Already have an account?{' '}
        <a href="/login" className="text-primary-500 hover:text-primary-600">
          Log in now
        </a>
      .
    </div>
  </FullCenterSection>
);
};

export { SignUpForm };
