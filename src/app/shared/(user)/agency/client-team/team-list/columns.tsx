'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip } from '@/components/ui/tooltip';
import { routes } from '@/config/routes';
import { Badge, Button } from 'rizzui';
import moment from 'moment';
import { MdOutlineDone } from 'react-icons/md';
import { PiXBold } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
  clientteamStatuschange,
  getAllTeamMember,
  refferalPayment,
  refferalPaymentStatistics,
  setUserReferenceId,
} from '@/redux/slices/user/team-member/teamSlice';
import { initiateRazorpay } from '@/services/clientpaymentService';
import { useState } from 'react';
import DeletePopover from '@/app/shared/delete-popover';
import EyeIcon from '@/components/icons/eye';
import { useModal } from '@/app/shared/modal-views/use-modal';

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (
    id: string | string[],
    currentPage?: any,
    countPerPage?: number,
    Islastitem?: boolean,
    sortConfig?: Record<string, string>,
    searchTerm?: string
  ) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  currentPage?: number;
  pageSize?: number;
  searchTerm?: string;
};

function getStatusBadge(status: string) {
  switch (status?.toLowerCase()) {
    case 'requested':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">Requested</Text>
        </div>
      );
    case 'confirmed':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">Active</Text>
        </div>
      );
    case 'rejected':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red">Rejected</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}

function getRoleName(role: string) {
  switch (role?.toLowerCase()) {
    case 'team_member':
      return <Text className="font-medium text-gray-700">Team member</Text>;
    case 'admin':
      return <Text className="font-medium text-gray-700">Admin</Text>;
    default:
      return <Text className="font-medium text-gray-700">-</Text>;
  }
}

