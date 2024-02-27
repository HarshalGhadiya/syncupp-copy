
import { metaObject } from '@/config/site.config';
import InvoiceDetails from './main-page';

export const metadata = {
    ...metaObject('View Invoice'),
};

export default function Page({ params }: { params: { id: string } }) {
    return (
        <>
            <InvoiceDetails params={params} />
        </>
    );
}
