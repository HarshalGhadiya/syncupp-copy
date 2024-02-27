'use client';

import { Title } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { useState } from 'react';
import { routes } from '@/config/routes';
import { useMedia } from '@/hooks/use-media';
import { Password } from '@/components/ui/password';
import { ChangePasswordSchema, changePasswordSchema } from '@/utils/validators/change-password.schema';
import { useDispatch, useSelector } from 'react-redux';
import { changePasswordAdmin } from '@/redux/slices/admin/auth/updatePassword/changePasswordSlice';
import { handleKeyDown } from '@/utils/common-functions';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/spinner';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { PiXBold } from 'react-icons/pi';
import { ActionIcon } from 'rizzui';
import cn from '@/utils/class-names';

const initialValues: ChangePasswordSchema = {
  oldPassword: '',
  newPassword: '',
  confirmedPassword: ''
};

export default function ChangePasswordForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const router = useRouter();
  const changePassword = useSelector((state: any) => state?.root?.adminChangePassword)

  const onSubmit: SubmitHandler<ChangePasswordSchema> = (data) => {
    dispatch(changePasswordAdmin(data)).then((result: any) => {
      if (changePasswordAdmin.fulfilled.match(result)) {
        if (result && result.payload.success === true ) {
        closeModal();
        } 
      }
    })
  };

  return (
    <>
      <Form<ChangePasswordSchema>
        validationSchema={changePasswordSchema}
        // resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
          mode: 'all'
        }}
        className=" [&_label]:font-medium p-10"
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <div className="mb-6 flex items-center justify-between">
              <Title as="h3" className="text-xl xl:text-2xl">
                Change Password
              </Title>
              <ActionIcon
                size="sm"
                variant="text"
                onClick={() => closeModal()}
                className="p-0 text-gray-500 hover:!text-gray-900"
              >
                <PiXBold className="h-[18px] w-[18px]" />
              </ActionIcon>
            </div>
            <Password
                onKeyDown={handleKeyDown}
                label="Current Password"
                placeholder="Enter your password"
                size={isMedium ? 'lg' : 'xl'}
                color="info"
                className="[&>label>span]:font-medium"
                {...register('oldPassword')}
                error={errors.oldPassword?.message}
              />
            <Password
                onKeyDown={handleKeyDown}
                label="New Password"
                placeholder="Enter your password"
                size={isMedium ? 'lg' : 'xl'}
                color="info"
                className="[&>label>span]:font-medium"
                {...register('newPassword')}
                error={errors.newPassword?.message}
              />
            <Password
                onKeyDown={handleKeyDown}
                label="Confirm New Password"
                placeholder="Enter your password"
                size={isMedium ? 'lg' : 'xl'}
                color="info"
                className="[&>label>span]:font-medium"
                {...register('confirmedPassword')}
                error={errors.confirmedPassword?.message}
            />
            <div className={cn('grid grid-cols-2 gap-4 pt-5')}>
                <Button
                  variant="outline"
                  className="w-full @xl:w-auto dark:hover:border-gray-400"
                  onClick={() => closeModal()}
                >
                  Cancel
                </Button>
                <Button
                  className="hover:gray-700 w-full  @xl:w-auto dark:bg-gray-200 dark:text-white"
                  type="submit"
                  disabled={changePassword.loading}
                >
                  Save
                  {changePassword.loading && <Spinner size="sm" tag='div' className='ms-3' />}
                </Button>
              </div>
          </div>
        )}
      </Form>
    </>
  );
}
