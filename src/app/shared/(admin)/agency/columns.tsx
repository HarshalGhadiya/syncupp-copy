'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';
import DeletePopover from '@/app/shared/delete-popover';
import { Badge, Button, Switch, Tooltip } from 'rizzui';
import { useDispatch } from 'react-redux';
import { deleteAgency, getAgencyDetails, getAllAgency } from '@/redux/slices/admin/agency/agencySlice';
import { LuExternalLink } from "react-icons/lu";
import { routes } from '@/config/routes';
import EyeIcon from '@/components/icons/eye';

type Columns = {
    data: any[];
    sortConfig?: any;
    handleSelectAll: any;
    checkedItems: string[];
    onDeleteItem: (id: string | string[], currentPage?: any, countPerPage?: number, Islastitem?: boolean, sortConfig?: Record<string, string>, searchTerm?: string) => void;
    onHeaderCellClick: (value: string) => void;
    onChecked?: (id: string) => void;
    currentPage?: number;
    pageSize?: number;
    searchTerm?: string;
};

export const GetColumns = ({
    data,
    sortConfig,
    checkedItems,
    onDeleteItem,
    onHeaderCellClick,
    handleSelectAll,
    onChecked,
    currentPage,
    pageSize,
    searchTerm
}: Columns) => {
    const dispatch = useDispatch();
    const handleSwitchChange = async (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const res = await dispatch(deleteAgency({ agencies: id, status: event?.target?.checked ? "active" : "inactive" }));
            if (res.payload.success === true) {
                const reponse = await dispatch(getAllAgency({ page: currentPage, items_per_page: pageSize, sort_field: sortConfig?.key, sort_order: sortConfig?.direction }));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const GetAgencyDetails = async(id: any , ref_id:any) =>{
      try{
        const res = await dispatch(getAgencyDetails({_id : id , reference_id:ref_id?._id}));
      }catch(error){
        console.log(error)
      }
    }


    function getStatusBadge(status: string) {
        switch (status?.toLowerCase()) {
            case 'payment_pending':
                return (
                    <div className="flex items-center px-5">
                        <Badge color="warning" renderAsDot />
                        <Text className="ms-2 font-medium text-orange-dark">Payment Pending</Text>
                    </div>
                );
            case 'confirmed':
                return (
                    <div className="flex items-center px-5">
                        <Badge color="success" renderAsDot />
                        <Text className="ms-2 font-medium text-green-dark">Active</Text>
                    </div>
                );
            case 'agency_inactive':
                return (
                    <div className="flex items-center px-5">
                        <Badge color="danger" renderAsDot />
                        <Text className="ms-2 font-medium text-red">Inactive</Text>
                    </div>
                );
            default:
                return (
                    <div className="flex items-center px-5">
                        <Badge renderAsDot className="bg-gray-400" />
                        <Text className="ms-2 font-medium text-gray-600">{status}</Text>
                    </div>
                );
        }
    }

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
              checked={checkedItems.includes(row._id)}
              {...(onChecked && { onChange: () => onChecked(row._id) })}
            />
          </div>
        ),
      },
      {
        title: (
          <HeaderCell
            title="First Name"
            sortable
            ascending={
              sortConfig?.direction === 'asc' &&
              sortConfig?.key === 'first_name'
            }
          />
        ),
        onHeaderCell: () => onHeaderCellClick('first_name'),
        dataIndex: 'first_name',
        key: 'first_name',
        width: 200,
        render: (value: string) => (
          <Text className="font-medium capitalize text-gray-700">
            {value && value != '' ? value : '-'}
          </Text>
        ),
      },
      {
        title: (
          <HeaderCell
            title="Last Name"
            sortable
            ascending={
              sortConfig?.direction === 'asc' && sortConfig?.key === 'last_name'
            }
          />
        ),
        onHeaderCell: () => onHeaderCellClick('last_name'),
        dataIndex: 'last_name',
        key: 'last_name',
        width: 200,
        render: (value: string) => (
          <Text className="font-medium capitalize text-gray-700">
            {value && value != '' ? value : '-'}
          </Text>
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
          <Text className="font-medium text-gray-700">
            {value && value != '' ? value : '-'}
          </Text>
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
        render: (value: string) => {
          return (
            <Text className="font-medium text-gray-700">
              {value && value != '' ? value : '-'}
            </Text>
          );
        },
      },
      {
        title: (
          <HeaderCell
            title="Company"
            sortable
            ascending={
              sortConfig?.direction === 'asc' &&
              sortConfig?.key === 'company_name'
            }
          />
        ),
        onHeaderCell: () => onHeaderCellClick('company_name'),
        dataIndex: 'reference_id',
        key: 'reference_id',
        width: 200,
        render: (value: Record<string, string>) => (
          <Text className="font-medium text-gray-700">
            {value?.company_name && value?.company_name != ''
              ? value?.company_name
              : '-'}
          </Text>
        ),
      },
      {
        title: (
          <HeaderCell
            title="Website"
            sortable
            ascending={
              sortConfig?.direction === 'asc' &&
              sortConfig?.key === 'company_website'
            }
          />
        ),
        onHeaderCell: () => onHeaderCellClick('company_website'),
        dataIndex: 'reference_id',
        key: 'reference_id',
        width: 200,
        render: (value: Record<string, string>) => (
          <>
            {value?.company_website && value?.company_website != '' ? (
              <Link
                href={value?.company_website}
                target="_blank"
                className="font-medium text-gray-700"
              >
                <LuExternalLink size={25} />
              </Link>
            ) : (
              <Text className="font-medium text-gray-700">-</Text>
            )}
          </>
        ),
      },
      {
        title: (
          <HeaderCell
            title="Industry"
            sortable
            ascending={
              sortConfig?.direction === 'asc' && sortConfig?.key === 'industry'
            }
          />
        ),
        onHeaderCell: () => onHeaderCellClick('industry'),
        dataIndex: 'reference_id',
        key: 'reference_id',
        width: 200,
        render: (value: Record<string, string>) => (
          <Text className="font-medium text-gray-700">
            {value?.industry && value?.industry != '' ? value?.industry : '-'}
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
        render: (value: string, row: Record<string, string>) => (
          <>
            <div className="flex ">
              {/* <Text className="font-medium text-gray-700">{value}</Text> */}
              <Switch
                className="[&>label>span.transition]:shrink-0 [&>label>span]:font-medium"
                variant="active"
                onChange={(event) => handleSwitchChange(row._id, event)}
                disabled={value == 'payment_pending'}
                defaultChecked={value == 'confirmed' ? true : false}
              />
              {getStatusBadge(value)}
            </div>
          </>
        ),
      },
      {
        title: (
          <HeaderCell
            title="# Of employees"
            sortable
            ascending={
              sortConfig?.direction === 'asc' &&
              sortConfig?.key === 'no_of_people'
            }
          />
        ),
        onHeaderCell: () => onHeaderCellClick('no_of_people'),
        dataIndex: 'reference_id',
        key: 'reference_id',
        width: 200,
        render: (value: Record<string, string>) => (
          <Text className="font-medium text-gray-700">
            {value?.no_of_people && value?.no_of_people != ''
              ? value?.no_of_people
              : '-'}
          </Text>
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
            <Tooltip
              size="sm"
              content={() => 'View Agency'}
              placement="top"
              color="invert"
            >
              <Link href={routes.admin.agencyView}>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white text-black"
                  aria-label={'View Member'}
                  onClick={() =>  GetAgencyDetails(row?._id , row?.reference_id) }
                >
                  <EyeIcon className="h-4 w-4" />
                </Button>
              </Link>
            </Tooltip>
            <DeletePopover
              title={`Delete the agency`}
              description={`Are you sure you want to delete?`}
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
}
