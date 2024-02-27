
import TermsAndConditionFormPage from "./termAndConditionForm";
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('T & C'),
};

export default function Page() {
  return (
    <>
      <TermsAndConditionFormPage/>
    </>
  );
}
