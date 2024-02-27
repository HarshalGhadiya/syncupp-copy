import { metaObject } from '@/config/site.config';
import EditInvoice from './edit-invoice-form';

export const metadata = {
  ...metaObject('Edit Invoice'),
};

export default function Page({ params }: { params: { id: string } }) {

  return (
    <>
      <EditInvoice params={params} />
    </>
  );
}
