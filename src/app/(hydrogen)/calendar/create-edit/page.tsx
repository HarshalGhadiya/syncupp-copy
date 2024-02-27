
import AddTaskForm from '@/app/shared/(user)/calender/create-edit-event/create-edit-activity-form';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Calender'),
};

export default function CalenderPage() {
  return (
    <>
    <AddTaskForm/>
    </>
  );
}
