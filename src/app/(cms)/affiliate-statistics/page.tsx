import { metaObject } from '@/config/site.config';
import AffiliateStatistics from './AffiliateStatistics';

export const metadata = {
  ...metaObject('Affiliate Statistics'),
};

export default function BlankPage() {
  return (
    <>
      <AffiliateStatistics></AffiliateStatistics>
    </>
  );
}
