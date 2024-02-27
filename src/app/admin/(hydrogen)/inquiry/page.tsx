
import { metaObject } from '@/config/site.config';
import AdmininquirylistPage from './main-page';

export const metadata = {
    ...metaObject('Inquiry'),
};

export default function FaqsPage() {
    return (
        <>
            <AdmininquirylistPage />
        </>
    );
}
