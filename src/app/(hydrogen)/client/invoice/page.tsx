
import { metaObject } from '@/config/site.config';
import InvoicePage from './main-page';

export const metadata = {
    ...metaObject('Invoice'),
};

export default function Page() {
    return (
        <>
            <InvoicePage />
        </>
    );
}
