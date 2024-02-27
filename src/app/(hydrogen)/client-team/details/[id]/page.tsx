import { metaObject } from '@/config/site.config';
import ClientTeamMemberViewProfileForm from './client-team-view-profile-form';

export const metadata = {
  ...metaObject('Client Team member Details'),
};

export default function Page({ params }: any) {
  return (
    <ClientTeamMemberViewProfileForm id={params?.id} />
  );
}