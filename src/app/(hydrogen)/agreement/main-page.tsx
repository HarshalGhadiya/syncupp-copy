"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import CustomTable from '@/components/common-tables/table';
import { AgreementColumns } from '@/app/shared/agreement/columns';
import { deleteAgencyAgreement, getAllAgencyagreement } from '@/redux/slices/user/agreement/agreementSlice';
import PageHeader from '@/app/shared/page-header';
import { Button } from 'rizzui';
import Jsondata from '@/locales/en/translation.json'
import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';


const pageHeader = {
    title: Jsondata.agency?.agreement?.table?.title,
};


export default function AgreementPage(props: any) {

    const { clientSliceData } = props

    // console.log(Jsondata.agency?.agreement?.table?.title)

    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname().startsWith('/client/details/')
    // const searchParams = useSearchParams();
    // const reference_id = searchParams.get("reference");
    // console.log(clientSliceData, 'clientSliceData', pathname, 'pathname')


    const { agreementDetails, loading } = useSelector((state: any) => state?.root?.agreement);

    const [pageSize, setPageSize] = useState(5)

    //Paggination Handler
    const handleChangePage = async (paginationParams: any) => {
        let { page, items_per_page, sort_field, sort_order, search } = paginationParams;
        const response = await dispatch(getAllAgencyagreement({ page, items_per_page, sort_field, sort_order, search, client_id: pathname ? clientSliceData?.reference_id : null }));
        const { data } = response?.payload;
        const maxPage: number = data?.page_count;
        // console.log(maxPage, 'maxPage')

        if (page > maxPage) {
            page = maxPage > 0 ? maxPage : 1;
            await dispatch(getAllAgencyagreement({ page, items_per_page, sort_field, sort_order, search, client_id: pathname ? clientSliceData?.reference_id : null }));
            return data?.client
        }
        return data?.client
    };

    // Delete Handler
    const handleDeleteById = async (id: string | string[], currentPage?: any, countPerPage?: number) => {
        try {
            const res = await dispatch(deleteAgencyAgreement({ agreementIdsToDelete: id }));
            if (res.payload.success === true) {
                const reponse = await dispatch(getAllAgencyagreement({ page: currentPage, items_per_page: countPerPage, sort_field: 'createdAt', sort_order: 'desc', client_id: pathname ? clientSliceData?.reference_id : null }));
            }
        } catch (error) {
            console.error(error);
        }
    };

    // console.log(agreementDetails, 'agreementDetails') 

    return (
        <>
            {/* <h1>Aggrement</h1> */}
            <PageHeader title={!pathname ? pageHeader.title : ""}>
                {/* <div className="mt-4 flex items-center gap-3 @lg:mt-0">
                    <Button type='button' onClick={() => { pathname ? router.push(`${routes.createAgreement}?reference=${clientSliceData?.reference_id}`) : router.push(routes.createAgreement) }} className='mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0'><PiPlusBold className="me-1.5 h-[17px] w-[17px]" />Add Agreement</Button>
                </div> */}
                <div className="mt-4 flex items-center gap-3 @lg:mt-0">
                    <Button type='button' onClick={() => { pathname ? router.push(`${routes.createAgreement}?reference=${clientSliceData?.reference_id}`) : router.push(routes.createAgreement) }} className='mt-5 w-full bg-[#53216F] hover:bg-[#8e45b8]" text-xs @lg:w-auto sm:text-sm lg:mt-0'><PiPlusBold className="me-1.5 h-[17px] w-[17px]" />Add Agreement</Button>
                </div>
            </PageHeader>

            <CustomTable
                data={agreementDetails?.data?.agreements || []}
                total={agreementDetails?.data?.page_count || 1}
                loading={loading}
                pageSize={pageSize}
                setPageSize={setPageSize}
                handleDeleteById={handleDeleteById}
                handleChangePage={handleChangePage}
                getColumns={AgreementColumns}
            />
        </>
    )

}