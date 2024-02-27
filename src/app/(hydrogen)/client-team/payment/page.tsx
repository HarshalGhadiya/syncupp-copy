
import { metaObject } from '@/config/site.config';
import ClientTeamPaymentPage from './main-page';


export const metadata = {
    ...metaObject('Payment'),
};

export default function Page() {
    return (
        <>
            <ClientTeamPaymentPage />
        </>
    );
}
