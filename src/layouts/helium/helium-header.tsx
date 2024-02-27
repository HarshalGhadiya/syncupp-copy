'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ActionIcon } from '@/components/ui/action-icon';
import MessagesDropdown from '@/layouts/helium/messages-dropdown';
import NotificationDropdown from '@/layouts/helium/notification-dropdown';
import ProfileMenu from '@/layouts/helium/profile-menu';
import HamburgerButton from '@/layouts/hamburger-button';
import { PiChatCircleDotsFill, PiBellSimpleRingingFill } from 'react-icons/pi';
import cn from '@/utils/class-names';
import Sidebar from './helium-sidebar';
import Image from 'next/image';
import { siteConfig } from '@/config/site.config';
import AgencySelectionForm from '@/app/shared/(user)/forms/agency-selection-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { receiveNotification } from '@/redux/slices/soket/notification/notificationSlice';

function HeaderMenuRight() {
  const signIn = useSelector((state: any) => state?.root?.signIn);
  const notification = useSelector((state: any) => state?.root?.notification);
  const un_read_noti = useSelector((state: any) => state?.root?.notification);
  const socket: Socket = io('http://104.248.10.11:5011');
  const disptach = useDispatch();
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to Socket.IO');

      socket.on('disconnect', () => {
        console.log('disconnected to Socket.IO');
      });
      socket.emit('ROOM', { id: signIn?.user?.data?.user?.reference_id });
      socket.on('NOTIFICATION', (notificationPayload) => {
        console.log('Received Notification:', notificationPayload);
        disptach(receiveNotification(notificationPayload));
      });
      // When Data delivered
      socket.emit('CONFIRMATION', {
        name:
          signIn?.user?.data?.user?.first_name +
          ' ' +
          signIn?.user?.data?.user?.last_name,
        id: signIn?.user?.data?.user?.reference_id,
      });
    });
  }, []);

  return (
    <div className="ms-auto grid shrink-0 grid-cols-2 items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4">
      <div>
        {(signIn?.role === 'client' || signIn?.role === 'team_client') && (
          <AgencySelectionForm />
        )}
      </div>
      <div className="ms-auto grid shrink-0 grid-cols-3 items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4">
        <MessagesDropdown>
          <ActionIcon
            aria-label="Messages"
            variant="text"
            className={cn(
              'relative h-[34px] w-[34px] overflow-hidden rounded-full shadow backdrop-blur-md before:absolute before:h-full before:w-full before:-rotate-45 before:rounded-full  md:h-9 md:w-9 3xl:h-10 3xl:w-10 '
            )}
          >
            <PiChatCircleDotsFill className="h-[18px] w-auto 3xl:h-5" />
            <Badge
              renderAsDot
              color="success"
              enableOutlineRing
              className="absolute right-1 top-2.5 -translate-x-1 -translate-y-1/4"
            />
          </ActionIcon>
        </MessagesDropdown>
        <NotificationDropdown>
          <ActionIcon
            aria-label="Notification"
            variant="text"
            className={cn(
              'relative h-[34px] w-[34px] overflow-hidden rounded-full shadow backdrop-blur-md before:absolute before:h-full before:w-full before:-rotate-45 before:rounded-full  md:h-9 md:w-9 3xl:h-10 3xl:w-10'
            )}
          >
            <PiBellSimpleRingingFill className="h-[18px] w-auto 3xl:h-5" />
            <Badge
              size="sm"
              color="warning"
              enableOutlineRing
              className="absolute right-0 top-2 -translate-x-1 -translate-y-1/4"
            >
              {notification?.un_read_noti}
            </Badge>
          </ActionIcon>
        </NotificationDropdown>
        {/* <SettingsButton className="rounded-full before:absolute before:h-full before:w-full before:-rotate-45 before:rounded-full before:bg-gradient-to-l before:from-green-dark/25 before:via-green-dark/0 before:to-green-dark/0 3xl:h-10 3xl:w-10">
        <PiGearFill className="h-[22px] w-auto animate-spin-slow" />
      </SettingsButton> */}
        <ProfileMenu />
      </div>
    </div>
  );
}

export default function Header() {
  return (
    <header
      className={
        'sticky top-0 z-50 flex items-center px-4 py-4 backdrop-blur-xl dark:bg-gray-50/50 md:px-5 lg:px-6 xl:-ms-1.5 xl:pl-4 2xl:-ms-0 2xl:py-5 2xl:pl-6 3xl:px-8 3xl:pl-6 4xl:px-10 4xl:pl-9'
      }
    >
      <div className="flex w-full max-w-2xl items-center">
        <HamburgerButton
          view={
            <Sidebar className="static w-full xl:p-0 2xl:w-full [&>div]:xl:rounded-none" />
          }
        />
        <Link
          href={'/'}
          aria-label="Site Logo"
          className="me-4 w-9 shrink-0 lg:me-5 xl:hidden"
        >
          <Image
            src={siteConfig.logo}
            alt={siteConfig.title}
            // className="dark:invert"
            width={20}
            height={20}
            priority
          />
        </Link>
        {/* <SearchWidget /> */}
      </div>
      <HeaderMenuRight />
    </header>
  );
}
