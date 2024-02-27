'use client';

import { Button } from '@/components/ui/button';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import React, { useEffect, useState } from 'react';
import { useMedia } from '@/hooks/use-media';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from '@/components/ui/datepicker';
import { handleKeyDown } from '@/utils/common-functions';
import { useRouter, useSearchParams } from 'next/navigation';
import { AgrementFormTypes, agrementFormSchema } from '@/utils/validators/agreement.schema';
import { Input } from 'rizzui';
import SelectLoader from '@/components/loader/select-loader';
import dynamic from 'next/dynamic';
import QuillLoader from '@/components/loader/quill-loader';
import PageHeader from '@/app/shared/page-header';
import EyeIcon from '@/components/icons/eye';
import { createagreement, getDropdownclientlist } from '@/redux/slices/user/agreement/agreementSlice';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { routes } from '@/config/routes';
import moment from 'moment';
import Spinner from '@/components/ui/spinner';

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


export default function CreateAgreementForm() {

    const isMedium = useMedia('(max-width: 1200px)', false);
    const dispatch = useDispatch();
    const router = useRouter();

    const searchParams = useSearchParams();
    const reference_id = searchParams.get("reference");

    const { user } = useSelector((state: any) => state?.root?.signIn?.user?.data);
    const { clientlistDetails, loading } = useSelector((state: any) => state?.root?.agreement);
    const clientSliceData = useSelector((state: any) => state?.root?.client)?.clientProfile;

    // console.log(clientlistDetails, 'clientlistDetails')


    const clientOptions =
        clientlistDetails?.data && clientlistDetails?.data?.length > 0 ? clientlistDetails?.data?.map((client: any) => ({
            name: client?.name,
            value: client?._id,
            key: client
        })) : [];


    // Get Today date
    const today = new Date();

    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [preview, setpreview] = useState(false);
    const [sendbuttonflag, setsendbuttonflag] = useState<boolean>(false)
    const [selectedClient, setselectedClient] = useState<any>(reference_id ? clientOptions.find((option: any) => option?.key?.reference_id === reference_id) : null)

    const [formdata, setformData] = useState({
        title: '',
        recipient: reference_id ? selectedClient?.name : '',
        due_date: '',
        description: '',
    })


    useEffect(() => {
        reference_id ? setselectedClient(clientOptions.find((option: any) => option?.key?.reference_id === reference_id)) : setselectedClient(null)
    }, [clientlistDetails])

    useEffect(() => {
        dispatch(getDropdownclientlist())
    }, [])

    // initial value State
    const initialValues: AgrementFormTypes = {
        title: formdata?.title,
        recipient: formdata?.recipient,
        due_date: formdata?.due_date,
        description: formdata?.description,
    };


    // onSubmit Handler
    const onSubmit: SubmitHandler<AgrementFormTypes> = (data) => {
        const agreementData = {
            client_id: user?._id,
            title: data?.title,
            receiver: selectedClient?.value,
            due_date: data?.due_date,
            agreement_content: data?.description,
            send: sendbuttonflag,
            // ...(reference_id && { client_id: reference_id }),
        };

        // If in preview mode, dispatch the API call
        dispatch(createagreement(agreementData)).then((result: any) => {
            if (createagreement.fulfilled.match(result) && result.payload.success === true) {
                reference_id ? router.replace(routes.clients.details(clientSliceData?._id)) : router.replace(routes.agreement);

            }
        });
        setsendbuttonflag(false)

    };

    const SendHandler = () => {
        setsendbuttonflag(true)
    }

    //Preview mode Handler
    const handlePreview = (watch: any, trigger: any, isDirty: any, isValid: any) => {



        if (isValid) {
            // Toggle to preview mode
            setpreview(!preview);
            setformData(watch()) // Call custom function if form is completely filled
        } else {
            trigger() // Otherwise, proceed with default form submission
        }
    };


    return (
        <>
            {/* Agreement forms */}
            {!preview && (
                <>
                    <div>
                        <PageHeader title="Create Agreement">
                            <div >
                                <Link href={routes.agreement} className="w-full">
                                    <Button className="float-end mt-5 bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0">
                                        <FaArrowLeft className="me-1.5 h-[17px] w-[17px]" />
                                        Back
                                    </Button>
                                </Link>
                            </div>
                        </PageHeader>
                    </div>

                    <Form<AgrementFormTypes>
                        validationSchema={agrementFormSchema}
                        onSubmit={onSubmit}
                        useFormProps={{
                            defaultValues: initialValues,
                            mode: 'all',
                        }}
                        className=" p-10 [&_label]:font-medium"
                    >
                        {({
                            register,
                            control,
                            formState: { errors },
                            watch,
                            handleSubmit,
                            trigger,
                            formState: { isDirty, isValid }

                        }) => (
                            // console.log(errors, 'errors'),
                            (
                                <>
                                    <div className="space-y-5">
                                        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-3 xl:gap-5 xl:pb-2">
                                            <Input
                                                onKeyDown={handleKeyDown}
                                                type="text"
                                                // size={isMedium ? 'lg' : 'xl'}
                                                label="Title *"
                                                placeholder="Website Agreement"
                                                // rounded="pill"
                                                color="info"
                                                className="w-full  [&>label>span]:font-medium"
                                                {...register('title')}
                                                error={errors.title?.message}
                                            />
                                            {/* <Controller
                                    control={control}
                                    name="recipient"
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            options={clientOptions}
                                            // onChange={onChange}
                                            onChange={(selectedOption: any) => {
                                                setselectedClient(selectedOption);
                                                onChange(selectedOption?._id); // Make sure to handle null case
                                            }}
                                            value={value}
                                            // size={isMedium ? 'lg' : 'xl'}
                                            label="Recipient*"
                                            // rounded="pill"
                                            color="info"
                                            getOptionValue={(option) => option.value}
                                            dropdownClassName="p-1 border w-12 border-gray-100 shadow-lg"
                                            className="font-medium"
                                            error={errors?.recipient?.message}
                                        />
                                    )}
                                /> */}
                                            <Controller
                                                control={control}
                                                name="recipient"
                                                render={({ field: { onChange, value } }) => (
                                                    <Select
                                                        options={clientOptions}
                                                        disabled={reference_id ? true : false}
                                                        onChange={(selectedOption: any) => {
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
                                                <label
                                                    htmlFor="due_date"
                                                    className="mb-1.5 font-medium text-gray-700 dark:text-gray-600"
                                                >
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
                                                {errors.due_date && (
                                                    <span className="mt-0.5 text-xs text-red">
                                                        {errors.due_date.message}
                                                    </span>
                                                )}
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
                                            {errors.description && (
                                                <span className="mt-0.5 text-xs text-red">
                                                    {errors.description.message}
                                                </span>
                                            )}
                                        </div>

                                        <div className="mb-1.5 mt-5 flex justify-between font-medium text-gray-700 dark:text-gray-600">
                                            <ul>
                                                <li>{user?.first_name}</li>
                                                <li>{user?.email}</li>
                                                <li>{user?.contact_number}</li>
                                            </ul>
                                            <ul>
                                                <li>
                                                    {selectedClient?.key?.name &&
                                                        selectedClient?.key?.name != ''
                                                        ? selectedClient?.key?.name
                                                        : '[Receiver Name]'}
                                                </li>
                                                <li>
                                                    {selectedClient?.key?.email &&
                                                        selectedClient?.key?.email != ''
                                                        ? selectedClient?.key?.email
                                                        : '[Receiver Email]'}
                                                </li>
                                                <li>
                                                    {selectedClient?.key?.contact_number &&
                                                        selectedClient?.key?.contact_number != ''
                                                        ? selectedClient?.key?.contact_number
                                                        : '[Receiver Phone]'}
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="mt-90 flex justify-end space-x-4">
                                            <Button
                                                type="button"
                                                onClick={() => {
                                                    // handleSubmit(onSubmit)()
                                                    handlePreview(watch, trigger, isDirty, isValid);
                                                }}
                                                variant="outline"
                                                className="bg-none text-xs sm:text-sm"
                                            >
                                                <EyeIcon className="mr-2 h-5 w-5" />
                                                Preview
                                            </Button>
                                            <Button
                                                disabled={loading}
                                                type="submit"
                                                className="bg-none text-xs sm:text-sm"
                                            >
                                                Save
                                                {loading && <Spinner size="sm" tag='div' className='ms-3' color='white' />}
                                            </Button>
                                            <Button
                                                type="submit"
                                                onClick={SendHandler}
                                                variant="outline"
                                                className="bg-none text-xs sm:text-sm"
                                            >
                                                Send
                                            </Button>
                                            {/* Add your disabled button here if needed */}
                                        </div>
                                    </div>
                                </>
                            )
                        )}
                    </Form>
                </>
            )}

            {/* Priview of Agreement */}
            {preview && (
                <>
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
                    <h3 className="flex items-center justify-between rounded border-2 border-solid border-gray-300 bg-gray-100 p-3 min-h-12">
                        <span>{formdata?.title}</span>
                        <span>{formdata?.due_date && formdata?.due_date != "" ? "Due Date : " + moment(formdata?.due_date).format("Do MMM. ‘YY") : ""}</span>
                    </h3>
                    <div
                        className="mt-5"
                        dangerouslySetInnerHTML={{ __html: formdata?.description }}
                    />
                    <div className="mb-1.5 mt-5 flex justify-between font-medium text-gray-700 dark:text-gray-600">
                        <ul>
                            <li>{user?.first_name}</li>
                            <li>{user?.email}</li>
                            <li>{user?.contact_number}</li>
                        </ul>
                        <ul>
                            <li>
                                {selectedClient?.key?.name && selectedClient?.key?.name != ''
                                    ? selectedClient?.key?.name
                                    : '[Receiver Name]'}
                            </li>
                            <li>
                                {selectedClient?.key?.email &&
                                    selectedClient?.key?.email != ''
                                    ? selectedClient?.key?.email
                                    : '[Receiver Email]'}
                            </li>
                            <li>
                                {selectedClient?.key?.contact_number &&
                                    selectedClient?.key?.contact_number != ''
                                    ? selectedClient?.key?.contact_number
                                    : '[Receiver Phone]'}
                            </li>
                        </ul>
                    </div>
                </>
            )}
        </>
    );
}
