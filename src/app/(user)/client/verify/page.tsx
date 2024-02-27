import { metaObject } from '@/config/site.config';
import MainPage from './main-page';

export const metadata = {
  ...metaObject('Set Password Client'),
};

export default function Page() {
  return (
    <MainPage />
  );
}