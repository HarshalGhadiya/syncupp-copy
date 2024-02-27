import AgreementPage from "@/app/(hydrogen)/agreement/main-page";
import { useSelector } from "react-redux";


export default function ClientAgreementTablePage() {

    const clientSliceData = useSelector((state: any) => state?.root?.client)?.clientProfile;
    // console.log(clientSliceData, 'clientSliceData')

    return (
        <>
            <AgreementPage clientSliceData={clientSliceData} />
        </>
    )
}
