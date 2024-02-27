'use client';

import { Title, ActionIcon } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Password } from '@/components/ui/password';
import { ChangePasswordSchema, changePasswordSchema } from '@/utils/validators/change-password.schema';
import { useDispatch, useSelector } from 'react-redux';
import { changePasswordUser } from '@/redux/slices/user/auth/changePasswordSlice';
import { handleKeyDown } from '@/utils/common-functions';
import Spinner from '@/components/ui/spinner';
import { useModal } from '@/app/shared/modal-views/use-modal';
import cn from '@/utils/class-names';
import { PiXBold } from 'react-icons/pi';


const initialValues: ChangePasswordSchema = {
  oldPassword: '',
  newPassword: '',
  confirmedPassword: ''
};

export default function ChangePasswordForm() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const changePassword = useSelector((state: any) => state?.root?.changePassword)
  const onSubmit: SubmitHandler<ChangePasswordSchema> = (data) => {
    const formData = {
      currentPassword: data?.oldPassword,
      newPassword: data?.newPassword,
      confirmedPassword: data?.confirmedPassword
    }
    dispatch(changePasswordUser(formData)).then((result: any) => {
      if (changePasswordUser.fulfilled.match(result)) {
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
                color="info"
                className="[&>label>span]:font-medium"
                {...register('oldPassword')}
                error={errors.oldPassword?.message}
              />
            <Password
                onKeyDown={handleKeyDown}
                label="New Password"
                placeholder="Enter your password"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('newPassword')}
                error={errors.newPassword?.message}
              />
            <Password
                onKeyDown={handleKeyDown}
                label="Confirm New Password"
                placeholder="Enter your password"
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
                  type="submit"
                  className="hover:gray-700 w-full  @xl:w-auto dark:bg-gray-200 dark:text-white"
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