export const GetclientteamColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
  currentPage,
  pageSize,
  searchTerm,
}: Columns) => {
  const token = localStorage.getItem('token');
  const router = useRouter();
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const clientSliceData = useSelector((state: any) => state?.root?.client);
  const loading = useSelector((state: any) => state?.root?.client?.loading);

  const [loadingflag, setloadingflag] = useState(false);

  const ClintteamlistAPIcall = async () => {
    dispatch(
      getAllTeamMember({
        page: currentPage,
        items_per_page: pageSize,
        sort_field: sortConfig?.key,
        sort_order: sortConfig?.direction,
        search: searchTerm,
        client_id: clientSliceData?.clientId,
        pagination: true,
        client_team: true,
      })
    );
  };

  const handlePaymentApi = (row: any) => {

    console.log("row in agency team column...", row)
    setloadingflag(true);
    dispatch(setUserReferenceId({ data: { reference_id: row?.reference_id?._id } }));


    dispatch(refferalPaymentStatistics()).then((result: any) => {
      if (refferalPaymentStatistics.fulfilled.match(result)) {
        if (result && result.payload.success === true) {

          if (result?.payload?.data?.available_sheets > 0) {
            // console.log(142, userReferenceId)
            dispatch(refferalPayment({ user_id: row?.reference_id?._id, without_referral: true })).then((result: any) => {
              if (refferalPayment.fulfilled.match(result)) {
                if (result && result.payload.success === true) {
                  ClintteamlistAPIcall(); // api call for listing
                  setloadingflag(false)
                } else {
                  setloadingflag(false)
                }
              }
            });

          } else if (result?.payload?.data?.redirect_payment_page) {
            console.log(146)

            router.push(routes?.client_teams?.payment)

          } else if (!result?.payload?.data?.redirect_payment_page) {
            console.log(151)

            initiateRazorpay(
              router,
              routes.client_team,
              token,
              row?.reference_id?._id,
              ClintteamlistAPIcall,
              setloadingflag, 
              closeModal
            );
            
          }
        } else {
          setloadingflag(false)
        }
      } 
    });

  }

  const StatusHandler = (row: any) => {
    // console.log(row, 'row')
    dispatch(clientteamStatuschange({ id: row?.reference_id?._id })).then(
      (result: any) => {
        if (
          clientteamStatuschange.fulfilled.match(result) &&
          result.payload.success === true
        ) {
          dispatch(
            getAllTeamMember({
              page: currentPage,
              items_per_page: pageSize,
              sort_field: sortConfig?.key,
              sort_order: sortConfig?.direction,
              search: searchTerm,
              client_id: clientSliceData?.clientId,
              pagination: true,
            })
          );
        }
      }
    );
  };

  return [
    {
      title: (
        <div className="ps-3.5">
          <Checkbox
            title={'Select All'}
            onChange={handleSelectAll}
            checked={checkedItems.length === data.length}
            className="cursor-pointer"
          />
        </div>
      ),
      dataIndex: 'checked',
      key: 'checked',
      width: 50,
      render: (_: any, row: any) => (
        <div className="inline-flex ps-3.5">
          <Checkbox
            className="cursor-pointer"
            checked={checkedItems.includes(row?.reference_id._id)}
            {...(onChecked && {
              onChange: () => onChecked(row?.reference_id._id),
            })}
          />
        </div>
      ),
    },
    {
      title: (
        <HeaderCell
          title="Name"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'name'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('name'),
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (value: string) => (
        <Text className="font-medium capitalize text-gray-700">{value}</Text>
      ),
    },
    {
      title: (
        <HeaderCell
          title="Mobile Number"
          sortable
          ascending={
            sortConfig?.direction === 'asc' &&
            sortConfig?.key === 'contact_number'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('contact_number'),
      dataIndex: 'contact_number',
      key: 'contact_number',
      width: 200,
      render: (value: string) => (
        <>
          {value && value != '' ? (
            <Text className="font-medium text-gray-700">{value}</Text>
          ) : (
            <Text className="font-medium text-gray-700">-</Text>
          )}
        </>
      ),
    },
    {
      title: (
        <HeaderCell
          title="Email ID"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'email'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('email'),
      dataIndex: 'email',
      key: 'email',
      width: 200,
      render: (_: any, row: any) => (
        <Text className="font-medium text-gray-700">{row.email}</Text>
      ),
    },
    // {
    //   title: (
    //     <HeaderCell
    //       title="Permission"
    //       sortable
    //       ascending={
    //         sortConfig?.direction === 'asc' && sortConfig?.key === 'reference_id.role.name'
    //       }
    //     />),
    //   onHeaderCell: () => onHeaderCellClick('reference_id.role.name'),
    //   dataIndex: 'reference_id',
    //   key: 'reference_id',
    //   width: 200,
    //   render: (value: Record<string, any>) => getRoleName(value?.role?.name),
    // },
    {
      title: (
        <HeaderCell
          title="Status"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'status'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('status'),
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (value: string) => getStatusBadge(value),
    },
    {
      title: (
        <HeaderCell
          title="Created"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'createdAt'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('createdAt'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: (value: string) => {
        const date = moment(value).fromNow();
        return <Text className="font-medium text-gray-700">{date}</Text>;
      },
    },
    {
      // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
      title: <HeaderCell title="Actions" className="opacity-0" />,
      dataIndex: 'action',
      key: 'action',
      width: 80,
      render: (_: string, row: any) =>
        row?.status === 'requested' ? (
          <div className="flex items-center justify-end gap-3 pe-4">
            <Tooltip
              size="sm"
              content={() => 'View Team member'}
              placement="top"
              color="invert"
            >
              <Link href={routes?.client_teams?.details(row?._id)}>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white text-black"
                  aria-label={'View Member'}
                >
                  <EyeIcon className="h-4 w-4" />
                </Button>
              </Link>
            </Tooltip>
            <Tooltip
              size="sm"
              content={() => 'Approve'}
              placement="top"
              color="invert"
            >
              <Button
                disabled={loadingflag}
                onClick={() => handlePaymentApi(row)}
                size="sm"
                variant="outline"
                className="bg-white text-black"
                aria-label={'Approve Team member'}
              >
                <MdOutlineDone className="h-4 w-4" />
              </Button>
            </Tooltip>
            <Tooltip
              size="sm"
              content={() => 'Reject'}
              placement="top"
              color="invert"
            >
              <Button
                disabled={loading}
                onClick={() => {
                  StatusHandler(row);
                }}
                size="sm"
                variant="outline"
                className="bg-white text-black"
                aria-label={'Reject Team member'}
              >
                <PiXBold className="h-4 w-4" />
              </Button>
            </Tooltip>
            <DeletePopover
              title={`Delete the Team member`}
              description={`Are you sure you want to delete?`}
              onDelete={() =>
                onDeleteItem(
                  row.reference_id._id,
                  currentPage,
                  pageSize,
                  data?.length <= 1 ? true : false,
                  sortConfig,
                  searchTerm
                )
              }
            />
          </div>
        ) : (
          <div className="flex items-center justify-end gap-3 pe-4">
            <Tooltip
              size="sm"
              content={() => 'View Team member'}
              placement="top"
              color="invert"
            >
              <Link href={routes?.client_teams?.details(row?._id)}>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white text-black"
                  aria-label={'View Member'}
                >
                  <EyeIcon className="h-4 w-4" />
                </Button>
              </Link>
            </Tooltip>
          </div>
        ),
    },
  ];
};
