import { metaObject } from '@/config/site.config';
import CmsPrivacyForm from './privacyFrom';

export const metadata = {
  ...metaObject('Privacy'),
};

export default function Page() {
  return (
    <>
      <CmsPrivacyForm />
    </>
  );
}
