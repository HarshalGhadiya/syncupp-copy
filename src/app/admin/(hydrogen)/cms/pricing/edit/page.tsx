import { metaObject } from '@/config/site.config';
import CmsPricing from './pricing';

export const metadata = {
  ...metaObject('Pricing'),
};

export default function Page() {
  return (
    <>
      <CmsPricing />
    </>
  );
}
