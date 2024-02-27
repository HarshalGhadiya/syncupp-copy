"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import CustomTable from '@/components/common-tables/table';
import { deleteAgencyAgreement, getAllAgencyagreement } from '@/redux/slices/user/agreement/agreementSlice';
import PageHeader from '@/app/shared/page-header';
import { PaymentTransactionColumns } from '@/app/shared/(admin)/payment-transaction/columns';


const DummyData = [{
    name: "Payment Information",
    date: "12/12/2023",
    form_of_payment: "Credit card",
    subscription_plan: "Platinum",
    transaction_id: "T1234-5678-9012-3456",
    status: "Success"
}, {
    name: "Payment Information",
    date: "12/12/2023",
    form_of_payment: "Credit card",
    subscription_plan: "Platinum",
    transaction_id: "T1234-5678-9012-3456",
    status: "Success"
}]

const pageHeader = {
    title: 'Payment Information',
};


export default function PaymentTransactionlistPage() {

    const dispatch = useDispatch();
    const router = useRouter();

    const { agreementDetails, loading } = useSelector((state: any) => state?.root?.agreement);
    // console.log("agreementDetails", agreementDetails, loading);

    const [pageSize, setPageSize] = useState(5)

    //Paggination Handler
    const handleChangePage = async (paginationParams: any) => {
        // let { page, items_per_page, sort_field, sort_order, search } = paginationParams;
        // const response = await dispatch(getAllAgencyagreement({ page, items_per_page, sort_field, sort_order, search }));
        // const { data } = response?.payload;
        // const maxPage: number = data?.page_count;

        // if (page > maxPage) {
        //     page = maxPage > 0 ? maxPage : 1;
        //     await dispatch(getAllAgencyagreement({ page, items_per_page, sort_field, sort_order, search }));
        //     return data?.client
        // }
        // return data?.client
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
                data={DummyData || []}
                total={10}
                loading={loading}
                pageSize={pageSize}
                setPageSize={setPageSize}
                handleDeleteById={handleDeleteById}
                handleChangePage={handleChangePage}
                getColumns={PaymentTransactionColumns}
            />
        </>
    )

}