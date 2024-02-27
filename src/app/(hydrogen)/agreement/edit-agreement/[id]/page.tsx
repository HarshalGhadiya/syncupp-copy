
import { metaObject } from '@/config/site.config';
import EditAgreementForm from './main-page';



export const metadata = {
    ...metaObject('Edit Agreement'),
};

export default function Page({ params }: { params: { id: string } }) {
    return (
        <>
            <EditAgreementForm params={params} />
        </>
    );
}
