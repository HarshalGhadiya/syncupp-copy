import AuthWrapperTwo from '@/app/shared/(admin)/auth-layout/auth-wrapper-two';
import ResetPasswordForm from './reset-password-form';


import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Reset Password - Admin'),
};


export default function ForgotPassword() {
  return (
    <AuthWrapperTwo title="Reset your Password">
      <ResetPasswordForm />
    </AuthWrapperTwo>
  );
}
