

import AuthWrapperTwo from '@/app/shared/(user)/auth-layout/auth-wrapper-two';
import ResetPasswordForm from './reset-password-form';

import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Reset Password'),
};

export default function ResetPassword() {
  return (
    <AuthWrapperTwo title="Reset Password" isSignIn isSocialLoginActive={false}>
      <ResetPasswordForm />
    </AuthWrapperTwo>
  );
}