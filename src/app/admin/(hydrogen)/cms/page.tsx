import { metaObject } from '@/config/site.config';
import TermsAndCondition from './main-page';

export const metadata = {
  ...metaObject('CMS'),
};
export default function TermAndConditionPage() {
  return (
    <>
      <TermsAndCondition/>
    </>
  );
}
