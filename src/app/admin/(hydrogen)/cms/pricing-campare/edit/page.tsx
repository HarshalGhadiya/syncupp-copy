import { metaObject } from '@/config/site.config';
import PricaingCampare from './PricaingCampare';

export const metadata = {
  ...metaObject('price campare'),
};

export default function Page() {
  return (
    <>
      <PricaingCampare />
    </>
  );
}
