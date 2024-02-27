'use client';

import { HeaderCell } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';
import { useDispatch , useSelector } from 'react-redux';
import moment from 'moment';
import { getAllAgencyagreement, updateagreementStatus } from '@/redux/slices/user/agreement/agreementSlice';

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


export const PaymentTransactionColumns = ({
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

    const dispatch = useDispatch();
    const { agreementDetails, loading } = useSelector((state: any) => state?.root?.agreement);


    const StatusHandler = (status: string, id: string, setOpen: any) => {
        setOpen(false)
        // dispatch(updateagreementStatus({ data: { status: status }, id: id })).then((result: any) => {
        //     if (updateagreementStatus.fulfilled.match(result)) {
        //         // console.log('resultt', result)
        //         if (result && result.payload.success === true) {
        //             dispatch(getAllAgencyagreement({ page: currentPage, items_per_page: pageSize, sort_field: sortConfig?.key, sort_order: sortConfig?.direction }));
        //         }
        //     }
        // })
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
                <Text className="font-medium text-gray-700 capitalize">{value && value != "" ? value : "-"}</Text>
            ),
        },
        {
            title: (
                <HeaderCell
                    title="Date"
                    sortable
                    ascending={
                        sortConfig?.direction === 'asc' && sortConfig?.key === 'date'
                    }
                />
            ),
            onHeaderCell: () => onHeaderCellClick('date'),
            dataIndex: 'date',
            key: 'date',
            width: 200,
            render: (value: string) => (
                <Text className="font-medium text-gray-700">{value && value != "" ? moment(value).format('MM/DD/YYYY') : "-"}</Text>
            ),
        },
        {
            title: (
                <HeaderCell
                    title="Form of payment"
                    sortable
                    ascending={
                        sortConfig?.direction === 'asc' && sortConfig?.key === 'form_of_payment'
                    }
                />
            ),
            onHeaderCell: () => onHeaderCellClick('form_of_payment'),
            dataIndex: 'form_of_payment',
            key: 'form_of_payment',
            width: 200,
            render: (value: string) => (
                <Text className="font-medium text-gray-700">{value && value != "" ? value : "-"}</Text>
            ),
        },
        {
            title: (
                <HeaderCell
                    title="Subscription plan"
                    sortable
                    ascending={
                        sortConfig?.direction === 'asc' && sortConfig?.key === 'subscription_plan'
                    }
                />
            ),
            onHeaderCell: () => onHeaderCellClick('subscription_plan'),
            dataIndex: 'subscription_plan',
            key: 'subscription_plan',
            width: 200,
            render: (value: string) => (
                <Text className="font-medium text-gray-700">{value && value != "" ? value : "-"}</Text>
            ),
        },
        {
            title: (
                <HeaderCell
                    title="Transection ID"
                    sortable
                    ascending={
                        sortConfig?.direction === 'asc' && sortConfig?.key === 'transaction_id'
                    }
                />
            ),
            onHeaderCell: () => onHeaderCellClick('transaction_id'),
            dataIndex: 'transaction_id',
            key: 'transaction_id',
            width: 200,
            render: (value: string) => (
                <Text className="font-medium text-gray-700">{value && value != "" ? value : "-"}</Text>
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
            render: (value: string) => (
                <Text className="font-medium text-gray-700">{value && value != "" ? value : "-"}</Text>
            ),
        },

    ];
}
