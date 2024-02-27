'use client';

import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import { Badge } from '@/components/ui/badge';
import { Title, Text } from '@/components/ui/text';
import Table from '@/components/ui/table';
import { siteConfig } from '@/config/site.config';
import { InvoiceFormInput } from '@/utils/validators/create-invoice.schema';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getInvoiceDataByID, postDownloadInvoice } from '@/redux/slices/user/invoice/invoiceSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from 'rizzui';
import { FaArrowLeft } from 'react-icons/fa';
import { routes } from '@/config/routes';
import { getSingleClientinvoice } from '@/redux/slices/user/client/invoice/clientinvoiceSlice';
import Spinner from '@/components/ui/spinner';
import { IoMdDownload } from "react-icons/io";

export default function InvoiceDetails({ params }: { params: { id: string } }) {
    const { singleInvoicedetails, loading } = useSelector((state: any) => state?.root?.clieninvoice);
    const IncoiceLoader = useSelector((state: any) => state?.root?.invoice)?.loading
    // console.log(singleInvoicedetails, 'singleInvoicedetails')

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(getSingleClientinvoice(params?.id));
    }, [params?.id]);

    const data = singleInvoicedetails.data?.[0];

    const columns = [
        {
            title: 'item',
            key: 'item',
            width: 250,
            render: (product: any) => (
                <>
                    <Title as="h6" className="mb-0.5 text-sm font-medium">
                        {product?.item && product?.item != '' ? product?.item : "-"}
                    </Title>
                </>
            ),
        },
        {
            title: 'Quentity',
            key: 'qty',
            width: 250,
            render: (product: any) => (
                <>
                    <Title as="h6" className="mb-0.5 text-sm font-medium">
                        {product?.qty && product?.qty != '' ? product?.qty : "-"}
                    </Title>
                </>
            ),
        },
        {
            title: 'Rate',
            key: 'rate',
            width: 250,
            render: (product: any) => (
                <>
                    <Title as="h6" className="mb-0.5 text-sm font-medium">
                        {product?.rate && product?.rate != '' ? product?.rate : "-"}
                    </Title>
                </>
            ),
        },
        {
            title: 'Taxes',
            key: 'tax',
            width: 250,
            render: (product: any) => (
                <>
                    <Title as="h6" className="mb-0.5 text-sm font-medium">
                        {product?.tax && product?.tax != '' ? product?.tax : "-"}
                    </Title>
                </>
            ),
        },
        {
            title: 'Amount',
            key: 'amount',
            width: 250,
            render: (product: any) => (
                <>
                    <Title as="h6" className="mb-0.5 text-sm font-medium">
                        {product?.amount && product?.amount != '' ? product?.amount : "-"}
                    </Title>
                </>
            ),
        },
        {
            title: 'Description',
            key: 'description',
            width: 250,
            render: (product: any) => (
                <>
                    <Title as="h6" className="mb-0.5 text-sm font-medium">
                        {product?.description && product?.description != '' ? product?.description : "-"}
                    </Title>
                </>
            ),
        },
    ];

    function InvoiceDetailsListTable() {
        return (
            <Table
                data={data?.invoice_content}
                columns={columns}
                variant="minimal"
                rowKey={(record) => record.id}
                scroll={{ x: 660 }}
                className="mb-11"
            />
        );
    }

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const DownloadInvoice = () => {
        dispatch(postDownloadInvoice({ invoice_id: params?.id })).then(
            (result: any) => {
                if (postDownloadInvoice.fulfilled.match(result)) {
                    // console.log('resultt', result)
                    if (result && result.payload.success === true) { }
                }
            }
        );
    };

    return (
        <>
            {loading ? <div className='p-10 flex items-center justify-center'>
                <Spinner size="xl" tag='div' className='ms-3' />
            </div> :
                <>

                    <Link href={routes.clients.invoice} className="w-full">
                        <Button disabled={IncoiceLoader} onClick={DownloadInvoice} className="float-end ms-1 mb-3 mt-5 bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0">
                            <IoMdDownload className=" h-[17px] w-[17px]" />
                        </Button>
                        <Button className="float-end mb-3 mt-5 bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0">
                            <FaArrowLeft className="me-1.5 h-[17px] w-[17px]" />
                            Back
                        </Button>
                    </Link>


                    <div className="w-full rounded-xl border border-gray-200 p-5 text-sm sm:p-6 lg:p-8 2xl:p-10">

                        <div className="mb-12 flex flex-col-reverse items-start justify-between md:mb-16 md:flex-row">

                            <Image
                                src={siteConfig.logo}
                                alt={siteConfig.title}
                                height={30}
                                width={30}
                                className="dark:invert"
                                priority
                            />

                            <div className="mb-4 md:mb-0 capitalize">

                                <Badge
                                    variant="flat"
                                    color={
                                        data?.status === 'draft'
                                            ? 'primary'
                                            : data?.status === 'paid'
                                                ? 'success'
                                                : data?.status === 'unpaid'
                                                    ? 'warning'
                                                    : data?.status === 'overdue'
                                                        ? 'danger'
                                                        : 'primary'
                                    }
                                    rounded="md"
                                    className="mb-3 md:mb-2"
                                >
                                    {data?.status}
                                </Badge>
                                <Title as="h6">{data?.invoice_number}</Title>
                                <Text className="mt-0.5 text-gray-500">Invoice Number</Text>
                            </div>
                        </div>

                        <div className="mb-12 grid gap-4 xs:grid-cols-2 sm:grid-cols-3 sm:grid-rows-1">
                            <div className="">
                                <Title as="h6" className="mb-3.5 font-semibold">
                                    From
                                </Title>
                                <Text className="mb-1.5 text-sm font-semibold uppercase">
                                    {data?.from?.agency_full_name && data?.from?.agency_full_name != '' && data?.from?.agency_full_name}
                                </Text>
                                <Text className="mb-1.5"> {data?.from?.company_name && data?.from?.company_name != '' && data?.from?.company_name} </Text>
                                <Text className="mb-1.5">
                                    {data?.from?.address && data?.from?.address != '' && data?.from?.address + ","} <br /> {data?.from?.city?.name && data?.from?.city?.name != '' && data?.from?.city?.name + ","}
                                    {data?.from?.state?.name && data?.from?.state?.name != '' && data?.from?.state?.name + ","} {data?.from?.country?.name && data?.from?.country?.name != '' && data?.from?.country?.name + ","}
                                </Text>
                                <Text className="mb-4 sm:mb-6 md:mb-8">{data?.from?.pincode && data?.from?.pincode != '' && data?.from?.pincode}</Text>
                                <div>
                                    <Text className="mb-2 text-sm font-semibold">Creation Date</Text>
                                    <Text>{data?.createdAt ? formatDate(data?.createdAt) : '-'}</Text>
                                </div>
                            </div>
                            <div className="mt-4 xs:mt-0">
                                <Title as="h6" className="mb-3.5 font-semibold">
                                    Bill To
                                </Title>
                                <Text className="mb-1.5 text-sm font-semibold uppercase">
                                    {data?.to?.first_name && data?.to?.first_name != '' && data?.to?.first_name + " "}  {data?.to?.last_name && data?.to?.last_name != '' && data?.to?.last_name}
                                </Text>
                                <Text className="mb-1.5">{data?.to?.company_name && data?.to?.company_name != '' && data?.to?.company_name}</Text>
                                <Text className="mb-1.5">
                                    {data?.to?.address && data?.to?.address != '' && data?.to?.address + ","} <br /> {data?.to?.city?.name && data?.to?.city?.name != '' && data?.to?.city?.name + ","}
                                    {data?.to?.state?.name && data?.to?.state?.name != '' && data?.to?.state?.name + ","} {data?.to?.country?.name && data?.to?.country?.name != '' && data?.to?.country?.name + ","}
                                </Text>
                                <Text className="mb-4 sm:mb-6 md:mb-8">{data?.to?.pincode && data?.to?.pincode != '' && data?.to?.pincode}</Text>
                                <div>
                                    <Text className="mb-2 text-sm font-semibold">Due Date</Text>
                                    <Text>{data?.due_date ? formatDate(data?.due_date) : '-'}</Text>
                                </div>
                            </div>
                        </div>

                        <InvoiceDetailsListTable />

                        <div className="flex flex-col-reverse items-start justify-between border-t border-gray-200 pb-4 pt-8 xs:flex-row">
                            <div className="mt-6 max-w-md pe-4 xs:mt-0"></div>
                            <div className=" w-full max-w-sm">
                                <Text className="flex items-center justify-between pt-4 text-base font-semibold text-gray-900 lg:pt-5">
                                    Total: <Text as="span">${data?.total && data?.total != '' ? data?.total : 0}</Text>
                                </Text>
                            </div>
                        </div>
                    </div>
                </>}
        </>
    );
}
