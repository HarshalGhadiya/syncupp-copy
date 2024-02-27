import FileDashboard from '@/app/shared/file/dashboard';
import { metaObject } from '@/config/site.config';
import DashboardPage from './main-page';


export const metadata = {
  ...metaObject('Dashboard'),
};


export default function FileDashboardPage() {
  return (
    <>
      {/* <FileDashboard /> */}
      <DashboardPage />
    </>
  );
}
