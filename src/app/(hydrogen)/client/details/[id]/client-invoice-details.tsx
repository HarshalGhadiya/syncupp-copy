
import InvoiceDataTablePage from "@/app/(hydrogen)/invoice/main-page";
import { useSelector } from "react-redux";


export default function ClientInvoiceTablePage() {

    const clientSliceData = useSelector((state: any) => state?.root?.client)?.clientProfile;
    // console.log(clientSliceData, 'clientSliceData')

    return (
        <>
            <InvoiceDataTablePage clientSliceData={clientSliceData} />
        </>
    )
}
