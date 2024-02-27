'use client';

import { Title, Text, ActionIcon } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { useEffect, useState } from 'react';
import { routes } from '@/config/routes';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useMedia } from '@/hooks/use-media';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from '@/components/ui/datepicker';
import { handleKeyDown } from '@/utils/common-functions';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/spinner';
import cn from '@/utils/class-names';
import { AgrementFormTypes, agrementFormSchema } from '@/utils/validators/agreement.schema';
import { Input } from 'rizzui';
import SelectLoader from '@/components/loader/select-loader';
import dynamic from 'next/dynamic';
import QuillLoader from '@/components/loader/quill-loader';
import PageHeader from '@/app/shared/page-header';
import EyeIcon from '@/components/icons/eye';
import { createagreement, getDropdownclientlist, getSingleagreement, updateagreement } from '@/redux/slices/user/agreement/agreementSlice';
import moment from 'moment';
import type { Metadata } from 'next'
import { FaArrowLeft } from 'react-icons/fa';


const Select = dynamic(() => import('@/components/ui/select'), {
    ssr: false,
    loading: () => <SelectLoader />,
});

const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
    ssr: false,
    loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});


const peopleCountOptions = [
    { name: '1-50', value: '1-50' },
    { name: '51-200', value: '51-200' },
    { name: '201-500', value: '201-500' },
    { name: '501-1000', value: '501-1000' },
]


