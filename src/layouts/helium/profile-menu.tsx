'use client';

import ModalButton from '@/app/shared/modal-button';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover } from '@/components/ui/popover';
import { Title, Text } from '@/components/ui/text';
import { getUserProfile, logoutUser, signOutUser } from '@/redux/slices/user/auth/signinSlice';
import cn from '@/utils/class-names';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./style.css"
import ChangePasswordForm from '@/app/shared/(user)/forms/change-password-form';
import { routes } from '@/config/routes';
import Link from 'next/link';
import Spinner from '@/components/ui/spinner';
import Profile from '@public/dummyprofile.jpg';
import { useModal } from '@/app/shared/modal-views/use-modal';

function DropdownMenu() {

  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const router = useRouter();
  const { userProfile , loading} = useSelector((state: any) => state?.root?.signIn);

  const handleClick = () => {
    closeModal();
    dispatch(signOutUser()).then((result: any) => {
      if (signOutUser.fulfilled.match(result)) {
        // router.replace('/signin');
        window.location.href = routes?.signIn;
        dispatch(logoutUser());
      }
    })
  }
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
          name="Albert Flores"
          color="invert"
        />
        <div className="ms-3">
          <Title as="h6" className="break-all text-sm font-semibold">
            {`${capitalizeFirstLetter(userProfile?.first_name ?? '')} ${capitalizeFirstLetter(userProfile?.last_name ?? '')}`}
          </Title>
          <Text className="break-all text-sm text-gray-600">
            {`${userProfile?.email}`}
          </Text>
        </div>
      </div>
      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">
        <Link
          className="mt-0 justify-start bg-white text-gray-900"
          href={routes.viewProfile}
        >
          <Button variant="text">View Profile</Button>
        </Link>

        <ModalButton
          label="Change Password"
          view={<ChangePasswordForm />}
          customSize="625px"
          className="mt-0 justify-start bg-white text-gray-900"
        />
      </div>
      <div className="border-t border-gray-300 px-6 py-4">
        <Button
          className="ml-2 h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
          variant="text"
          onClick={handleClick}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
}
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
