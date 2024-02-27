'use client';

import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Password } from '@/components/ui/password';
import { Checkbox } from '@/components/ui/checkbox';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { routes } from '@/config/routes';
import { loginSchema, LoginSchema } from '@/utils/validators/login.schema';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '@/redux/slices/user/auth/signinSlice';
import { handleKeyDown } from '@/utils/common-functions';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/spinner';
import useMedia from 'react-use/lib/useMedia';
import { initiateRazorpay } from '@/services/paymentService';

const initialValues: LoginSchema = {
  email: '',
  password: '',
  rememberMe: false,
};

export default function SignInForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const dispatch = useDispatch();
  const router = useRouter();
  const signIn = useSelector((state: any) => state?.root?.signIn)

  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
    dispatch(signInUser(data)).then((result: any) => {
      if (signInUser.fulfilled.match(result)) {
        // console.log(result, 'result', result?.payload?.data?.user?.status, result?.payload?.data?.user?.role?.name)
        if (result && result.payload.success === true) {
          // router.replace(routes.dashboard);
          if (result?.payload?.data?.user?.status === "payment_pending" && result?.payload?.data?.user?.role?.name === "agency") {
            initiateRazorpay(router, routes.dashboard, result?.payload?.data?.token, dispatch)
          } else {
            router.replace(routes.dashboard);
          }
        }
      }
    })
    // setReset({ ...initialValues, rememberMe: false });
  };

  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        onSubmit={onSubmit}
        // resetValues={reset}
        useFormProps={{
          mode: 'onTouched',
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              onKeyDown={handleKeyDown}
              type="email"
              label="Email"
              placeholder="Enter your email"
              rounded="pill"
              color="info"
              size={isMedium ? 'lg' : 'xl'}
              className="[&>label>span]:font-medium"
              {...register('email')}
              error={errors?.email?.message}
            />
            <Password
              onKeyDown={handleKeyDown}
              label="Password"
              placeholder="Enter your password"
              rounded="pill"
              size={isMedium ? 'lg' : 'xl'}
              color="info"
              className="[&>label>span]:font-medium"
              {...register('password')}
              error={errors?.password?.message}
            />
            <div className="flex items-center justify-between pb-2">
              <Checkbox
                {...register('rememberMe')}
                label="Remember Me"
                color="info"
                variant="flat"
                className="[&>label>span]:font-medium"
              />
              <Link
                href={routes?.forgotPassword}
                className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"
              >
                Forgot Password?
              </Link>
            </div>
            <Button
              className="w-full border-2 text-base font-bold"
              type="submit"
              color="info"
              size={isMedium ? 'lg' : 'xl'}
              rounded="pill"
              disabled={signIn?.loading}
            >
              Sign In
              {signIn && signIn?.loading && <Spinner size="sm" tag='div' className='ms-3' color='white' />}
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-5 text-center text-[15px] leading-loose text-gray-500 lg:text-start xl:mt-7 xl:text-base">
        Don’t have an account?{' '}
        <Link
          href={routes?.signUp}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Create Account
        </Link>
      </Text>
    </>
  );
}
