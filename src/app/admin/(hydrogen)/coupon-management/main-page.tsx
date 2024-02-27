'use client';
// import Link from 'next/link';
import PageHeader from '@/app/shared/page-header';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { getColumns } from '@/app/shared/(admin)/coupen-managaement/columns';
import CustomTable from '@/components/common-tables/table';
import { PiPlusBold } from 'react-icons/pi';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import jsonData from '../../../../locales/en/translation.json';
import {
  DeleteCoupon,
  getAllCoupone,
} from '@/redux/slices/admin/coupon-managemnt/couponManagementSlice';

const pageHeader = {
  title: jsonData?.admin?.coupon_management?.table.title,
};

export default function CouponManagementPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { closeModal } = useModal();

  const clientSliceData = useSelector((state: any) => state?.root?.client);

  const { CouponlistDetails, loading } = useSelector(
    (state: any) => state?.root?.adminCoupon
  );

  const [pageSize, setPageSize] = useState<number>(5);

  useEffect(() => {
    dispatch(getAllCoupone({ pagination: false }));
  }, [dispatch]);

  const handleChangePage = async (paginationParams: any) => {
    let { page, items_per_page, sort_field, sort_order, search } =
      paginationParams;

    const response = await dispatch(
      getAllCoupone({
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
        getAllCoupone({
          page,
          items_per_page,
          sort_field,
          sort_order,
          search,
          pagination: true,
        })
      );
      return data?.coupon;
    }
    if (data && data?.coupon && data?.coupon?.length !== 0) {
      return data?.coupon;
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
      const res = await dispatch(DeleteCoupon({ couponIdsToDelete: id }));
      if (res.payload.success === true) {
        closeModal();
        const reponse = await dispatch(
          getAllCoupone({
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
          <Link href={routes.admin.createCouponManagement}>
            <Button className="hover:gray-700 ms-3 @xl:w-auto dark:bg-gray-200 dark:text-white">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              {jsonData?.admin?.coupon_management?.table.add_button}
            </Button>
          </Link>
        </div>
      </PageHeader>
      <CustomTable
        data={CouponlistDetails?.data?.coupon || []}
        total={CouponlistDetails?.data?.page_count}
        loading={loading}
        pageSize={pageSize}
        setPageSize={setPageSize}
        handleDeleteById={handleDeleteById}
        handleChangePage={handleChangePage}
        getColumns={getColumns}
      />
    </>
  );
}
