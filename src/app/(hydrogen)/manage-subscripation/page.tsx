import { metaObject } from '@/config/site.config';
import SubcripationPage from './main-page';

export const metadata = {
  ...metaObject('Manage Subscription'),
};

export default function Page() {
  return (
    <>
      <SubcripationPage />
    </>
  );
}
