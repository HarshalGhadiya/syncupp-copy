
import { metaObject } from '@/config/site.config';
import TeamDataTablePage from './main-page';

export const metadata = {
  ...metaObject('Client Team'),
};

export default function Page() {
  return (
    <>
      <TeamDataTablePage />
    </>
  );
}