export default function EditAgreementForm({ params }: { params: { id: string } }) {
    const isMedium = useMedia('(max-width: 1200px)', false);
    const dispatch = useDispatch();
    const router = useRouter();

    // state Data selection
    const { user } = useSelector((state: any) => state?.root?.signIn?.user?.data);
    const { singleAgreementdetails, loading, clientlistDetails, singleagreementloader, dropdownloader } = useSelector((state: any) => state?.root?.agreement);

    // set dynamic Dropdown options
    const clientOptions =
        clientlistDetails?.data && clientlistDetails?.data?.length > 0 ? clientlistDetails?.data?.map((client: any) => ({
            name: client?.name,
            value: client?._id,
            key: client
        })) : [];


    // state for the Data Management    
    const [preview, setpreview] = useState(false);
    const [sendbuttonflag, setsendbuttonflag] = useState<boolean>(false)
    const [firstRender, setFirstresnder] = useState(true)
    const [formdata, setformData] = useState({
        title: singleAgreementdetails?.data?.title,
        recipient: singleAgreementdetails?.data?.receiver,
        due_date: singleAgreementdetails?.data?.due_date, // Replace with the actual date in string format
        description: singleAgreementdetails?.data?.agreement_content,
    })
    const [selectedClient, setselectedClient] = useState<any>(clientOptions.find((option: any) => option.value === singleAgreementdetails?.data?.receiver))

    // get today date
    const today = new Date();
    const [dueDate, setDueDate] = useState<Date | null>(moment(singleAgreementdetails?.data?.due_date).toDate());
    // const [dueDate, setDueDate] = useState<Date | null>(new Date());

    // Dropdown API Call
    useEffect(() => {
        dispatch(getDropdownclientlist())
    }, [])
    // console.log(singleAgreementdetails, 'singleAgreementdetails')

    //get single Details API call
    useEffect(() => {
        dispatch(getSingleagreement(params?.id))
    }, [params?.id])

    // useEffect set a form Data 
    useEffect(() => {
        if (singleAgreementdetails) {

            setformData({
                title: singleAgreementdetails?.data?.title || "",
                recipient: singleAgreementdetails?.data?.receiver || "",
                due_date: singleAgreementdetails?.data?.due_date, // Replace with the actual date in string format
                description: singleAgreementdetails?.data?.agreement_content || "",
            })
            // setDueDate(new Date(singleAgreementdetails?.data?.due_date))
            const parsedDate = moment(singleAgreementdetails?.data?.due_date).toDate();
            setDueDate(parsedDate);
            setselectedClient(clientOptions.find((option: any) => option.value === singleAgreementdetails?.data?.receiver_id))
        }

    }, [singleAgreementdetails])


    // OnSubmit Handler
    const onSubmit: SubmitHandler<AgrementFormTypes> = (data) => {
        // console.log(' form data->', data);
        const agreementData = {
            client_id: user?._id,
            title: data?.title,
            receiver: selectedClient?.value,
            due_date: data?.due_date,
            agreement_content: data?.description,
            send: sendbuttonflag
        };

        dispatch(updateagreement({ data: agreementData, id: params?.id })).then((result: any) => {
            if (updateagreement.fulfilled.match(result)) {
                // console.log('resultt', result)
                if (result && result.payload.success === true) {
                    router.replace('/agreement');
                }
            }
        })
        setsendbuttonflag(false)
    };

    // Send Button Handler
    const SendHandler = () => {
        setsendbuttonflag(true)
    }

    // //Preview mode Handler
    // const handlePreview = (watch: any) => {
    //     // Toggle to preview mode
    //     setpreview(!preview);
    //     setFirstresnder(false)
    //     setformData(watch())
    // };

    //Preview mode Handler
    const handlePreview = (watch: any, trigger: any, isDirty: any, isValid: any) => {


        if (isValid) {
            // Toggle to preview mode
            setpreview(!preview);
            setFirstresnder(false)
            setformData(watch())
        } else {
            trigger() // Otherwise, proceed with default form submission
        }
    };

    return (
        <>
            {!singleagreementloader && !dropdownloader ?
                <div>
                    {!preview && <>
                        <PageHeader title="Edit Agreement" >
                            <div>
                                <Link href={routes.agreement} className="w-full">
                                    <Button className="float-end mt-5 bg-[#53216F] hover:bg-[#8e45b8] text-xs @lg:w-auto sm:text-sm lg:mt-0">
                                        <FaArrowLeft className="me-1.5 h-[17px] w-[17px]" />
                                        Back
                                    </Button>
                                </Link>
                            </div>
                        </PageHeader>
                        <Form<AgrementFormTypes>
                            validationSchema={agrementFormSchema}
                            onSubmit={onSubmit}
                            useFormProps={{
                                defaultValues: firstRender ? {
                                    title: singleAgreementdetails?.data?.title || "",
                                    recipient: singleAgreementdetails?.data?.receiver || "",
                                    due_date: singleAgreementdetails?.data?.due_date, // Replace with the actual date in string format
                                    description: singleAgreementdetails?.data?.agreement_content || "",
                                } : formdata,
                                mode: "all"
                            }}
                            className=" [&_label]:font-medium p-10"
                        >
                            {({ register, control, formState: { errors }, watch, trigger, formState: { isDirty, isValid } }) => (

                                // console.log(errors,'errors'),

                                <div className="space-y-5">

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:gap-5 xl:pb-2 items-start">
                                        <Input
                                            onKeyDown={handleKeyDown}
                                            type="text"
                                            // size={isMedium ? 'lg' : 'xl'}
                                            label="Title*"
                                            placeholder="Website Agreement"
                                            // rounded="pill"
                                            color="info"
                                            className="[&>label>span]:font-medium  w-full"
                                            {...register('title')}
                                            error={errors.title?.message}
                                        />
                                        <Controller
                                            control={control}
                                            name="recipient"
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    options={clientOptions}
                                                    onChange={(selectedOption: any) => {
                                                        // console.log(selectedOption, 'selectedOption', value)
                                                        setselectedClient(selectedOption);
                                                        onChange(selectedOption?.name);
                                                    }}
                                                    value={value}
                                                    label="Recipient*"
                                                    color="info"
                                                    // Remove getOptionLabel and getOptionValue props
                                                    dropdownClassName="p-1 border w-12 border-gray-100 shadow-lg"
                                                    className="font-medium"
                                                    error={errors?.recipient?.message}
                                                />
                                            )}
                                        />
                                        <div className="flex flex-col">
                                            <label htmlFor="due_date" className="font-medium text-gray-700 dark:text-gray-600 mb-1.5">
                                                Due Date *
                                            </label>
                                            <Controller
                                                name="due_date"
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <DatePicker
                                                        selected={dueDate}
                                                        onChange={(date: Date) => {
                                                            setDueDate(date);
                                                            onChange(date.toISOString()); // convert date to string
                                                        }}
                                                        minDate={today}
                                                        placeholderText="Select Date"
                                                    />
                                                )}
                                            />
                                            {errors.due_date && <span className="text-red text-xs mt-0.5">{errors.due_date.message}</span>}
                                        </div>
                                    </div>
                                    <div>
                                        <Controller
                                            control={control}
                                            name="description"
                                            render={({ field: { onChange, value } }) => (
                                                <QuillEditor
                                                    value={value}
                                                    onChange={onChange}
                                                    label="Description *"
                                                    className="col-span-full [&_.ql-editor]:min-h-[100px]"
                                                    labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                                                />
                                            )}
                                        />
                                        {errors.description && <span className="text-red text-xs mt-0.5">{errors.description.message}</span>}
                                    </div>

                                    <div className='flex justify-between mt-5 font-medium text-gray-700 dark:text-gray-600 mb-1.5'>
                                        <ul>
                                            <li>{user?.first_name}</li>
                                            <li>{user?.email}</li>
                                            <li>{user?.contact_number}</li>
                                        </ul>
                                        <ul>
                                            <li>{selectedClient?.key?.name && selectedClient?.key?.name != "" ? selectedClient?.key?.name : "[Receiver Name]"}</li>
                                            <li>{selectedClient?.key?.email && selectedClient?.key?.email != "" ? selectedClient?.key?.email : "[Receiver Email]"}</li>
                                            <li>{selectedClient?.key?.contact_number && selectedClient?.key?.contact_number != "" ? selectedClient?.key?.contact_number : "[Receiver Phone]"}</li>
                                        </ul>
                                    </div>


                                    <div className="flex justify-end space-x-4 mt-20">
                                        <Button type="button" onClick={() => { handlePreview(watch, trigger, isDirty, isValid) }} variant="outline" className="bg-none text-xs sm:text-sm">
                                            <EyeIcon className="h-5 w-5 mr-2" />
                                            Preview
                                        </Button>
                                        <Button disabled={loading} type="submit" className="bg-none text-xs sm:text-sm">
                                            Save
                                            {loading && <Spinner size="sm" tag='div' className='ms-3' color='white' />}
                                        </Button>
                                        <Button type="submit" disabled={loading} onClick={SendHandler} variant="outline" className="bg-none text-xs sm:text-sm">
                                            Send
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </Form>
                    </>}

                    {/* Priview of Agreement */}
                    {preview && <>

                        <div className="mt-90 flex justify-end space-x-4">
                            <Button
                                type="button"
                                onClick={() => {
                                    setpreview(false);
                                }}
                                className="bg-none mb-5 text-xs sm:text-sm"
                            >
                                <FaArrowLeft className="me-1.5 h-[17px] w-[17px]" />
                                Back
                            </Button>
                        </div>
                        <h3 className='flex justify-between items-center border-2 rounded border-solid border-gray-300 bg-gray-100 p-3'>
                            <span>{formdata?.title}</span>
                            <span>{formdata?.due_date && formdata?.due_date != "" ? "Due Date : " + moment(formdata?.due_date).format("Do MMM. ‘YY") : ""}</span>
                        </h3>
                        <div className='mt-5' dangerouslySetInnerHTML={{ __html: formdata?.description }} />
                        <div className='flex justify-between mt-5 font-medium text-gray-700 dark:text-gray-600 mb-1.5'>
                            <ul>
                                <li>{user?.first_name}</li>
                                <li>{user?.email}</li>
                                <li>{user?.contact_number}</li>
                            </ul>
                            <ul>
                                <li>{selectedClient?.key?.name && selectedClient?.key?.name != "" ? selectedClient?.key?.name : "[Receiver Name]"}</li>
                                <li>{selectedClient?.key?.email && selectedClient?.key?.email != "" ? selectedClient?.key?.email : "[Receiver Email]"}</li>
                                <li>{selectedClient?.key?.contact_number && selectedClient?.key?.contact_number != "" ? selectedClient?.key?.contact_number : "[Receiver Phone]"}</li>
                            </ul>
                        </div>

                    </>}
                </div>
                :

                <div className='p-10 flex items-center justify-center'>
                    <Spinner size="xl" tag='div' className='ms-3' />
                </div>
            }
        </>
    );
}
