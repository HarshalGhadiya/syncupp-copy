
import { metaObject } from '@/config/site.config';
import ReferalPage from './main-page';

export const metadata = {
    ...metaObject('Referal'),
};

export default function Page() {
    return (
        <>
            <ReferalPage />
        </>
    );
}
