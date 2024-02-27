import { metaObject } from '@/config/site.config';
import TeamMemberViewProfileForm from './team-view-profile-form';

export const metadata = {
  ...metaObject('Team member Details'),
};

export default function Page({ params }: any) {
  return (
    <TeamMemberViewProfileForm id={params?.id} />
  );
}