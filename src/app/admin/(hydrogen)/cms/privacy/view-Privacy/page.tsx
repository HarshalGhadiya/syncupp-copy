import { metaObject } from '@/config/site.config';
import ViewPrivacy from './ViewPrivacy';

export const metadata = {
  ...metaObject('Privacy'),
};

export default function Page() {
  return (
    <>
      <ViewPrivacy></ViewPrivacy>
    </>
  );
}
