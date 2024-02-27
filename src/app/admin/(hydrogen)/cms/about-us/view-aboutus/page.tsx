import { metaObject } from '@/config/site.config';
import ViewAboutus from './ViewAboutus';

export const metadata = {
  ...metaObject('AboutUs'),
};

export default function Page() {
  return (
    <>
      <ViewAboutus></ViewAboutus>
    </>
  );
}
