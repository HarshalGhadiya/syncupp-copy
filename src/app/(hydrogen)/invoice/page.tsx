
import { metaObject } from '@/config/site.config';
import InvoiceDataTablePage from './main-page';

export const metadata = {
  ...metaObject('Invoice'),
};

export default function Page() {
  return (
    <>
    <InvoiceDataTablePage/>
    </>
  );
}
