import { metaObject } from '@/config/site.config';
import CouponManagementPage from './main-page';

export const metadata = {
  ...metaObject('CouponManagement'),
};

export default function Page() {
  return (
    <>
      <CouponManagementPage />
    </>
  );
}
