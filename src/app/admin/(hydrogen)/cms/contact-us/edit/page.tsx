import { metaObject } from '@/config/site.config';
import CmsContactus from './ConatctUsform';

export const metadata = {
  ...metaObject('ContactUS'),
};

export default function Page() {
  return (
    <>
      <CmsContactus />
    </>
  );
}
