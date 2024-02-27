'use client';

import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Password } from '@/components/ui/password';
import { Checkbox } from '@/components/ui/checkbox';
import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import { loginSchema, LoginSchema } from '@/utils/validators/login.schema';
import { postSignin } from '@/redux/slices/admin/auth/signin/signinSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/spinner';
import useMedia from 'react-use/lib/useMedia';

const initialValues: LoginSchema = {
  email: '',
  password: '',
  rememberMe: false,
};

export default function SignInForm() {
  const dispatch = useDispatch();
  const isMedium = useMedia('(max-width: 1200px)', false);
  const router = useRouter();
  const adminSignIn = useSelector((state: any) => state?.root?.adminSignIn)

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    const requestObject = {
      ...data,
    }
    dispatch(postSignin(requestObject)).then((result: any) => {
      if (postSignin.fulfilled.match(result)) {
        if (result && result.payload.success === true ) {
          router.replace(routes.admin.dashboard);
        } 
      }
    })
  };

  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'all',
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              rounded="pill"
              color="info"
              size={isMedium ? 'lg' : 'xl'}
              className="[&>label>span]:font-medium"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              rounded="pill"
              color="info"
              size={isMedium ? 'lg' : 'xl'}
              className="[&>label>span]:font-medium"
              {...register('password')}
              error={errors.password?.message}
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
                href={routes.admin.forgotPassword}
                className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"
              >
                 Forgot Password?
              </Link>
            </div>
            <Button
              className="w-full border-2 text-base font-bold"
              type="submit"
              color="info"
              rounded="pill"
              size={isMedium ? 'lg' : 'xl'}
              disabled={adminSignIn.loading}

            >
              Sign In
              {adminSignIn.loading && <Spinner size="sm" tag='div' className='ms-3' />}
            </Button>
          </div>
        )}
      </Form>
    </>
  );
}
