import { metaObject } from '@/config/site.config';
import Notificationpage from './main-page';

export const metadata = {
  ...metaObject('Notifications'),
};

export default function Page() {
  return (
    <>
      <Notificationpage />
    </>
  );
}
