'use client';

import { Title } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { useEffect, useState } from 'react';
import { routes } from '@/config/routes';
import { useDispatch, useSelector } from 'react-redux';
import { handleKeyDown } from '@/utils/common-functions';
import { useRouter } from 'next/navigation';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { PiNotePencilDuotone, PiXBold } from 'react-icons/pi';
import { ActionIcon } from 'rizzui';
import cn from '@/utils/class-names';
import {
  AdminEditProfileSchema,
  adminEditProfileSchema,
} from '@/utils/validators/admin-edit-profile.schema';
import {
  getViewProfiles,
  postEditProfile,
} from '@/redux/slices/admin/auth/viewprofile/viewProfileSlice';
import Spinner from '@/components/ui/spinner';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function ViewProfileForm(props: any) {
  const [reset, setReset] = useState({});
  const [title, setTitle] = useState('');
  // const [image, setImage] = useState(!!data?.image ? data?.image : 'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-11.webp');
  const { closeModal } = useModal();
  const [isOpenEditMode, setIsOpenEditMode] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const viewProfile = useSelector((state: any) => state?.root?.viewProfile);
  
  useEffect(() => {
    dispatch(getViewProfiles());
  }, [dispatch]);

  const data  = viewProfile?.data;
  const initialValues = {
    email: data?.email ?? '',
    first_name: data?.first_name ?? '',
    last_name: data?.last_name ?? '',
    contact_number: data?.contact_number ?? '',
  };
  const onSubmit: SubmitHandler<AdminEditProfileSchema> = (data) => {
    const formData = {
      email: data?.email ?? '',
      first_name: data?.first_name ?? '',
      last_name: data?.last_name ?? '',
      contact_number: data?.contact_number ?? '',
    }
    dispatch(postEditProfile(formData)).then((result: any) => {
      if (postEditProfile.fulfilled.match(result)) {
        if (result && result.payload.success === true) {
          setIsOpenEditMode(false)
        }
      }
    });
  };
  if (viewProfile?.data === 'pending') {
    return (
      <div className="flex items-center justify-center p-10">
        <Spinner size="xl" tag="div" className="ms-3" />
      </div>
    );
  } else {
    return (
      <>
        <Form<AdminEditProfileSchema>
          validationSchema={adminEditProfileSchema}
          resetValues={reset}
          onSubmit={onSubmit}
          useFormProps={{
            mode: 'all',
            defaultValues: initialValues,
          }}
          className=" p-10 [&_label]:font-medium"
        >
          {({ register, formState: { errors } }) => (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="mb-6 flex items-center justify-between">
                  <Title>
                    {isOpenEditMode ? 'Edit Profile' : 'View Profile'}
                  </Title>
                  {/* <Title as="h3" className="text-xl xl:text-2xl">
                  View Profile
                </Title> */}
                </div>
                <div className="mr-8">
                  {!isOpenEditMode && (
                    <ActionIcon
                      size="sm"
                      variant="text"
                      onClick={() => {
                        setIsOpenEditMode(!isOpenEditMode);
                      }}
                      className="p-0 text-gray-500 hover:!text-gray-900"
                    >
                      <div className="ml-[68%]"></div>
                      <Button
                      className="hover:gray-700 float-end @xl:w-auto dark:bg-gray-200 dark:text-white"
                      onClick={() => {
                        setIsOpenEditMode(false);
                      }}
                    >
                      <PiNotePencilDuotone className="h-[20px] w-[20px] mr-1" />
                      Edit
                    </Button>
                    </ActionIcon>
                  )}
                </div>
              </div>
              <div className="flex  md:justify-center lg:justify-start items-center gap-8 md:pr-8">
                <h4>Personal information</h4>
                {/* <div className="flex justify-end  items-center gap-8 pr-8" id={'we are in button'}>
                  <div className="">
                      <Button className="bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0"
                    disabled={!isOpenEditMode}
                    >
                        <FaArrowLeft className="h-[17px] w-[17px]" />
                        Back
                      </Button>
                  </div>
                  <div className="">
                    {!isOpenEditMode && (
                      <ActionIcon
                        size="sm"
                        variant="text"
                        onClick={() => {
                          setIsOpenEditMode(!isOpenEditMode);
                        }}
                        className="flex  text-gray-500 hover:!text-gray-900"
                      >
                        <Button
                          className="hover:gray-700 @xl:w-auto dark:bg-gray-200 dark:text-white"
                          onClick={() => {
                            setIsOpenEditMode(false);
                          }}
                        >
                          <PiNotePencilDuotone className="mr-1 h-[20px] w-[20px]" />
                          Edit
                        </Button>
                      </ActionIcon>
                    )}
                  </div>
                </div> */}
              </div>
              <div className="grid grid-cols-2 gap-4 pt-5">
                <>
                  <Input
                    onKeyDown={handleKeyDown}
                    type="text"
                    label="Email"
                    placeholder="Enter Your email"
                    color="info"
                    className="[&>label>span]:font-medium"
                    {...register('email')}
                    error={errors.email?.message}
                    disabled={true}
                  />
                  <Input
                    onKeyDown={handleKeyDown}
                    type="text"
                    label="First Name"
                    placeholder="Enter First Name"
                    color="info"
                    className="[&>label>span]:font-medium"
                    {...register('first_name')}
                    error={errors.first_name?.message}
                    disabled={!isOpenEditMode}
                  />
                  <Input
                    onKeyDown={handleKeyDown}
                    type="text"
                    label="Last Name"
                    placeholder="Enter Last Name"
                    color="info"
                    className="[&>label>span]:font-medium"
                    {...register('last_name')}
                    error={errors.last_name?.message}
                    disabled={!isOpenEditMode}
                  />
                  <Input
                    onKeyDown={handleKeyDown}
                    type="number"
                    label="Contact Number"
                    placeholder="Enter Contact Number"
                    color="info"
                    className="[&>label>span]:font-medium"
                    {...register('contact_number')}
                    error={errors.contact_number?.message}
                    disabled={!isOpenEditMode}
                  />
                </>
              </div>
              {/* )} */}
              {isOpenEditMode && (
                <div className={cn('float-end flex space-x-4 justify-between items-center')}>
                  <Button
                    variant="outline"
                    className="@xl:w-auto dark:hover:border-gray-400"
                    onClick={() => {
                      setIsOpenEditMode(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="hover:gray-700 @xl:w-auto dark:bg-gray-200 dark:text-white"
                    disabled={viewProfile.loading}
                  >
                    Save
                    {viewProfile.loading && (
                      <Spinner size="sm" tag="div" className="ms-3" />
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
        </Form>
      </>
    );
  }
}
