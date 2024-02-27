
import { metaObject } from '@/config/site.config';
import TeamDataTablePage from './main-page';

export const metadata = {
  ...metaObject('Agency Team'),
};

export default function Page() {
  return (
    <>
      <TeamDataTablePage />
    </>
  );
}
