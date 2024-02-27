import { metaObject } from '@/config/site.config';
import AgencyViewProfileForm from './agency-view-profile-form';

export const metadata = {
  ...metaObject('Agency Profile'),
};

export default function Page() {
  return (
    <AgencyViewProfileForm />
  );
}