
import { metaObject } from '@/config/site.config';
import ViewTeamMemberForm from './viewTeamMember';

export const metadata = {
  ...metaObject('Team'),
};

export default function Page() {
  return (
    <>
      <ViewTeamMemberForm />
    </>
  );
}
