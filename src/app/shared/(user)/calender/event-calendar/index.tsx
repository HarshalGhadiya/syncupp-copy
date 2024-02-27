'use client';

import type { CalendarEvent } from '@/types';
import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import EventForm from '@/app/shared/(user)/calender/event-calendar/event-form';
import DetailsEvents from '@/app/shared/(user)/calender/event-calendar/details-event';
import { useModal } from '@/app/shared/modal-views/use-modal';
import useEventCalendar from '@/hooks/use-event-calendar';
import cn from '@/utils/class-names';
import { Button } from 'rizzui';
import DatePeriodSelectionForm from '../../forms/select-period-form';
import AddActivityFormPage from '../create-edit-event/create-edit-activity-form';
import { useDispatch } from 'react-redux';
import { getAllActivity } from '@/redux/slices/user/activity/activitySlice';
import moment from 'moment';

const localizer = dayjsLocalizer(dayjs);
// rbc-active -> black button active
const calendarToolbarClassName =
  '[&_.rbc-toolbar_.rbc-toolbar-label]:whitespace-nowrap [&_.rbc-toolbar_.rbc-toolbar-label]:my-2 [&_.rbc-toolbar]:flex [&_.rbc-toolbar]:flex-col [&_.rbc-toolbar]:items-center @[56rem]:[&_.rbc-toolbar]:flex-row [&_.rbc-btn-group_button:hover]:bg-gray-300 [&_.rbc-btn-group_button]:duration-200 [&_.rbc-btn-group_button.rbc-active:hover]:bg-gray-600 dark:[&_.rbc-btn-group_button.rbc-active:hover]:bg-gray-300 [&_.rbc-btn-group_button.rbc-active:hover]:text-gray-50 dark:[&_.rbc-btn-group_button.rbc-active:hover]:text-gray-900';

export default function EventCalendarView() {
  const { events } = useEventCalendar();
  const { openModal } = useModal();
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');


  const firstDayOfMonth = moment().startOf('month').format('DD-MM-YYYY');
  // console.log("first day of month...", firstDayOfMonth);

  const endDayOfMonth = moment().endOf('month').format('DD-MM-YYYY');
  // console.log("end day of month...", endDayOfMonth);


  useEffect(() => {
    dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', filter: { date: 'period', start_date: firstDayOfMonth, end_date: endDayOfMonth }, pagination: false }))
  }, [dispatch, firstDayOfMonth, endDayOfMonth]);




  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      openModal({
        // view: <EventForm startDate={start} endDate={end} />,
        view: <AddActivityFormPage title="Add Activity" />,
        customSize: '1050px',
      });
    },
    [openModal]
  );



  const handleSelectEvent = useCallback(
    (event: CalendarEvent) => {
      openModal({
        view: <DetailsEvents event={event} />,
        // view: <AddActivityFormPage title="Edit Activity" />,
        customSize: '1050px',
      });
    },
    [openModal]
  );

  const { views, scrollToTime, formats } = useMemo(
    () => ({
      views: {
        month: true,
        week: true,
        day: true,
        agenda: true,
      },
      scrollToTime: new Date(2023, 10, 27, 6),
      formats: {
        dateFormat: 'D',
        weekdayFormat: (date: Date, culture: any, localizer: any) =>
          localizer.format(date, 'ddd', culture),
        dayFormat: (date: Date, culture: any, localizer: any) =>
          localizer.format(date, 'ddd M/D', culture),
        timeGutterFormat: (date: Date, culture: any, localizer: any) =>
          localizer.format(date, 'hh A', culture),
      },
    }),
    []
  );

  return (
    <>
      <div className='mt-4'>
        <div className="ms-auto mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-7 gap-3">
          <Button
            variant="outline"
            className="mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0"
          >
            Today
          </Button>
          <Button
            variant="outline"
            className="mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0"
          >
            Tomorrow
          </Button>
          <Button
            variant="outline"
            className="mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0"
          >
            This Week
          </Button>
          <div className='mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0 col-span-3 lg:col-span-2 md:col-span-2 sm:col-span-2'>
            <DatePeriodSelectionForm setStartDate={setStartDate} setEndDate={setEndDate} />
          </div>
        </div>
      </div>
      <div className="@container mt-12">
        <Calendar
          localizer={localizer}
          events={events}
          views={views}
          formats={formats}
          startAccessor="start"
          endAccessor="end"
          dayLayoutAlgorithm="no-overlap"
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          // onNavigate={(date) => console.log(date)}
          selectable
          scrollToTime={scrollToTime}
          className={cn('h-[650px] md:h-[1000px]', calendarToolbarClassName)}
        />
      </div>
    </>
  );
}
