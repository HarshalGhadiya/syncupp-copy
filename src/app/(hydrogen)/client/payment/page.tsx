
import { metaObject } from '@/config/site.config';
import ClientPaymentPage from './main-page';


export const metadata = {
    ...metaObject('Payment'),
};

export default function Page() {
    return (
        <>
            <ClientPaymentPage />
        </>
    );
}
