import TermAndConditionPage from '@/app/admin/(hydrogen)/cms/page';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Terms & Conditions'),
};

export default function BlankPage() {
  return (
    <>
      <TermAndConditionPage></TermAndConditionPage>
    </>
  );
}
