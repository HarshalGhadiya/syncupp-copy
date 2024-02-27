
import { metaObject } from '@/config/site.config';
import FaqPage from './main-page';

export const metadata = {
  ...metaObject('Faq'),
};

export default function FaqsPage() {
  return (
    <>
      <FaqPage />
    </>
  );
}
