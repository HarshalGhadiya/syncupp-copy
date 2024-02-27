'use client';

import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import Link from 'next/link';
import { useMedia } from '@/hooks/use-media';
import {forgetPasswordSchema,ForgetPasswordSchema} from '@/utils/validators/forget-password.schema';
import { useDispatch, useSelector } from 'react-redux';
import { postForgetPassword } from '@/redux/slices/admin/auth/forgotpassword/forgetPasswordSlice';
import { handleKeyDown } from '@/utils/common-functions';
import Spinner from '@/components/ui/spinner';

const initialValues = {
  email: '',
};

export default function ForgetPasswordForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const dispatch = useDispatch();
  const adminForgotPassword = useSelector((state: any) => state?.root?.adminForgotPassword)
  const onSubmit: SubmitHandler<ForgetPasswordSchema> = (data) => {
    const requestObject = {
      ...data,
    }
    dispatch(postForgetPassword(requestObject))
  };

  return (
    <>
      <Form<ForgetPasswordSchema>
        validationSchema={forgetPasswordSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
          mode: 'all'
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              onKeyDown={handleKeyDown}
              type="email"
              size={isMedium ? 'lg' : 'xl'}
              label="Email"
              placeholder="Enter your email"
              rounded="pill"
              color="info"
              className="[&>label>span]:font-medium"
              {...register('email')}
              error={errors.email?.message as string}
            />
            <Button
              className="w-full border-2 text-base font-medium"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
              color="info"
              rounded="pill"
              disabled={adminForgotPassword.loading}

            >
              Submit
              {adminForgotPassword.loading && <Spinner size="sm" tag='div' className='ms-3' />}
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-5 text-center text-[15px] leading-loose text-gray-500 lg:text-start xl:mt-7 xl:text-base">
        Don’t want to reset?{' '}
        <Link
          href={routes.admin.signIn}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}
