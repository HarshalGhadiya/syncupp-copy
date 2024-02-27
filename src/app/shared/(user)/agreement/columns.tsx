'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { ActionIcon, Button, Popover, Switch, Title, Tooltip } from 'rizzui';
import EyeIcon from '@/components/icons/eye';
import moment from 'moment';
import { clientAgreementchangeStatus, getAllclientagreement } from '@/redux/slices/user/client/agreement/clientAgreementSlice';
import { PiTrashFill } from 'react-icons/pi';
import TrashIcon from '@/components/icons/trash';
import { MdOutlineDone } from 'react-icons/md';


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


export const AgreementColumns = ({
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
    const paginationParams = useSelector((state: any) => state?.root?.clienAgreement?.paginationParams);
    const clientSliceData = useSelector((state: any) => state?.root?.client);


    const handleSwitchChange = (id: any) => {
        let { page, items_per_page, sort_field, sort_order, search } = paginationParams;


        dispatch(clientAgreementchangeStatus({ id: id, status: "agreed" })).then((result: any) => {
            if (clientAgreementchangeStatus.fulfilled.match(result)) {
                // console.log('resultt', result)
                if (result && result.payload.success === true) {
                    dispatch(getAllclientagreement({ page, items_per_page, sort_field, sort_order, search, agency_id: clientSliceData?.agencyId }));
                }
            }
        })
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
            width: 100,
            render: (value: string) => (
                <Text className="font-medium text-gray-700 capitalize">{value && value != "" ? value : "-"}</Text>
            ),
        },
        {
            title: (
                <HeaderCell
                    title="Duedate"
                    sortable
                    ascending={
                        sortConfig?.direction === 'asc' && sortConfig?.key === 'due_date'
                    }
                />
            ),
            onHeaderCell: () => onHeaderCellClick('due_date'),
            dataIndex: 'due_date',
            key: 'due_date',
            width: 100,
            render: (value: string) => (
                <Text className="font-medium text-gray-700">{value && value != "" ? moment(value).format("Do MMM. ‘YY") : "-"}</Text>
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
            width: 100,
            render: (value: string) => (
                <Text className="font-medium text-gray-700">{value && value != "" ? value === "sent" ? "Pending" : "Agreed" : "-"}</Text>
            ),
        },

        {
            title: (
                <HeaderCell
                    title="Actions"
                    sortable
                    ascending={
                        sortConfig?.direction === 'asc' && sortConfig?.key === 'status'
                    }
                />
            ),
            onHeaderCell: () => onHeaderCellClick('status'),
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (value: string, row: Record<string, string>) => (

                <div className="flex items-center justify-start gap-3 pe-4">
                    {!(row?.status === "agreed") && <Popover
                        placement="left"
                        className="z-50"
                        content={({ setOpen }) => {
                            return (
                                <div className="w-56 pb-2 pt-1 text-left rtl:text-right">
                                    <Title
                                        as="h6"
                                        className="mb-0.5 flex items-start text-sm text-gray-700 sm:items-center"
                                    >
                                        <PiTrashFill className="me-1 h-[17px] w-[17px]" /> Accept Agreement
                                    </Title>
                                    <Text className="mb-2 leading-relaxed text-gray-500">
                                        Are you sure you want to accept?
                                    </Text>
                                    <div className="flex items-center justify-end">
                                        <Button size="sm" className="me-1.5 h-7" onClick={() => {
                                            setOpen(false)
                                            handleSwitchChange(row._id)
                                        }}>
                                            Yes
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-7"
                                            onClick={() => setOpen(false)}
                                        >
                                            No
                                        </Button>
                                    </div>
                                </div>
                            )
                        }}
                    >
                        <Button disabled={row?.status === "agreed"} size="sm" className='bg-black text-white' aria-label={'Approve Team member'}>
                            Accept
                        </Button>

                    </Popover>}
                    <Tooltip
                        size="sm"
                        content={() => 'View Agreement'}
                        placement="top"
                        color="invert"
                    >
                        <Link href={`/client/agreement/${row?._id}`}>
                            <Button size="sm" variant="outline" className='bg-white text-black' aria-label={'View Agreement'}>
                                <EyeIcon className="h-4 w-4" />
                            </Button>
                        </Link>
                    </Tooltip>
                </div>


            ),
        },


        // {
        //     // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
        //     title: <HeaderCell title="Actions" className="opacity-0" />,
        //     dataIndex: 'action',
        //     key: 'action',
        //     width: 100,
        //     render: (_: string, row: Record<string, string>) => (
        //         <div className="flex items-center justify-end gap-3 pe-4">
        //             <Tooltip
        //                 size="sm"
        //                 content={() => 'View Agreement'}
        //                 placement="top"
        //                 color="invert"
        //             >
        //                 <Link href={`/client/agreement/${row?._id}`}>
        //                     <Button size="sm" variant="outline" className='bg-white text-black' aria-label={'View Agreement'}>
        //                         <EyeIcon className="h-4 w-4" />
        //                     </Button>
        //                 </Link>
        //             </Tooltip>
        //         </div>
        //     ),
        // },
    ];
}
