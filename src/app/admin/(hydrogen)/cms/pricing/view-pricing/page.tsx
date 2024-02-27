import { metaObject } from '@/config/site.config';
import ViewPricing from './ViewPricing';

export const metadata = {
  ...metaObject('Price'),
};

export default function Page() {
  return (
    <>
      <ViewPricing />
    </>
  );
}
