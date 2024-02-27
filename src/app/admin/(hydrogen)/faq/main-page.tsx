"use client";

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '@/components/common-tables/table';
import { getColumns } from '@/app/shared/(admin)/faq/faq-list/columns';
import { deleteFaqData, getAllFaq } from '@/redux/slices/admin/faq/faqSlice';
import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';
import AddFaqForm from '@/app/shared/(admin)/faq/create-edit/add-edit-faq-form';
import { PiPlusBold } from 'react-icons/pi';


const pageHeader = {
  title: 'FAQ',
};

export default function FaqPage() {

    const dispatch = useDispatch();
    const adminFaqData = useSelector((state: any) => state?.root?.adminFaq);
    const [pageSize, setPageSize] = useState(5)

    const handleChangePage = async (paginationParams: any) => {
        let { page, items_per_page, sort_field, sort_order, search } = paginationParams;
        const response = await dispatch(getAllFaq({ page, items_per_page, sort_field, sort_order, search }));
        const { data } = response?.payload;
        const maxPage: number = data?.page_count;

        if (page > maxPage) {
            page = maxPage > 0 ? maxPage : 1;
            await dispatch(getAllFaq({ page, items_per_page, sort_field, sort_order, search }));
            return data.faqs
        }
        return data.faqs
    };

    const handleDeleteById = async (_id: string | string[], currentPage?: any, countPerPage?: number) => {
        try {
            const res = await dispatch(deleteFaqData({ faqIdsToDelete: _id, is_deleted: true }));
            if (res.payload.success === true) {
              const reponse = await dispatch(getAllFaq({ page: currentPage, items_per_page: countPerPage, sort_field: 'title', sort_order: 'description' }));
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
      <>
        <PageHeader title={pageHeader.title}>
          <div className="mt-4 flex items-center gap-3 @lg:mt-0">
            <ModalButton
              label="Add FAQ"
              view={<AddFaqForm title="FAQ" />}
              customSize="800px"
              className="mt-0 w-full bg-[#53216F] hover:bg-[#8e45b8] @lg:w-auto dark:bg-gray-100 dark:text-white dark:hover:bg-gray-200 dark:active:bg-gray-100"
              icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
            />
          </div>
        </PageHeader>
        <CustomTable
          data={adminFaqData?.data?.faqs}
          total={adminFaqData?.data?.pagination?.total_pages}
          loading={adminFaqData?.loading}
          pageSize={pageSize}
          setPageSize={setPageSize}
          handleDeleteById={handleDeleteById}
          handleChangePage={handleChangePage}
          getColumns={getColumns}
        />
      </>
    );

}
