'use client';

import ChangePasswordForm from '@/app/admin/(hydrogen)/change-password/change-password-form';
import ModalButton from '@/app/shared/modal-button';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover } from '@/components/ui/popover';
import { Text, Title } from '@/components/ui/text';
import { routes } from '@/config/routes';
import { logoutUserAdmin } from '@/redux/slices/admin/auth/signin/signinSlice';
import cn from '@/utils/class-names';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import "../helium/style.css"
import Link from 'next/link';
import Spinner from '@/components/ui/spinner';
import Profile from '@public/dummyprofile.jpg';

const menuItems = [
  {
    name: 'My Profile',
    href: routes.admin.signIn,
  },
];
export interface UserProfileDTO {
  createdAt: Date;
  email: string;
  first_name: string;
  delete: boolean;
  last_name: string;
  password: string;
  remember_me: boolean;
  updated_at: Date,
  image: string;
  _id: string;
}

function DropdownMenu() {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleClick = () => {
    dispatch(logoutUserAdmin(''));
    router.replace('/admin/signin');
  }
  const { data: userData , loading } = useSelector((state: any) => state?.root?.viewProfile);

  function capitalizeFirstLetter(str:any) {
    if (!str) return '';
    return  str.charAt(0).toUpperCase() + str.slice(1);
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center p-10">
        <Spinner size="xl" tag="div" className="ms-3" />
      </div>
    );
  } else {
  return (
    <div className="w-64 text-left rtl:text-right">
      <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
        <Avatar
          // src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-11.webp"
          src={Profile?.src}
          name='Admin'
          color="invert"
        />
        <div className="ms-3">
          <Title as="h6" className="font-semibold">
          {`${capitalizeFirstLetter(userData?.first_name)} ${capitalizeFirstLetter(userData?.last_name)}`}
          </Title>
          <Text className="text-gray-600">{`${userData?.email}`}</Text>
        </div>
      </div>
      <Link
          className="mt-0 justify-start bg-white text-gray-900"
          href={routes.admin.viewProfile}
        >
          <Button variant="text">View Profile</Button>
        </Link>
      {/* <ModalButton
          label="View Profile"
          view={<ViewProfileForm data={data} />}
          customSize="625px"
          className="mt-0 justify-start text-gray-900 bg-white "
        /> */}
      <ModalButton
          label="Change Password"
          view={<ChangePasswordForm />}
          customSize="625px"
          className="mt-0 justify-start text-gray-900 bg-white "

        />
      <div className="border-t border-gray-300 px-6 py-4">
        <Button
          className="h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
          variant="text"
          onClick={handleClick}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}}

export default function ProfileMenu({
  buttonClassName,
  avatarClassName,
}: {
  buttonClassName?: string;
  avatarClassName?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => <DropdownMenu />}
      shadow="sm"
      placement="bottom-end"
      className="z-50 p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100"
    >
      <button
        className={cn(
          'w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10',
          buttonClassName
        )}
      >
        <Avatar
          src={Profile?.src}
          name=""
          color="invert"
          className={cn('!h-9 w-9 sm:!h-10 sm:w-10', avatarClassName)}
        />
      </button>
    </Popover>
  );
}
