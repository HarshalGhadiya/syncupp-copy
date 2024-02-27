'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Password } from '@/components/ui/password';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { routes } from '@/config/routes';
import {resetPasswordSchema,ResetPasswordSchema} from '@/utils/validators/reset-password.schema';
import { useDispatch, useSelector } from 'react-redux';
import { postResetPassword } from '@/redux/slices/admin/auth/resetpassword/resetPasswordSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import Spinner from '@/components/ui/spinner';

const initialValues = {
  password: '',
  confirmPassword: '',
};

export default function ResetPasswordForm() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const router = useRouter();
  const adminResetPassword = useSelector((state: any) => state?.root?.adminResetPassword)

  const onSubmit: SubmitHandler<ResetPasswordSchema> = (data) => {
    const requestObject = {
      ...data,
      token,
      email
    }
    dispatch(postResetPassword(requestObject)).then((result: any) => {
      if (postResetPassword.fulfilled.match(result)) {
        if (result && result.payload.success === true ) {
          router.replace(routes.admin.signIn);
        } 
      }
    })
  };

  return (
    <>
      <Form<ResetPasswordSchema>
        validationSchema={resetPasswordSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
          mode: 'all'
        }}
        className="pt-1.5"
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-6">
            <Password
              label="New Password"
              placeholder="Enter New password"
              size="lg"
              className="[&>label>span]:font-medium"
              color="info"
              inputClassName="text-sm"
              rounded="pill"
              {...register('password')}
              error={errors.password?.message}
            />
            <Password
              label="Confirm Password"
              placeholder="Enter confirm password"
              size="lg"
              className="[&>label>span]:font-medium"
              color="info"
              rounded="pill"
              inputClassName="text-sm"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
            <Button
              className="mt-2 w-full"
              type="submit"
              size="lg"
              color="info"
              rounded="pill"
              disabled={adminResetPassword.loading}
            >
              Reset Password
              {adminResetPassword.loading && <Spinner size="sm" tag='div' className='ms-3' />}
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 lg:mt-8 lg:text-start xl:text-base">
        Don’t want to reset your password?{' '}
        <Link
          href={routes.admin.signIn}
          className="font-bold text-gray-700 transition-colors hover:text-blue"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}
