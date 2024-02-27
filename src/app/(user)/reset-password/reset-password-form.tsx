'use client';

import { SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Password } from '@/components/ui/password';
import { Form } from '@/components/ui/form';
import { resetPasswordSchema, ResetPasswordSchema } from '@/utils/validators/reset-password.schema';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordUser } from '@/redux/slices/user/auth/resetPasswordSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { handleKeyDown } from '@/utils/common-functions';
import Spinner from '@/components/ui/spinner';
import { routes } from '@/config/routes';
import useMedia from 'react-use/lib/useMedia';

const initialValues: ResetPasswordSchema = {
  password: '',
  confirmPassword: ''
};

export default function ResetPasswordForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const router = useRouter();
  const resetPassword = useSelector((state: any) => state?.root?.resetPassword)

  const onSubmit: SubmitHandler<ResetPasswordSchema> = (data) => {
    dispatch(resetPasswordUser({...data, token, email})).then((result: any) => {
      if (resetPasswordUser.fulfilled.match(result)) {
        if (result && result.payload.success === true ) {
          router.replace(routes.signIn);
        } 
      }
    });
    // setReset({ ...initialValues });
  };

  return (
    <>
      <Form<ResetPasswordSchema>
        validationSchema={resetPasswordSchema}
        onSubmit={onSubmit}
        // resetValues={reset}
        useFormProps={{
          mode: 'all',
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Password
                onKeyDown={handleKeyDown}
                label="New Password"
                placeholder="Enter your password"
                rounded="pill"
                color="info"
                size={isMedium ? 'lg' : 'xl'}
                className="[&>label>span]:font-medium"
                {...register('password')}
                error={errors.password?.message}
              />
            <Password
                onKeyDown={handleKeyDown}
                label="Confirm New Password"
                placeholder="Enter your password"
                rounded="pill"
                size={isMedium ? 'lg' : 'xl'}
                color="info"
                className="[&>label>span]:font-medium"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
            />
            <Button
              className="w-full border-2 text-base font-bold"
              type="submit"
              color="info"
              rounded="pill"
              size={isMedium ? 'lg' : 'xl'}
              disabled={resetPassword?.loading}
            >
              Reset Password
              {resetPassword?.loading && <Spinner size="sm" tag='div' className='ms-3' color='white' />}
              </Button>
          </div>
        )}
      </Form>
    </>
  );
}
