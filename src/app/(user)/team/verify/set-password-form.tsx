'use client';

import { SubmitHandler } from 'react-hook-form';
import { Password } from '@/components/ui/password';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMedia } from '@/hooks/use-media';
import { Form } from '@/components/ui/form';
import { handleKeyDown } from '@/utils/common-functions';
import { SetPasswordSchema, setPasswordSchema } from '@/utils/validators/set-password-schema';
import { Title, Text } from '@/components/ui/text';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { routes } from '@/config/routes';
import Spinner from '@/components/ui/spinner';
import { verifyTeamMember } from '@/redux/slices/user/team-member/teamSlice';



export default function SetPasswordForm(props: any) {
  const { redirect } = props;

  const isMedium = useMedia('(max-width: 1200px)', false);
  const dispatch = useDispatch();
  const router = useRouter();
  const teamMemberData = useSelector((state: any) => state?.root?.teamMember);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const agencyId = searchParams.get("agencyId");
  const agency = searchParams.get("agency");
  const clientId = searchParams.get("clientId");
  const token = searchParams.get("token");

  const initialValues = {
    // firstName: '',
    // lastName: '',
    email: email ?? '',
    password: '',
    confirmPassword: '',
  };

  const onSubmit: SubmitHandler<SetPasswordSchema> = (data) => {
    const apiData = {
      email: email,
      agency_id: agencyId,
      token: token,
      password: data?.password,
      client_id: clientId,
      // first_name: data?.firstName,
      // last_name: data?.lastName,
      redirect: redirect
    }


    dispatch(verifyTeamMember(apiData)).then((result: any) => {
      if (verifyTeamMember.fulfilled.match(result)) {
        if (result && result.payload.success === true) {
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
              {agency} invited you to their Syncupp. Setup your password to join {agency} on Syncupp.
            </Title> <br />
            {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:gap-5 xl:pb-2">
              <Input
                onKeyDown={handleKeyDown}
                type="text"
                size={isMedium ? 'lg' : 'xl'}
                label="First Name"
                placeholder="Enter first name"
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
                label="Last Name"
                placeholder="Enter last name"
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
                size={isMedium ? 'lg' : 'xl'}
                label="Email ID"
                placeholder="Enter your email"
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
                size={isMedium ? 'lg' : 'xl'}
                rounded="pill"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('password')}
                error={errors.password?.message}
              />
              <Password
                onKeyDown={handleKeyDown}
                label="Confirm Password"
                placeholder="Enter your password"
                size={isMedium ? 'lg' : 'xl'}
                rounded="pill"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
              />
            </div>
            <div className='w-full'>
              <Button
                className="border-2 text-base font-medium float-end"
                type="submit"
                size={isMedium ? 'lg' : 'xl'}
                color="info"
                rounded="pill"
                disabled={teamMemberData?.loading}
              >
                Create Password
                {teamMemberData?.loading && <Spinner size="sm" tag='div' className='ms-3' color='white' />}
              </Button>
            </div>
          </div>
        )}
      </Form>

    </>
  );
}
