
import { metaObject } from '@/config/site.config';
import CalendarMainPage from './main-page';

export const metadata = {
  ...metaObject('Calendar'),
};

export default function CalenderPage() {
  return (
    <>
      <CalendarMainPage />
    </>
  );
}
