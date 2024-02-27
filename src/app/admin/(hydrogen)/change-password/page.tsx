"use client";
import AuthWrapperTwo from '@/app/shared/(admin)/auth-layout/auth-wrapper-two';
import ChangePasswordForm from './change-password-form';
import WithAuth from '@/utils/private-route-admin';

function ChangePassword() {
  return (
    <AuthWrapperTwo title="Change your Password">
      <ChangePasswordForm />
    </AuthWrapperTwo>
  );
}

export default WithAuth(ChangePassword);