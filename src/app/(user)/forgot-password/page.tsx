import AuthWrapperTwo from '@/app/shared/(user)/auth-layout/auth-wrapper-two';
import ForgetPasswordForm from './forgot-password-form';


import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Forgot Password'),
};


export default function ForgotPassword() {
  return (
    <AuthWrapperTwo title="Forgot your Password">
      <ForgetPasswordForm />
    </AuthWrapperTwo>
  );
}
