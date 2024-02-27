import { metaObject } from '@/config/site.config';
import AddInvoiceForm from './create-invoice-form';

export const metadata = {
  ...metaObject('Create Invoice'),
};

export default function Page() {
  return (
    <>
    <AddInvoiceForm/>
    </>
  );
}
