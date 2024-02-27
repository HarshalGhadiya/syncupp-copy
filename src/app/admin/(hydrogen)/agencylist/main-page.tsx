"use client";
import PageHeader from '@/app/shared/page-header';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '@/app/shared/modal-views/use-modal';
import AgencyTable from '@/app/shared/(admin)/agency/table';
import { deleteAgency, getAllAgency } from '@/redux/slices/admin/agency/agencySlice';
import { useState } from 'react';

const pageHeader = {
    title: 'Agency list',
};

export default function ClientPage() {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [currentPagee, setCurrentPagee] = useState(1);
    const { agencylistDetails, loading } = useSelector((state: any) => state?.root?.adminAgency);
    // useEffect(() => {
    //     dispatch(getAllAgency({ page: 1, items_per_page: 5, sort_order: 'desc', sort_field: 'createdAt', search: undefined }))
    // }, [dispatch])

    const handleChangePage = async (paginationParams: any) => {
        let { page, items_per_page, sort_field, sort_order, search } = paginationParams;
        setCurrentPagee(page);
        const response = await dispatch(getAllAgency({ page, items_per_page, sort_field, sort_order, search }));
        const { data } = response?.payload;
        const maxPage: number = data?.page_count;

        if (page > maxPage) {
            page = maxPage > 0 ? maxPage : 1;
            await dispatch(getAllAgency({ page, items_per_page, sort_field, sort_order, search }));
            return data?.client
        }
        return data?.client
    };

    const handleDeleteById = async (id: string | string[], currentPage?: any, countPerPage?: number, sortConfig?: Record<string, string>, searchTerm?: string) => {
        try {
            const res = await dispatch(deleteAgency({ agencies: id, delete: true }));
            if (res.payload.success === true) {
                closeModal();
                const reponse = await dispatch(getAllAgency({ page: currentPage, items_per_page: countPerPage, sort_field: sortConfig?.key, sort_order: sortConfig?.direction, search: searchTerm }));
            }
        } catch (error) {
            console.error(error);
        }
    };




    return (
        <>
            <PageHeader title={pageHeader.title}>
            </PageHeader>
            <AgencyTable total={agencylistDetails?.data?.page_count} loading={loading} page={currentPagee} handleDeleteById={handleDeleteById} handleChangePage={handleChangePage} data={agencylistDetails?.data?.agencyList} />
        </>
    );
}
