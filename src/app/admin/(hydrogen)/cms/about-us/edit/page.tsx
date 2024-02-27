import { metaObject } from '@/config/site.config';
import CmsAboutUs from './aboutusForm';

export const metadata = {
  ...metaObject('AboutUs'),
};

export default function Page() {
  return (
    <>
      <CmsAboutUs />
    </>
  );
}
