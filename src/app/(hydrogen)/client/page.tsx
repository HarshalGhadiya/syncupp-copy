
import { metaObject } from '@/config/site.config';
import ClientPage from './main-page';

export const metadata = {
  ...metaObject('Client'),
};

export default function Page() {
  return (
    <>
      <ClientPage />
    </>
  );
}
