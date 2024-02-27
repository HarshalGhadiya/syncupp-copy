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
    case 'pending':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">Pending</Text>
        </div>
      );
    case 'active':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">Active</Text>
        </div>
      );
    case 'inactive':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">Inactive</Text>
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
  currentPage,
  pageSize,
  searchTerm,
}: Columns) => [
  {
    title: (
      <HeaderCell
        title={jsonData?.admin?.coupon_management?.form?.brandNameLabel}
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'brand'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('brand'),
    dataIndex: 'brand',
    key: 'brand',
    width: 200,
    render: (value: string, row: any) => {
      // const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      return (
        <Text className="font-medium capitalize text-gray-700">{value}</Text>
      );
    },
  },
  {
    title: (
      <HeaderCell
        title={jsonData?.admin?.coupon_management?.form?.brandLogoLabel}
      />
    ),
    dataIndex: 'brandLogo',
    key: 'brandLogo',
    width: 200,
    render: (value: string) => (
      <>
        {value && value != '' ? (
          <img
            src={`${process.env.NEXT_PUBLIC_API}/${value}`}
            style={{ width: '53.33px', height: '30px' }}
          ></img>
        ) : (
          <Text className="font-medium text-gray-700">-</Text>
        )}
      </>
    ),
  },
  {
    title: (
      <HeaderCell
        title={jsonData?.admin?.coupon_management?.form?.couponCodeLabel}
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'couponCode'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('couponCode'),
    dataIndex: 'couponCode',
    key: 'couponCode',
    width: 200,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title={jsonData?.admin?.coupon_management?.form?.discountTitleLabel}
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'discountTitle'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('discountTitle'),
    dataIndex: 'discountTitle',
    key: 'discountTitle',
    width: 200,
    render: (value: string) => {
      return (
        <Text className="font-medium  capitalize text-gray-700">{value}</Text>
      );
    },
  },
  {
    title: (
      <HeaderCell
        title={jsonData?.admin?.coupon_management?.form?.websiteUrlLabel}
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'siteURL'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('siteURL'),
    dataIndex: 'siteURL',
    key: 'siteURL',
    width: 200,
    render: (value: string) => {
      return <Text className="font-medium text-gray-700">{value}</Text>;
    },
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 120,
    render: (_: string, row: Record<string, string>) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={() => 'Edit'}
          placement="top"
          color="invert"
        >
          <Link href={`${routes.admin.UpdateCouponManagement}/${row._id}`}>
            <Button
              size="sm"
              variant="outline"
              className="bg-white text-black"
              aria-label={'View Member'}
            >
              <PencilIcon className="h-4 w-4" />
            </Button>
          </Link>
        </Tooltip>
        <DeletePopover
          title={jsonData?.admin?.coupon_management?.table?.del_popup?.title}
          description={
            jsonData?.admin?.coupon_management?.table?.del_popup?.des
          }
          onDelete={() =>
            onDeleteItem(
              row._id,
              currentPage,
              pageSize,
              data?.length <= 1 ? true : false,
              sortConfig,
              searchTerm
            )
          }
        />
      </div>
    ),
  },
];
