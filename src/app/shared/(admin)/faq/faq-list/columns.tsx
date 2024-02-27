'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '@/app/shared/delete-popover';
import CustomModalButton from '@/app/shared/custom-modal-button';
import AddFaqForm from '../create-edit/add-edit-faq-form';

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

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
        title="Title"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'title'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('title'),
    dataIndex: 'title',
    key: 'title',
    width: 200,
    render: (value: string) => (
      <Text className="font-medium text-gray-700 capitalize">{value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Description"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'description'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('description'),
    dataIndex: 'description',
    key: 'description',
    width: 200,
    render: (value: string) => (
      <Text className="font-medium text-gray-700 capitalize">{value}</Text>
    ),
  },

  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 120,
    render: (_: string, row: Record<string, string>) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <CustomModalButton 
          title="Edit FAQ"
          icon={<PencilIcon className="h-4 w-4" />}
          view={<AddFaqForm title="Edit FAQ" row={row} /> }
          customSize="800px"
        />
        <DeletePopover
          title={`Delete the FAQ`}
          description={`Are you sure you want to delete?`}
          onDelete={() => onDeleteItem(row._id)}
        />
      </div>
    ),
  },
];
