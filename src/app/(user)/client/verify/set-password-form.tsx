'use client';

import { SubmitHandler } from 'react-hook-form';
import { Password } from '@/components/ui/password';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';
import { handleKeyDown } from '@/utils/common-functions';
import { SetPasswordSchema, setPasswordSchema } from '@/utils/validators/set-password-schema';
import { Title, Text } from '@/components/ui/text';
import { useDispatch, useSelector } from 'react-redux';
import { postVerifyClient } from '@/redux/slices/user/client/clientSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { routes } from '@/config/routes';
import Spinner from '@/components/ui/spinner';
import useMedia from 'react-use/lib/useMedia';

export default function SetPasswordForm(props: any) {
  const { redirect } = props;
  const isMedium = useMedia('(max-width: 1200px)', false);
  const dispatch = useDispatch();
  const router = useRouter();
  const clientSliceData = useSelector((state: any) => state?.root?.client);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const name = searchParams.get("name");
  const agency = searchParams.get("agency");
  
  const initialValues = {
    // firstName: '',
    // lastName: '',
    email: email ?? '' ,
    password: '',
    confirmPassword: '',
  };
  
  const onSubmit: SubmitHandler<SetPasswordSchema> = (data) => {
    const apiData = {
      email: email,
      agency_id: agency,
      password: data?.password,
      // first_name: data?.firstName,
      // last_name: data?.lastName,
      redirect: redirect
    }
    dispatch(postVerifyClient(apiData)).then((result: any) => {
      if (postVerifyClient.fulfilled.match(result)) {
        if (result && result.payload.success === true ) {
          router.replace(routes.signIn);
        } 
      }
    })
  };

    return (
      <>
        <Form<SetPasswordSchema>
          validationSchema={setPasswordSchema}
          onSubmit={onSubmit}
          useFormProps={{
            mode: 'all',
            defaultValues: initialValues,
          }}
        >
          {({ register, formState: { errors } }) => (
            <div className="space-y-5">
              <Title
              // as="h6"
              className="mb-0.5 flex items-start text-sm text-gray-500 sm:items-center"
            >
              {name} invited you to their Syncupp. Setup your password to join {name} on Syncupp.
            </Title> <br />
              {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:gap-5 xl:pb-2">
                <Input
                  onKeyDown={handleKeyDown}
                  type="text"
                  label="First Name"
                  placeholder="Enter first name"
                  rounded="pill"
                  size={isMedium ? 'lg' : 'xl'}
                  color="info"
                  className="[&>label>span]:font-medium"
                  {...register('firstName')}
                  error={errors.firstName?.message}
                />
                <Input
                  onKeyDown={handleKeyDown}
                  type="text"
                  label="Last Name"
                  placeholder="Enter last name"
                  size={isMedium ? 'lg' : 'xl'}
                  rounded="pill"
                  color="info"
                  className="[&>label>span]:font-medium"
                  {...register('lastName')}
                  error={errors?.lastName?.message}
                />
              </div> */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:gap-5 xl:pb-2">
                <Input
                  onKeyDown={handleKeyDown}
                  type="email"
                  label="Email ID"
                  placeholder="Enter your email"                  
                  size={isMedium ? 'lg' : 'xl'}
                  rounded="pill"
                  color="info"
                  className="[&>label>span]:font-medium"
                  {...register('email')}
                  disabled
                  error={errors.email?.message}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:gap-5 xl:pb-2">
                <Password
                  onKeyDown={handleKeyDown}
                  label="Password"
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
                  label="Confirm Password"
                  placeholder="Enter your password"
                  rounded="pill"
                  color="info"
                  size={isMedium ? 'lg' : 'xl'}
                  className="[&>label>span]:font-medium"
                  {...register('confirmPassword')}
                  error={errors.confirmPassword?.message}
                />
              </div>
              <div className='w-full'>
                <Button
                  className="border-2 text-base font-medium float-end"
                  type="submit"
                  color="info"
                  rounded="pill"
                  size={isMedium ? 'lg' : 'xl'}
                  disabled={clientSliceData?.loading}
                >
                  Create Password
                  { clientSliceData?.loading && <Spinner size="sm" tag='div' className='ms-3' color='white' /> }
                </Button>
              </div>
            </div>
          )}
        </Form>
        
      </>
    );
}
