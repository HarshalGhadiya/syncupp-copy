'use client'
import { routes } from '@/config/routes';
import { getSingleagreement } from '@/redux/slices/user/agreement/agreementSlice';
import moment from 'moment';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'rizzui';

export default function AgreementDetailsPage({ params }: { params: { id: string } }) {

    const router = useRouter()
    const dispatch = useDispatch()

    const { singleAgreementdetails, loading } = useSelector((state: any) => state?.root?.agreement);
    // console.log(singleAgreementdetails, 'singleAgreementdetails')



    useEffect(() => {
        dispatch(getSingleagreement(params?.id))
    }, [params?.id, dispatch])

    return (
        <>
            <div className="mt-90 flex justify-end space-x-4">
                <Link href={routes.agreement} >
                    <Button
                        type="button"
                        // onClick={() => { router.push(`/agreement`) }}
                        className="bg-none mb-5 text-xs sm:text-sm"
                    >
                        <FaArrowLeft className="me-1.5 h-[17px] w-[17px]" />
                        Back
                    </Button>
                </Link>

            </div>
            <h3 className='flex justify-between items-center border-2 rounded border-solid border-gray-300 bg-gray-100 p-3'>
                <span>{singleAgreementdetails?.data?.title}</span>
                <span>{singleAgreementdetails?.data?.due_date && singleAgreementdetails?.data?.due_date != "" ? "Due Date : " + moment(singleAgreementdetails?.data?.due_date).format("Do MMM. ‘YY") : ""}</span>
            </h3>
            <div className='mt-5' dangerouslySetInnerHTML={{ __html: singleAgreementdetails?.data?.agreement_content }} />
            <div className='flex justify-between mt-5 font-medium text-gray-700 dark:text-gray-600 mb-1.5'>
                <ul>
                    <li>{singleAgreementdetails?.data?.sender_first_name && singleAgreementdetails?.data?.sender_first_name != "" ? singleAgreementdetails?.data?.sender_first_name : "[Sender Name]"}</li>
                    <li>{singleAgreementdetails?.data?.sender_email && singleAgreementdetails?.data?.sender_email != "" ? singleAgreementdetails?.data?.sender_email : "[Sender Email]"}</li>
                    <li>{singleAgreementdetails?.data?.sender_number && singleAgreementdetails?.data?.sender_number != "" ? singleAgreementdetails?.data?.sender_number : "[Sender Phone]"}</li>
                </ul>
                <ul>
                    <li>{singleAgreementdetails?.data?.receiver && singleAgreementdetails?.data?.receiver != "" ? singleAgreementdetails?.data?.receiver : "[Receiver Name]"}</li>
                    <li>{singleAgreementdetails?.data?.receiver_email && singleAgreementdetails?.data?.receiver_email != "" ? singleAgreementdetails?.data?.receiver_email : "[Receiver Email]"}</li>
                    <li>{singleAgreementdetails?.data?.receiver_number && singleAgreementdetails?.data?.receiver_number != "" ? singleAgreementdetails?.data?.receiver_number : "[Receiver Phone]"}</li>
                </ul>
            </div>
        </>
    )
}
