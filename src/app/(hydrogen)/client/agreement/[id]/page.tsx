
import { metaObject } from '@/config/site.config';
import AgreementDetailsPage from './main-page';

export const metadata = {
    ...metaObject('Agreement Details'),
};

export default function Page({ params }: { params: { id: string } }) {
    return (
        <>
            <AgreementDetailsPage params={params} />
        </>
    );
}
