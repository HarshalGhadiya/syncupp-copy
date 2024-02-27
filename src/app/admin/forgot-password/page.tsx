import AuthWrapperTwo from '@/app/shared/(admin)/auth-layout/auth-wrapper-two';
import ForgetPasswordForm from './forgot-password-form';


import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Forgot Password - Admin'),
};


export default function ForgotPassword() {
  return (
    <AuthWrapperTwo title="Forgot your Password">
      <ForgetPasswordForm />
    </AuthWrapperTwo>
  );
}
