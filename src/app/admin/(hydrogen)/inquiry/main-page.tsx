"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import CustomTable from '@/components/common-tables/table';

import PageHeader from '@/app/shared/page-header';
import { Button } from 'rizzui';
import { InquiryColumns } from '@/app/shared/(admin)/inquiry/columns';
import { deleteInquiry, getAllinquiry } from '@/redux/slices/admin/inquiry/inquirySlice';


const DummyData = [{
    name: "Inquiry Name",
    email: "test@yopmail.com",
    mobile_number: "1234-567890",
    message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date_and_time: "12/12/2023"
}]

const pageHeader = {
    title: 'Inquiry',
};


export default function AdmininquirylistPage() {

    const dispatch = useDispatch();
    const router = useRouter();

    const { inquirylistDetails, loading } = useSelector((state: any) => state?.root?.inquiry);
    // console.log(inquirylistDetails, 'inquirylistDetails')


    const [pageSize, setPageSize] = useState(5)

    //Paggination Handler
    const handleChangePage = async (paginationParams: any) => {
        let { page, items_per_page, sort_field, sort_order, search } = paginationParams;
        const response = await dispatch(getAllinquiry({ page, items_per_page, sort_field, sort_order, search }));
        const { data } = response?.payload;
        const maxPage: number = data?.page_count;

        if (page > maxPage) {
            page = maxPage > 0 ? maxPage : 1;
            await dispatch(getAllinquiry({ page, items_per_page, sort_field, sort_order, search }));
            return data?.client
        }
        return data?.client
    };

    // Delete Handler
    const handleDeleteById = async (id: string | string[], currentPage?: any, countPerPage?: number) => {
        try {
            const res = await dispatch(deleteInquiry({ inquiryIdsToDelete: id }));
            if (res.payload.success === true) {
                const reponse = await dispatch(getAllinquiry({ page: currentPage, items_per_page: countPerPage, sort_field: 'createdAt', sort_order: 'desc' }));
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {/* <h1>Aggrement</h1> */}
            <PageHeader title={pageHeader.title} />
            <CustomTable
                data={inquirylistDetails?.data?.inquiries || []}
                total={inquirylistDetails?.data?.page_count || 1}
                loading={loading}
                pageSize={pageSize}
                setPageSize={setPageSize}
                handleDeleteById={handleDeleteById}
                handleChangePage={handleChangePage}
                getColumns={InquiryColumns}
            />
        </>
    )

}