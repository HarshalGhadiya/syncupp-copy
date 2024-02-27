
import { metaObject } from '@/config/site.config';
import CreateAgreementForm from './main-page';


export const metadata = {
  ...metaObject('Create Agreement'),
};

export default function Page() {
  return (
    <>
      <CreateAgreementForm />
    </>
  );
}
