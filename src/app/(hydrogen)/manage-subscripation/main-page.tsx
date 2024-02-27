'use client';
import PageHeader from '@/app/shared/page-header';
import cn from '@/utils/class-names';
import React, { useEffect, useState } from 'react';
import { Text, Title } from '@/components/ui/text';
import CustomTable from '@/components/common-tables/table';
import { billingColumns } from '@/app/shared/(user)/manage-subscription/billingcoloum';
import { getColumns } from '@/app/shared/(user)/manage-subscription/manageseatscoloums';
import { useDispatch, useSelector } from 'react-redux';
import {
  CancleSubscription,
  RemoveUsersub,
  getAllBilling,
  getAllSeats,
  getAllcarddata,
} from '@/redux/slices/user/manage-subscription.tsx/SubscriptionSlice';
import DeleteModel from './CustomPoup';
import { useModal } from '@/app/shared/modal-views/use-modal';
import moment from 'moment';
import { PiCurrencyCircleDollar } from 'react-icons/pi';
import RefundIcon from '@/components/icons/refund';
import UsersColorIcon from '@/components/icons/users-color';

const generateDummyData = (count: any) => {
  const dummyData = [];

  for (let i = 1; i <= count; i++) {
    dummyData.push({
      seat_No: `Seat ${i}`,
      Allocated_To: `User ${i}`,
      user_type: Math.random() > 0.5 ? 'Admin' : 'User',
      status: Math.random() > 0.5 ? 'Active' : 'Inactive',
      _id: i, // Assuming this is a unique identifier for each row
    });
  }

  return dummyData;
};

// Usage example
const dummyDataCount = 10; // You can adjust this based on the number of rows you want
const dummyData = generateDummyData(dummyDataCount);

