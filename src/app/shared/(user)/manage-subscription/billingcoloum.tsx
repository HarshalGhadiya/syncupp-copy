'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { Tooltip } from '@/components/ui/tooltip';
import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '@/app/shared/delete-popover';
//import AddClientForm from '../create-edit/add-client-form';
import { Badge, Button } from 'rizzui';
import moment from 'moment';

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

function getPaymentModeName(value: string) {
  switch (value?.toLowerCase()) {
    case 'payment':
      return (
        <div className="flex items-center">
          <Text className="font-medium text-gray-700">Payment</Text>
        </div>
      );
    case 'referral':
      return (
        <div className="flex items-center">
          <Text className="font-medium text-gray-700">Referral</Text>
        </div>
      );
  }
}


export const billingColumns = ({
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
          title="No#"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'brand'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('No'),
      dataIndex: 'No',
      key: 'No',
      width: 100,
      render: (_: string, row: any, index: number) => {
        // const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
        return (
          <Text className="font-medium capitalize text-gray-700">
            {index + 1}
          </Text>
        );
      },
    },
    {
      title: (
        <HeaderCell
          title="Payment Mode"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'payment_mode'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('payment_mode'),
      dataIndex: 'payment_mode',
      key: 'payment_mode',
      width: 200,
      render: (value: string) => getPaymentModeName(value),
    },
    {
      title: (
        <HeaderCell
          title="Billing Amount"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'amount'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('amount'),
      dataIndex: 'amount',
      key: 'amount',
      width: 200,
      render: (value: string, row: any) => {
        if(row?.payment_mode === 'payment') {
          return (
            <>
              <Text className="font-medium capitalize text-gray-700">
                $ {parseFloat(value) / 100}
              </Text>
            </>
          )
        } else if(row?.payment_mode === 'referral') {
          return (
            <>
              <Text className="font-medium capitalize text-gray-700">
                {value}
              </Text>
            </>
          )
        }
        
      }
    },
    {
      title: (
        <HeaderCell
          title="Date"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'createdAt'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('createdAt'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      render: (value: string) => (
        <Text className="font-medium  text-gray-700">
          {moment(value).format("DD MMM, YYYY")}
        </Text>
      ),
    },
    {
      title: (
        <HeaderCell
          title="Seats Counts"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'seats_counts'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('seats_counts'),
      dataIndex: 'seats_counts',
      key: 'seats_counts',
      width: 200,
      render: (value: string) => {
        return (
          <Text className="font-medium  capitalize text-gray-700">
            {!value ? 1 : value}
          </Text>
        );
      },
    },
  ];
