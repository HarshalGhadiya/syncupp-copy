import { metaObject } from '@/config/site.config';
import EventCalendarView from '@/app/shared/(user)/calender/event-calendar/index';
import ModalButton from '@/app/shared/modal-button';
import PageHeader from '@/app/shared/page-header';
import EventForm from '@/app/shared/(user)/calender/event-calendar/event-form';

export const metadata = {
  ...metaObject('Event Calendar'),
};

const pageHeader = {
  title: 'Event Calendar',
};

export default function EventCalendarPage() {
  return (
    <>
      <PageHeader title={pageHeader.title}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ModalButton
            label="Create Event"
            view={<EventForm />}
            customSize="900px"
            className="mt-0 w-full bg-[#53216F] hover:bg-[#8e45b8] @lg:w-auto dark:bg-gray-100 dark:text-white dark:hover:bg-gray-200 dark:active:bg-gray-100"
          />
        </div>
      </PageHeader>

      <EventCalendarView />
    </>
  );
}
