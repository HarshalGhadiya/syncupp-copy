'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { ActionIcon, Button, Popover, Tooltip } from 'rizzui';
import EyeIcon from '@/components/icons/eye';

import moment from 'moment';
import { routes } from '@/config/routes';



type Columns = {
    data: any[];
    sortConfig?: any;
    handleSelectAll: any;
    handlecustomeSelectAll: any;
    checkedItems: string[];
    onDeleteItem: (id: string | string[], currentPage?: any, countPerPage?: number, Islastitem?: boolean, sortConfig?: Record<string, string>, searchTerm?: string) => void;
    onHeaderCellClick: (value: string) => void;
    onChecked?: (id: string) => void;
    currentPage?: number;
    pageSize?: number;
    searchTerm?: string;
};


export const ClientInvoiceColumns = ({
    data,
    sortConfig,
    checkedItems,
    onDeleteItem,
    onHeaderCellClick,
    handleSelectAll,
    handlecustomeSelectAll,
    onChecked,
    currentPage,
    pageSize,
    searchTerm,
}: Columns) => {

    const dispatch = useDispatch();
    const { invoiceDetails, loading } = useSelector((state: any) => state?.root?.clieninvoice);



    return [
        {
            title: (
                <div className="ps-3.5">
                    <Checkbox
                        title={'Select All'}
                        onChange={handlecustomeSelectAll}
                        checked={checkedItems.length === data.length}
                        className="cursor-pointer"

                    />
                </div>
            ),
            dataIndex: 'checked',
            key: 'checked',
            width: 50,
            render: (_: any, row: any) => (
                < div className="inline-flex ps-3.5" >
                    {<Checkbox
                        className="cursor-pointer"
                        checked={checkedItems.includes(row._id)}
                        {...(onChecked && { onChange: () => onChecked(row._id) })}
                    />}
                </div >
            ),
        },
        {
            title: (
                <HeaderCell
                    title="Number"
                    sortable
                    ascending={
                        sortConfig?.direction === 'asc' && sortConfig?.key === 'invoice_number'
                    }
                />
            ),
            onHeaderCell: () => onHeaderCellClick('invoice_number'),
            dataIndex: 'invoice_number',
            key: 'invoice_number',
            width: 50,
            render: (value: string) => (
                <Text className="font-medium text-gray-700 capitalize">{value && value != "" ? value : "-"}</Text>
            ),
        },
        {
            title: (
                <HeaderCell
                    title="Amount"
                    sortable
                    ascending={
                        sortConfig?.direction === 'asc' && sortConfig?.key === 'total'
                    }
                />
            ),
            onHeaderCell: () => onHeaderCellClick('total'),
            dataIndex: 'total',
            key: 'total',
            width: 50,
            render: (value: string) => (
                <Text className="font-medium text-gray-700">{value && value != "" ? "$ " + value : "-"}</Text>
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
            width: 50,
            render: (value: string) => (
                <Text className="font-medium text-gray-700">{value && value != "" ? moment(value).format("Do MMM. ‘YY") : "-"}</Text>
            ),
        },
        {
            title: (
                <HeaderCell
                    title="Due Date"
                    sortable
                    ascending={
                        sortConfig?.direction === 'asc' && sortConfig?.key === 'due_date'
                    }
                />
            ),
            onHeaderCell: () => onHeaderCellClick('due_date'),
            dataIndex: 'due_date',
            key: 'due_date',
            width: 50,
            render: (value: string) => (
                <Text className="font-medium text-gray-700">{value && value != "" ? moment(value).format("Do MMM. ‘YY") : "-"}</Text>
            ),
        },
        {
            // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
            title: <HeaderCell title="Actions" className="opacity-0" />,
            dataIndex: 'action',
            key: 'action',
            width: 10,
            render: (_: string, row: Record<string, string>) => (
                <div >
                    <Tooltip
                        size="sm"
                        content={() => 'View Invoice'}
                        placement="top"
                        color="invert"
                    >
                        <Link href={routes.clients.invoicedetails(row?._id)}>
                            <Button type='button' size="sm" variant="outline" className='bg-white text-black' aria-label={'View Agreement'}>
                                <EyeIcon className="h-4 w-4" />
                            </Button>
                        </Link>
                    </Tooltip>
                </div>
            ),
        },
    ];
}
