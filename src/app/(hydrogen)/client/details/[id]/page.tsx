import { metaObject } from '@/config/site.config';
import ClientViewProfileForm from './client-view-profile-form';

export const metadata = {
  ...metaObject('Client Details'),
};

export default function Page({ params }: any) {
  return (
    <ClientViewProfileForm id={params?.id} />
  );
}