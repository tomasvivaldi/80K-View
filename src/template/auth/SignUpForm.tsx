import { Button } from '@/button/Button';
import { FormElement } from '@/form/FormElement';
import { Label } from '@/form/Label';
import { FullCenterSection } from '@/layout/FullCenterSection';

interface SignUpFormProps {
  handleSignUp: (email: string, password: string) => Promise<void>;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ handleSignUp }) => (
  <FullCenterSection
    title="Create your account"
    description="Sign up with your email address and password."
  >
    <form className="grid gap-y-2" onSubmit={(event) => {
      event.preventDefault();
      const target = event.target as typeof event.target & {
        email: { value: string };
        password: { value: string };
      };
      handleSignUp(target.email.value, target.password.value);
    }}>
      <Label htmlFor="email">Email</Label>
      <FormElement>
        <input id="email" type="email" required />
      </FormElement>

      <Label htmlFor="password">Password</Label>
      <FormElement helper="Your password must be at least 8 characters.">
        <input id="password" type="password" required />
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

export { SignUpForm };
