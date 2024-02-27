'use client';

import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';
import { Password } from '@/components/ui/password';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMedia } from '@/hooks/use-media';
import { Text } from '@/components/ui/text';
import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import { SignUpSchema, signUpSchema } from '@/utils/validators/signup.schema';
import { handleKeyContactDown, handleKeyDown } from '@/utils/common-functions';

export default function SignUpForm(props: any) {
  const isMedium = useMedia('(max-width: 1200px)', false);

  const { setTitle, setNextBtn, setFormData, formData } = props;

  const initialValues = {
    firstName: formData?.firstName ?? '',
    lastName: formData?.lastName ?? '',
    email: formData?.email ?? '',
    contact: formData?.contact ?? '',
    password: formData?.password ?? '',
    confirmPassword: formData?.confirmPassword ?? '',
  };

  const onSubmit: SubmitHandler<SignUpSchema> = (data) => {
    setFormData(data);
    setNextBtn(true);
    setTitle('Company Detail');
  };

  return (
    <>
      <Form<SignUpSchema>
        validationSchema={signUpSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'all',
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:gap-5 xl:pb-2">
              <Input
                onKeyDown={handleKeyDown}
                type="text"
                size={isMedium ? 'lg' : 'xl'}
                label="First Name *"
                placeholder="Enter First name"
                rounded="pill"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('firstName')}
                error={errors.firstName?.message}
              />
              <Input
                onKeyDown={handleKeyDown}
                type="text"
                size={isMedium ? 'lg' : 'xl'}
                label="Last Name *"
                placeholder="Enter Last Name"
                rounded="pill"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('lastName')}
                error={errors?.lastName?.message}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:gap-5 xl:pb-2">
              <Input
                onKeyDown={handleKeyDown}
                type="email"
                size={isMedium ? 'lg' : 'xl'}
                label="Email ID *"
                placeholder="Enter Your Email"
                rounded="pill"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('email')}
                error={errors.email?.message}
              />
              <Input
                onKeyDown={handleKeyContactDown}
                type="text"
                size={isMedium ? 'lg' : 'xl'}
                label="Contact Number *"
                placeholder="Enter Phone Number"
                rounded="pill"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('contact')}
                error={errors.contact?.message}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:gap-5 xl:pb-2">
              <Password
                onKeyDown={handleKeyDown}
                label="Password *"
                placeholder="Enter Your Password"
                size={isMedium ? 'lg' : 'xl'}
                rounded="pill"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('password')}
                error={errors.password?.message}
              />
              <Password
                onKeyDown={handleKeyDown}
                label="Confirm Password *"
                placeholder="Enter Your Password"
                size={isMedium ? 'lg' : 'xl'}
                rounded="pill"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
              />
            </div>
            <div className='w-full'>
              <Text className="mt-5 text-center text-[15px] leading-loose text-gray-500 lg:text-start xl:mt-7 xl:text-base float-start">
                Already have an account?{' '}
                <Link
                  href={routes.signIn}
                  className="font-semibold text-gray-700 transition-colors hover:text-blue"
                >
                  Sign In
                </Link>
              </Text>
              <Button
                className="border-2 border-primary-light text-base font-medium float-end"
                type="submit"
                size={isMedium ? 'lg' : 'xl'}
                color="info"
                rounded="pill"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Form>
      
    </>
  );
}
