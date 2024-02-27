'use client';
import AuthWrapperTwo from '@/app/shared/(admin)/auth-layout/auth-wrapper-two';
import SignInForm from './sign-in-form';
import WithAuthPublic from '@/utils/public-route-admin';

function SignIn() {
  return (
    <AuthWrapperTwo title="Sign In" isSignIn isSocialLoginActive={false}>
      <SignInForm />
    </AuthWrapperTwo>
  );
}

export default WithAuthPublic(SignIn);
