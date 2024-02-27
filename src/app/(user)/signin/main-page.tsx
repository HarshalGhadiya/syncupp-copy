'use client';
import AuthWrapperTwo from '@/app/shared/(user)/auth-layout/auth-wrapper-two';
import SignInForm from './sign-in-form';
import WithAuthPublic from '@/utils/public-route-user';


function SignIn() {
  return (
    <AuthWrapperTwo title="Sign In" isSignIn isSocialLoginActive={true}>
      <SignInForm />
    </AuthWrapperTwo>
  );
}

export default WithAuthPublic(SignIn);
