
import { metaObject } from '@/config/site.config';
import ViewTeamMemberForm from './viewTeamMember';

export const metadata = {
  ...metaObject('Agency Team'),
};

export default function Page() {
  return (
    <>
      <ViewTeamMemberForm />
    </>
  );
}
