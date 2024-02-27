'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '@/app/shared/delete-popover';
import CustomModalButton from '@/app/shared/custom-modal-button';
import { Badge } from 'rizzui';
// import AddFaqForm from '../create-edit/add-edit-faq-form';

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

function getStatusBadge(status: string) {
    switch (status.toLowerCase()) {
      case 'Draft':
        return (
          <div className="flex items-center">
            <Badge renderAsDot />
            <Text className="ms-2 font-medium text-dark">{status}</Text>
          </div>
        );
      case 'Paid':
        return (
          <div className="flex items-center">
            <Badge color="success" renderAsDot />
            <Text className="ms-2 font-medium text-green-dark">{status}</Text>
          </div>
        );
      case 'Unpaid':
        return (
          <div className="flex items-center">
            <Badge color="warning" renderAsDot />
            <Text className="ms-2 font-medium text-yellow-dark">{status}</Text>
          </div>
        );
      case 'Overdue':
        return (
          <div className="flex items-center">
            <Badge color="danger" renderAsDot />
            <Text className="ms-2 font-medium text-red-dark">{status}</Text>
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

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) => [
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
          checked={checkedItems.includes(row._id)}
          {...(onChecked && { onChange: () => onChecked(row._id) })}
        />
      </div>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Number"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'number'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('number'),
    dataIndex: 'number',
    key: 'number',
    width: 200,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Customer"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'customer'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('customer'),
    dataIndex: 'customer',
    key: 'customer',
    width: 200,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Amount"
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
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Invoice Date"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'invoice_date'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('invoice_date'),
    dataIndex: 'invoice_date',
    key: 'invoice_date',
    width: 200,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Due date"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'due_date'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('due_date'),
    dataIndex: 'due_date',
    key: 'due_date',
    width: 200,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
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
    />),
    onHeaderCell: () => onHeaderCellClick('status'),
    dataIndex: 'status',
    key: 'status',
    width: 200,
    render: (value: string) => getStatusBadge(value),
    // render: (_: any, row: any) => (
    //   <Text className="font-medium text-gray-700">{row.status}</Text>
    // ),
  },

  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 120,
    render: (_: string, row: Record<string, string>) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        {/* <CustomModalButton 
          title="Edit FAQ"
          icon={<PencilIcon className="h-4 w-4" />}
          view={<AddFaqForm title="Edit FAQ" row={row} /> }
          customSize="800px"
        /> */}
        <DeletePopover
          title={`Delete the FAQ`}
          description={`Are you sure you want to delete?`}
          onDelete={() => onDeleteItem(row._id)}
        />
      </div>
    ),
  },
];
