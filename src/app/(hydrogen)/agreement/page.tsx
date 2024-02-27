
import { metaObject } from '@/config/site.config';
import AgreementPage from './main-page';


export const metadata = {
    ...metaObject('Agreement'),
};

export default function Page() {
    return (
        <>
            <AgreementPage />
        </>
    );
}
