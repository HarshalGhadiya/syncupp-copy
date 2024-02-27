
import { metaObject } from '@/config/site.config';
import ClientPage from './main-page';

export const metadata = {
    ...metaObject('Agency list'),
};

export default function ClientReviewPageForm() {
    return (
        <>
            <ClientPage />
        </>
    );
}