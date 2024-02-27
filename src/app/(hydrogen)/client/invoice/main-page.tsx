"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import CustomTable from '@/components/common-tables/table';
import { AgreementColumns } from '@/app/shared/agreement/columns';
import PageHeader from '@/app/shared/page-header';
import { Button } from 'rizzui';
import Jsondata from '@/locales/en/translation.json'
import { PiPlusBold } from 'react-icons/pi';
import { getAllclientinvoice } from '@/redux/slices/user/client/invoice/clientinvoiceSlice';
import { ClientInvoiceColumns } from '@/app/shared/(user)/client/invoice/columns';


const pageHeader = {
    title: 'Invoice',
};


export default function InvoicePage() {

    const dispatch = useDispatch();
    const router = useRouter();

    const { invoiceDetails, loading } = useSelector((state: any) => state?.root?.clieninvoice);
    const clientSliceData = useSelector((state: any) => state?.root?.client);
    console.log(invoiceDetails, 'invoiceDetails')

    const [pageSize, setPageSize] = useState(5)

    //Paggination Handler
    const handleChangePage = async (paginationParams: any) => {
        let { page, items_per_page, sort_field, sort_order, search } = paginationParams;
        const response = await dispatch(getAllclientinvoice({ page, items_per_page, sort_field, sort_order, search, agency_id: clientSliceData?.agencyId }));
        const { data } = response?.payload;
        const maxPage: number = data?.page_count;
        console.log(maxPage, 'maxPage')

        if (page > maxPage) {
            page = maxPage > 0 ? maxPage : 1;
            await dispatch(getAllclientinvoice({ page, items_per_page, sort_field, sort_order, search, agency_id: clientSliceData?.agencyId }));
            return data?.client
        }
        return data?.client
    };

    // Delete Handler
    const handleDeleteById = async (id: string | string[], currentPage?: any, countPerPage?: number) => {
        // try {
        //     const res = await dispatch(deleteAgencyAgreement({ agreementIdsToDelete: id }));
        //     if (res.payload.success === true) {
        //         const reponse = await dispatch(getAllAgencyagreement({ page: currentPage, items_per_page: countPerPage, sort_field: 'createdAt', sort_order: 'desc' }));
        //     }
        // } catch (error) {
        //     console.error(error);
        // }
    };


    return (
        <>
            {/* <h1>Aggrement</h1> */}
            <PageHeader title={pageHeader.title} />
            <CustomTable
                data={invoiceDetails?.data?.invoiceList || []}
                total={invoiceDetails?.data?.page_count || 1}
                loading={loading}
                pageSize={pageSize}
                setPageSize={setPageSize}
                handleDeleteById={handleDeleteById}
                handleChangePage={handleChangePage}
                getColumns={ClientInvoiceColumns}
            />
        </>
    )

}