import { metaObject } from '@/config/site.config';
import CouponManagementformPage from './couponMangementform';

export const metadata = {
  ...metaObject('couponManagement'),
};
export default function CouponManagementFormPage() {
  return (
    <>
      <CouponManagementformPage />
    </>
  );
}
