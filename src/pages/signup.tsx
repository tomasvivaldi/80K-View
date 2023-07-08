import { Meta } from '@/layout/Meta';
import { SignUpForm } from '@/template/auth/SignUpForm';
import { AppConfig } from '@/utils/AppConfig';
import bcrypt from 'bcryptjs';

import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { ADD_USERS } from 'graphql/mutations';

const SignUp = () => {
  const router = useRouter();
  const [addUsers] = useMutation(ADD_USERS);

  const handleSignUp = async (username: string, email: string, password: string) => {
    const created_at = new Date().toISOString();
    const provider = 'local';
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    await addUsers({
      variables: {
        username: username,
        created_at: created_at,
        email: email,
        provider: provider,
        password: hashedPassword, 
      },
    });

    router.push('/login');
};


  return (
  <div className="text-gray-900 antialiased">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <SignUpForm handleSignUp={handleSignUp} />
  </div>

  );
}
export default SignUp;
