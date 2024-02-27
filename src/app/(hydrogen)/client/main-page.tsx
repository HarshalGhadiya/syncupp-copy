'use client';
// import Link from 'next/link';
import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';
import AddClientForm from '@/app/shared/(user)/agency/client/create-edit/add-client-form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteClient,
  getAllClient,
  setPagginationParams,
} from '@/redux/slices/user/client/clientSlice';
import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { GetColumns } from '@/app/shared/(user)/agency/client/client-list/columns';
import CustomTable from '@/components/common-tables/table';
import { PiPlusBold } from 'react-icons/pi';
import DeleteModel from './confirmationpouclient';

const pageHeader = {
  title: 'Client',
};

export default function ClientPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { closeModal, openModal } = useModal();

  const clientSliceData = useSelector((state: any) => state?.root?.client);

  const [pageSize, setPageSize] = useState<number>(5);

  // useEffect(() => {
  //   dispatch(getAllClient({pagination: false}))
  // }, [dispatch]);

  const handleChangePage = async (paginationParams: any) => {
    let { page, items_per_page, sort_field, sort_order, search } =
      paginationParams;

    await dispatch(setPagginationParams(paginationParams));

    const response = await dispatch(
      getAllClient({
        page,
        items_per_page,
        sort_field,
        sort_order,
        search,
        pagination: true,
      })
    );
    const { data } = response?.payload;
    const maxPage: number = data?.page_count;

    if (page > maxPage) {
      page = maxPage > 0 ? maxPage : 1;
      await dispatch(
        getAllClient({
          page,
          items_per_page,
          sort_field,
          sort_order,
          search,
          pagination: true,
        })
      );
      return data?.clients;
    }
    if (data && data?.clients && data?.clients?.length !== 0) {
      return data?.clients;
    }
  };

  const handleDeleteById = async (
    id: string | string[],
    currentPage?: any,
    countPerPage?: number,
    sortConfig?: Record<string, string>,
    searchTerm?: string
  ) => {
    try {
      const res = await dispatch(
        deleteClient({ client_ids: id, force_fully_remove: false })
      );
      if (res.payload.success === true) {
        closeModal();
        if (res?.payload?.data?.force_fully_remove === true) {
          openModal({
            view: (
              <DeleteModel
                forsfully={res?.payload?.data?.force_fully_remove}
                id={id}
                page={currentPage}
                items_per_page={countPerPage}
                sort_field={sortConfig?.key}
                sort_order={sortConfig?.direction}
                search={searchTerm}
                pagination={true}
              />
            ),
            customSize: '500px',
          });
        }

        const reponse = await dispatch(
          getAllClient({
            page: currentPage,
            items_per_page: countPerPage,
            sort_field: sortConfig?.key,
            sort_order: sortConfig?.direction,
            search: searchTerm,
            pagination: true,
          })
        );
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
            label="Add Client"
            view={<AddClientForm title="New Client" />}
            customSize="800px"
            className="mt-0 w-full bg-[#53216F] hover:bg-[#8e45b8] @lg:w-auto dark:bg-gray-100 dark:text-white dark:hover:bg-gray-200 dark:active:bg-gray-100"
            icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>
      <CustomTable
        data={clientSliceData?.data?.clients}
        total={clientSliceData?.data?.page_count}
        loading={clientSliceData?.loading}
        pageSize={pageSize}
        setPageSize={setPageSize}
        handleDeleteById={handleDeleteById}
        handleChangePage={handleChangePage}
        getColumns={GetColumns}
      />
    </>
  );
}
