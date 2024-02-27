import { metaObject } from '@/config/site.config';
import AgencyTeamMemberViewProfileForm from './agency-team-view-profile-form';

export const metadata = {
  ...metaObject('Agency Team member Details'),
};

export default function Page({ params }: any) {
  return (
    <AgencyTeamMemberViewProfileForm id={params?.id} />
  );
}