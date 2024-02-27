"use client";
// import Link from 'next/link';
import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { PiListBullets, PiPlusBold } from 'react-icons/pi';
import { ActionIcon, Button } from 'rizzui';
import cn from '@/utils/class-names';
import AddActivityFormPage from '@/app/shared/(user)/calender/create-edit-event/create-edit-activity-form';
import EventCalendarView from '@/app/shared/(user)/calender/event-calendar';
import { FaRegCalendarAlt } from 'react-icons/fa';
import ActivityTablePage from './activity-table';
import { useState } from 'react';
import { setCalendarView } from '@/redux/slices/user/activity/activitySlice';

const pageHeader = {
  title: 'Activity',
};

export default function CalendarMainPage() {

  const dispatch = useDispatch();
  const router = useRouter();
  const signIn = useSelector((state: any) => state?.root?.signIn)
  const clientSliceData = useSelector((state: any) => state?.root?.client);
  const taskData = useSelector((state: any) => state?.root?.task);
  const { calendarView } = useSelector((state: any) => state?.root?.activity);




  const handleListView = () => {
    dispatch(setCalendarView(false));
  }

  const handleGridView = () => {
    dispatch(setCalendarView(true));
  }


  return (
    <>
      <PageHeader title={pageHeader.title}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {(signIn?.role !== 'client' && signIn?.role !== 'team_client') &&
            <ModalButton
              label="Add Activity"
              view={<AddActivityFormPage title="New Activity" isTaskModule={false} />}
              customSize="1050px"
            className="mt-0 w-full max-h-[800px] overflow-auto bg-[#53216F] hover:bg-[#8e45b8] @lg:w-auto dark:bg-gray-100 dark:text-white dark:hover:bg-gray-200 dark:active:bg-gray-100"
              icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
            />
          }
        </div>
      </PageHeader>

      <div className="flex justify-end items-center gap-2 w-fit ms-auto rounded-lg border border-gray-200 p-1.5 px-1.5">
        <ActionIcon
          size="sm"
          variant="flat"
          className={cn(
            'group bg-transparent hover:enabled:bg-gray-100 dark:hover:enabled:bg-gray-200',
            !calendarView && 'bg-gray-900 dark:bg-gray-200'
          )}
          onClick={handleListView}
        >
          <PiListBullets
            className={cn(
              'h-5 w-5 transition-colors group-hover:text-gray-900',
              !calendarView && 'text-white'
            )}
          />
        </ActionIcon>
        <ActionIcon
          size="sm"
          variant="flat"
          className={cn(
            'group bg-transparent hover:enabled:bg-gray-100  dark:hover:enabled:bg-gray-200',
            calendarView && 'bg-gray-900 dark:bg-gray-200'
          )}
          onClick={handleGridView}
        >
          <FaRegCalendarAlt
            className={cn(
              'h-5 w-5 transition-colors group-hover:text-gray-900',
              calendarView && 'text-white'
            )}
          />
        </ActionIcon>
      </div>

      {!calendarView ? (
        <ActivityTablePage />
      ) : (
        <EventCalendarView />
      )
      }
    </>
  );
}

