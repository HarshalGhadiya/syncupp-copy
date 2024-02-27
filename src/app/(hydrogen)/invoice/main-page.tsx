'use client';

import PageHeader from '@/app/shared/page-header';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import CustomTable from '@/components/common-tables/table';
import { InvoiceColumns } from '@/app/shared/(user)/invoice/invoice-list/column';
import { Button } from 'rizzui';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { PiPlusBold } from 'react-icons/pi';
import { DeleteInvoice, getAllInvoiceDataTable, setPagginationParams } from '@/redux/slices/user/invoice/invoiceSlice';
import { usePathname, useRouter } from 'next/navigation';

const pageHeader = {
  title: 'Invoice',
};

export default function InvoiceDataTablePage(props: any) {

  const { clientSliceData } = props


  const dispatch = useDispatch();
  const router = useRouter()
  const pathname = usePathname().startsWith('/client/details/')

  const [pageSize, setPageSize] = useState(5);

  const invoiceData = useSelector((state: any) => state?.root?.invoice);

  const handleChangePage = async (paginationParams: any) => {
    let { page, items_per_page, sort_field, sort_order, search } = paginationParams;
    await dispatch(setPagginationParams(paginationParams))
    const response = await dispatch(getAllInvoiceDataTable({ page, items_per_page, sort_field, sort_order, search, client_id: pathname ? clientSliceData?.reference_id : null }));
    const { data } = response?.payload;
    const maxPage: number = data?.page_count;

    if (page > maxPage) {
      page = maxPage > 0 ? maxPage : 1;
      await dispatch(getAllInvoiceDataTable({ page, items_per_page, sort_field, sort_order, search, client_id: pathname ? clientSliceData?.reference_id : null }));
      return data?.invoiceList;
    }
    if (data && data?.invoiceList && data?.invoiceList.length !== 0) {
      return data?.invoiceList
    }
  };

  const handleDeleteById = async (id: string | string[], currentPage?: any, countPerPage?: number, sortConfig?: Record<string, string>, searchTerm?: string) => {
    try {
      const res = await dispatch(DeleteInvoice({ invoiceIdsToDelete: id }));
      if (res.payload.success === true) {
        const reponse = await dispatch(getAllInvoiceDataTable({ page: currentPage, items_per_page: countPerPage, sort_field: sortConfig?.key, sort_order: sortConfig?.direction, search: searchTerm, client_id: pathname ? clientSliceData?.reference_id : null }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PageHeader title={!pathname ? pageHeader.title : ""}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {/* <Link href={routes.invoiceForm} className='w-full'> */}
          <Button
            onClick={() => { pathname ? router.push(`${routes.invoiceForm}?reference=${clientSliceData?.reference_id}`) : router.push(routes.invoiceForm) }}
            className="mt-5 w-full bg-[#53216F] hover:bg-[#8e45b8] text-xs @lg:w-auto sm:text-sm lg:mt-0"
          >
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Invoice</Button>
          {/* </Link> */}
        </div>
      </PageHeader>
      <CustomTable
        data={invoiceData && invoiceData?.data?.invoiceList}
        total={invoiceData && invoiceData?.data?.page_count}
        loading={invoiceData && invoiceData?.loading}
        pageSize={pageSize}
        setPageSize={setPageSize}
        handleDeleteById={handleDeleteById}
        handleChangePage={handleChangePage}
        getColumns={InvoiceColumns}
      />
    </>
  );
}
