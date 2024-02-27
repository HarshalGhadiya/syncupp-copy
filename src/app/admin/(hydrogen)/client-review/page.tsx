
import { metaObject } from '@/config/site.config';
import ClientReviewPage from './main-page';

export const metadata = {
  ...metaObject('Client Review'),
};

export default function ClientReviewPageForm() {
  return (
    <>
      <ClientReviewPage />
    </>
  );
}