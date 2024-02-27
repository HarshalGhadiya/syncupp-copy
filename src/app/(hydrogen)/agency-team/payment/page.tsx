
import { metaObject } from '@/config/site.config';
import AgreementTeamPaymentPage from './main-page';


export const metadata = {
    ...metaObject('Payment'),
};

export default function Page() {
    return (
        <>
            <AgreementTeamPaymentPage />
        </>
    );
}
