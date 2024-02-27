import { metaObject } from '@/config/site.config';
import ViewPricing from './ViewPricing';

export const metadata = {
  ...metaObject('pricing Campare'),
};

export default function Page() {
  return (
    <>
      <ViewPricing />
    </>
  );
}
