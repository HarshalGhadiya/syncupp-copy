'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { Tooltip } from '@/components/ui/tooltip';
import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '@/app/shared/delete-popover';
//import AddClientForm from '../create-edit/add-client-form';
import { Badge, Button } from 'rizzui';
import { routes } from '@/config/routes';
import jsonData from '../../../../locales/en/translation.json';
import CustomeDeletePopover from './customeDelete';

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

export const getColumns = ({
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
}: Columns) => [
  {
    title: (
      <HeaderCell
        title="Seat No"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'seat_no'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('seat_no'),
    dataIndex: 'seat_no',
    key: 'seat_no',
    width: 100,
    render: (value: string, row: any, index: number) => {
      // const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      return (
        <Text className="font-medium capitalize text-gray-700">{value}</Text>
      );
    },
  },
  {
    title: (
      <HeaderCell
        title="Allocated To"
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
      <>
        <Text className="font-medium capitalize text-gray-700">
          {value || '-'}
        </Text>
      </>
    ),
  },
  {
    title: (
      <HeaderCell
        title="User Type"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'role'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('role'),
    dataIndex: 'role',
    key: 'role',
    width: 200,
    render: (value: string) => (
      <Text className="font-medium  capitalize text-gray-700">
        {value === 'team_agency'
          ? 'Team Agency'
          : value === 'team_client'
            ? 'Team Client'
            : value || '-'}
      </Text>
    ),
  },
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
    width: 200,
    render: (value: string) => {
      return (
        <Text className="font-medium  capitalize text-gray-700">{value}</Text>
      );
    },
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 120,
    render: (value: string, row: Record<string, string>, index: number) => {
      const isStatusPresent: any = 'status' in row;
      if (row.seat_no == '1') {
      } else {
        if (row.status == 'Allocated') {
          return (
            <div className="flex items-center justify-end gap-3 pe-4">
              <CustomeDeletePopover
                title="Remove the User"
                description={'Are you sure you want to remove the User?'}
                onDelete={() =>
                  onDeleteItem(
                    row.user_id,
                    currentPage,
                    pageSize,
                    data?.length <= 1 ? true : false,
                    sortConfig,
                    searchTerm
                  )
                }
                text="Remove User"
              />
            </div>
          );
        } else {
          return (
            <div className="flex items-center justify-end gap-3 pe-4">
              <CustomeDeletePopover
                title="Cancel Subscription"
                description={'Are you sure you want to cancel the Subscription?'}
                onDelete={() =>
                  onDeleteItem(
                    'subscription',
                    currentPage,
                    pageSize,
                    data?.length <= 1 ? true : false,
                    sortConfig,
                    searchTerm
                  )
                }
                text="Cancel Subscription"
              />
            </div>
          );
        }
      }
    },
  },
];