function SubcripationPage() {
  const { BillinglistDetails, SeatsData, CardData, loading } = useSelector(
    (state: any) => state?.root?.managesubcription
  );
  const disptach = useDispatch();
  const { closeModal, openModal } = useModal();

  const [pageSize, setPageSize] = useState<number>(5);
  const handleChangePage = async (paginationParams: any) => {
    let { page, items_per_page, sort_field, sort_order, search } =
      paginationParams;

    const response = await disptach(
      getAllBilling({
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
      await disptach(
        getAllBilling({
          page,
          items_per_page,
          sort_field,
          sort_order,
          search,
          pagination: true,
        })
      );
      return data?.payment_history;
    }
    if (data && data?.payment_history && data?.payment_history?.length !== 0) {
      return data?.payment_history;
    }
  };

  const handleChangePageSheet = async (paginationParams: any) => {
    let { page, items_per_page, sort_field, sort_order, search } =
      paginationParams;

    const response = await disptach(
      getAllSeats({
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
      await disptach(
        getAllSeats({
          page,
          items_per_page,
          sort_field,
          sort_order,
          search,
          pagination: true,
        })
      );
      return data?.sheets;
    }
    if (data && data?.sheets && data?.sheets?.length !== 0) {
      return data?.sheets;
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
      let res: any;
      if (id === 'subscription') {
        res = await disptach(CancleSubscription());
        if (res.payload.success === true) {
          disptach(getAllcarddata());
        }
      } else {
        res = await disptach(
          RemoveUsersub({ user_id: id, force_fully_remove: false })
        );
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
      }
      if (res.payload.success === true) {
        // closeModal();
        const reponse = await disptach(
          getAllSeats({
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

  useEffect(() => {
    disptach(getAllBilling({ pagination: false }));
    disptach(getAllSeats({ pagination: false }));
    disptach(getAllcarddata());
  }, [disptach]);

  return (
    <>
      <PageHeader title="Manage Subscription"></PageHeader>
      <div className="grid grid-cols-3 gap-5 @xl:grid-cols-3 @6xl:grid-cols-3 3xl:gap-8">
        <div className="max-w-[505px] rounded-lg border border-l-4 border-primary bg-primary-lighter/10 p-7">
          <div className="mb-4 flex items-center gap-5">
            <span
              style={{ backgroundColor: '#0070F3' }}
              className={cn(
                'flex rounded-[14px] p-2.5 text-gray-0 dark:text-gray-900'
              )}
            >
              <PiCurrencyCircleDollar className="h-auto w-[30px]" />
            </span>
            <div className="space-y-2">
              <Title
                as="h3"
                className="mb-3 text-xl font-semibold text-gray-900"
              >
                Next Billing
              </Title>
              {/* <p className="text-2xl font-medium text-gray-900 @[19rem]:text-3xl font-lexend"> */}
              <p className="font-lexend text-lg font-semibold text-gray-900 dark:text-gray-700 2xl:text-[20px] 3xl:text-[22px]">
                $ {CardData?.data?.next_billing_price}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="truncate leading-none text-gray-500">
              Billing Date :-{' '}
              {moment
                .unix(CardData?.data?.next_billing_date)
                .format("DD MMM, YYYY")}
            </span>
          </div>
        </div>

        <div className="max-w-[505px] rounded-lg border border-l-4 border-primary bg-primary-lighter/10 p-7">
          <div className="mb-4 flex items-center gap-5">
            <span
              style={{ backgroundColor: '#00CEC9' }}
              className={cn(
                'flex rounded-[14px] p-2.5 text-gray-0 dark:text-gray-900'
              )}
            >
              <UsersColorIcon className="h-auto w-[30px]" />
            </span>
            <div className="space-y-2">
              <Title
                as="h3"
                className="mb-3 text-xl font-semibold text-gray-900"
              >
                Available Seats
              </Title>
              {/* <p className="text-2xl font-medium text-gray-900 @[19rem]:text-3xl font-lexend"> */}
              <p className="font-lexend text-lg font-semibold text-gray-900 dark:text-gray-700 2xl:text-[20px] 3xl:text-[22px]">
                {CardData?.data?.available_sheets}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-[505px] rounded-lg border border-l-4 border-primary bg-primary-lighter/10 p-7">
          <div className="mb-4 flex items-center gap-5">
            <span
              style={{ backgroundColor: '#F5A623' }}
              className={cn(
                'flex rounded-[14px] p-2.5 text-gray-0 dark:text-gray-900'
              )}
            >
              <RefundIcon className="h-auto w-[30px]" />
            </span>
            <div className="space-y-2">
              <Title
                as="h3"
                className="mb-3 text-xl font-semibold text-gray-900"
              >
                Referral Points
              </Title>
              <div className="flex items-center gap-4">
                <p className="text-gray-500 ">Available points</p>
                <p className="font-lexend text-lg font-semibold text-gray-900 dark:text-gray-700 2xl:text-[20px] 3xl:text-[22px]">
                  {CardData?.data?.referral_points?.available_points}{' '}
                </p>
              </div>
              <div className="flex items-center gap-5">
                <p className="text-gray-500 ">Earned points </p>
                <p className="font-lexend text-lg font-semibold text-gray-900 dark:text-gray-700 2xl:text-[20px] 3xl:text-[22px]">
                  {CardData?.data?.referral_points?.erned_points}{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Title className="mb-4">Billing History</Title>
        <CustomTable
          // data={dummyDataBilling}
          data={BillinglistDetails?.data?.payment_history || []}
          total={BillinglistDetails?.data?.page_count}
          loading={loading}
          pageSize={pageSize}
          setPageSize={setPageSize}
          handleChangePage={handleChangePage}
          getColumns={billingColumns}
        />
      </div>
      <div className="mt-4">
        <Title className="mb-4">Manage Seats</Title>
        <CustomTable
          // data={dummyData}
          data={SeatsData?.data?.sheets || []}
          total={SeatsData?.data?.page_count}
          loading={loading}
          pageSize={pageSize}
          setPageSize={setPageSize}
          handleDeleteById={handleDeleteById}
          // handeldeltesub={handleDeleteSub}
          handleChangePage={handleChangePageSheet}
          getColumns={getColumns}
        />
      </div>
    </>
  );
}

export default SubcripationPage;
