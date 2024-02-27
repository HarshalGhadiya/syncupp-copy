'use client';

import React, { useEffect, useState } from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikProps,
  FieldProps,
  FieldArray,
} from 'formik';
// import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Title, Text } from '@/components/ui/text';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from '@/components/ui/datepicker';
import Select from '@/components/ui/select';
import { FormBlockWrapper } from '@/app/shared/(user)/invoice/invoice-list/form-utils';
import FormFooter, { negMargin } from '@/components/form-footer';
import {
  InvoiceFormInput,
  invoiceFormSchema,
} from '@/utils/validators/create-invoice.schema';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '@/redux/slices/user/auth/signinSlice';
import Spinner from '@/components/ui/spinner';
import { ActionIcon, Button } from 'rizzui';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { FaArrowLeft } from 'react-icons/fa6';
import moment from 'moment';
import { useRouter, useSearchParams } from 'next/navigation';
import { PiMinusBold, PiPlusBold, PiTrashBold } from 'react-icons/pi';
import cn from '@/utils/class-names';
import { handleKeyDown } from '@/utils/common-functions';
import { createinvoiceapicall, updateInvoice } from '@/redux/slices/user/invoice/invoicesformSlice';
import { getInvoiceApi, getInvoiceDataByID } from '@/redux/slices/user/invoice/invoiceSlice';
import PageHeader from '@/app/shared/page-header';

export default function EditInvoice({ params }: { params: { id: string } }) {

  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const reference_id = searchParams.get("reference");

  const invoiceSliceData = useSelector((state: any) => state?.root?.invoice);
  const InvoiceLoader = useSelector((state: any) => state?.root?.invoice)?.loading
  const updateloader = useSelector((state: any) => state?.root?.invoiceform)?.loading
  const { userProfile, loading } = useSelector((state: any) => state?.root?.signIn);

  const [selectedClient, setselectedClient] = useState<any>(null);
  const [sentstatus, setsentStatus] = useState<any>(false);

  const SingleInvoiceData: any = invoiceSliceData?.getInvoiceDataByIDdata?.data?.[0];
  const [dueDate, setDueDate] = useState<Date>(SingleInvoiceData?.due_date ? new Date(SingleInvoiceData?.due_date) : new Date());
  const [invoiceformDate, setinvoiceformDate] = useState<Date>(SingleInvoiceData?.invoice_date ? new Date(SingleInvoiceData?.invoice_date) : new Date());

  const clientOptions =
    invoiceSliceData?.getInvoiceApidata?.data &&
      invoiceSliceData?.getInvoiceApidata?.data?.length > 0
      ? invoiceSliceData?.getInvoiceApidata?.data?.map((client: any) => ({
        name: `${client?.client_full_name}(${client.company_name})`,
        value: client?._id,
        key: client,
      }))
      : [];

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  useEffect(() => {
    dispatch(getInvoiceApi());
  }, []);

  useEffect(() => {
    if (params.id) {
      dispatch(getInvoiceDataByID({ _id: params.id }));
      setselectedClient(clientOptions.find((option: any) => option.value === SingleInvoiceData?.to?._id))
    }
  }, [params.id]);

  useEffect(() => {
    if (SingleInvoiceData?.due_date && SingleInvoiceData?.invoice_date) {
      setDueDate(new Date(SingleInvoiceData?.due_date))
      setinvoiceformDate(new Date(SingleInvoiceData?.invoice_date))
      setselectedClient(clientOptions.find((option: any) => option.value === SingleInvoiceData?.to?._id))
    }
  }, [SingleInvoiceData]);


  // Total point Calculations 
  function calculateTotalTax(invoiceContent: any) {
    let total = 0;

    if (invoiceContent && Array.isArray(invoiceContent) && invoiceContent.length > 0) {
      for (let index = 0; index < invoiceContent.length; index++) {
        const item: any = invoiceContent[index];
        if (item && typeof item.qty === 'number' && typeof item.rate === 'number' && typeof item.tax === 'number') {
          const itemTotal = (item.rate * item.qty) + ((item.rate * item.qty) / 100) * item.tax;
          total += parseFloat(itemTotal.toFixed(2));
        }
      }
    }

    return total.toFixed(2);
  }

  // form initialvalue schema 
  const initialsValue: InvoiceFormInput = {
    invoice_number: SingleInvoiceData?.invoice_number,
    client_id: SingleInvoiceData?.to?._id,
    due_date: SingleInvoiceData?.due_date ? new Date(SingleInvoiceData?.due_date) : new Date(),
    invoice_date: SingleInvoiceData?.invoice_date ? new Date(SingleInvoiceData?.invoice_date) : new Date(),
    invoice_content: SingleInvoiceData?.invoice_content || []
    // invoice_content: [
    //   {
    //     item: '',
    //     description: '',
    //     qty: 1,
    //     rate: 0,
    //     tax: 0,
    //   },
    // ],
  };

  const handleSubmit = (values: any) => {
    values.due_date = moment(
      values.due_date,
      'ddd MMM DD YYYY HH:mm:ss'
    ).format('YYYY-MM-DD');
    values.invoice_date = moment(
      values.invoice_date,
      'ddd MMM DD YYYY HH:mm:ss'
    ).format('YYYY-MM-DD');
    values.sent = sentstatus;

    const formData = values
    formData.invoice_id = params.id,

      dispatch(updateInvoice(formData)).then((result: any) => {
        if (updateInvoice.fulfilled.match(result)) {
          if (result && result.payload.success === true) {
            router.replace(routes.invoice);
          }
        }
      });

  };

  // Inside the onChange event handler of the Select component
  const handleClientChange = (e: any, setFieldValue: any) => {
    if (e?.value !== selectedClient?.value) {
      // Check if the selected client has changed
      setFieldValue('client_id', e?.value);
      setselectedClient(e);
    }
  };

  return (
    <>
      {InvoiceLoader || loading ? <div className='p-10 flex items-center justify-center'>
        <Spinner size="xl" tag='div' className='ms-3' />
      </div> :
        <Formik
          initialValues={initialsValue}
          validationSchema={invoiceFormSchema}
          onSubmit={handleSubmit}
        // enableReinitialize
        >
          {({ values, isSubmitting, setFieldValue, errors }: any) => (
            // console.log(errors, 'errors', values),
            (
              <Form className="flex flex-grow flex-col @container [&_label]:font-medium">
                <div className="flex-grow pb-10">
                  <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12">
                    {/* Page Title & Back button */}
                    <div>
                      <PageHeader title="Edit Invoice">
                        <div >
                          <Link href={routes.invoice} className="w-full">
                            <Button className="float-end mt-5 bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0">
                              <FaArrowLeft className="me-1.5 h-[17px] w-[17px]" />
                              Back
                            </Button>
                          </Link>
                        </div>
                      </PageHeader>
                    </div>

                    {/* From Input Section  */}
                    <FormBlockWrapper
                      title={'From:'}
                      description={'From he who sending this invoice'}
                      className="pt-7 @2xl:pt-9 @3xl:pt-11"
                    >
                      <Input
                        label="Name *"
                        placeholder="Enter Your Name"
                        defaultValue={`${userProfile?.first_name ?? ''} ${userProfile?.last_name ?? ''
                          }`}
                        disabled={true}
                      />
                      <Input
                        label="Phone Number"
                        placeholder=""
                        defaultValue={userProfile?.contact_number ?? ''}
                        disabled={true}
                      />
                      <Textarea
                        label="Address"
                        placeholder="Enter your address"
                        textareaClassName="h-20"
                        className="col-span-2"
                        value={`${userProfile?.reference_id?.address && userProfile?.reference_id?.address !== '' ? userProfile?.reference_id?.address + ',' : ''} ${userProfile?.reference_id?.city?.name && userProfile?.reference_id?.city?.name !== '' ? userProfile?.reference_id?.city?.name + ',' : ''} ${userProfile?.reference_id?.state?.name && userProfile?.reference_id?.state?.name !== '' ? userProfile?.reference_id?.state?.name + ',' : ''} ${userProfile?.reference_id?.country?.name && userProfile?.reference_id?.country?.name !== '' ? userProfile?.reference_id?.country?.name + ',' : ''} ${userProfile?.reference_id?.pincode && userProfile?.reference_id?.pincode !== '' ? userProfile?.reference_id?.pincode + ',' : ''}`}
                        disabled={true}
                      />
                    </FormBlockWrapper>

                    {/* To Input Selection  */}
                    <FormBlockWrapper
                      title={'To:'}
                      description={'To he who will receive this invoice'}
                      className="pt-7 @2xl:pt-9 @3xl:pt-11"
                    >
                      <div>
                        <Field name="client_id">
                          {({ field }: FieldProps<any>) => (
                            <Select
                              disabled={reference_id ? true : false}
                              {...field}
                              onChange={(e) => {
                                handleClientChange(e, setFieldValue);
                              }}
                              options={clientOptions}
                              value={selectedClient?.name}
                              label="Recipient*"
                              color="info"
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          name="client_id"
                          component="div"
                          className="mt-0.5 text-xs text-red"
                        />
                      </div>

                      <Input
                        label="Phone Number"
                        placeholder=""
                        defaultValue={
                          selectedClient?.key?.contact_number &&
                            selectedClient?.key?.contact_number != ''
                            ? selectedClient?.key?.contact_number
                            : ''
                        }
                        disabled={true}
                      />
                      <Textarea
                        label="Address"
                        placeholder="Enter your address"
                        textareaClassName="h-20"
                        className="col-span-2"
                        disabled={true}
                        value={`${selectedClient?.key?.address && selectedClient?.key?.address !== '' ? selectedClient?.key?.address + ',' : ''} ${selectedClient?.key?.city?.name && selectedClient?.key?.city?.name !== '' ? selectedClient?.key?.city?.name + ',' : ''} ${selectedClient?.key?.state?.name && selectedClient?.key?.state?.name !== '' ? selectedClient?.key?.state?.name + ',' : ''} ${selectedClient?.key?.country?.name && selectedClient?.key?.country?.name !== '' ? selectedClient?.key?.country?.name + ',' : ''} ${selectedClient?.key?.pincode && selectedClient?.key?.pincode !== '' ? selectedClient?.key?.pincode + ',' : ''}`}

                      />
                    </FormBlockWrapper>

                    <FormBlockWrapper
                      title={'Schedule:'}
                      description={'To he who will receive this invoice'}
                      className="pt-7 @2xl:pt-9 @3xl:pt-11"
                    >
                      <div className="col-span-2 grid grid-cols-1 items-baseline gap-5 @lg:grid-cols-2 @5xl:grid-cols-3">
                        <div>
                          <Field name="invoice_number">
                            {({ field }: any) => (
                              <Input
                                {...field}
                                onKeyDown={handleKeyDown}
                                type="text"
                                label="Invoice Number *"
                                placeholder="Enter invoice number"
                              // error={errors.invoice_number}
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            name="invoice_number"
                            component="div"
                            className="mt-0.5 text-xs text-red"
                          />
                        </div>

                        <div className="[&>.react-datepicker-wrapper]:w-full">
                          <Field name="invoice_date">
                            {({ field }: any) => (
                              <DatePicker
                                {...field}
                                inputProps={{ label: 'Date Create' }}
                                placeholderText="Select Date"
                                onChange={(date: Date) => {
                                  setinvoiceformDate(date)
                                  // console.log(e, 'eeeeeeee');
                                  setFieldValue('invoice_date', date);
                                  // Update the form field value
                                }}
                                selected={invoiceformDate} // Set the selected date value
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            name="invoice_date"
                            component="div"
                            className="mt-0.5 text-xs text-red"
                          />
                        </div>

                        <div className="[&>.react-datepicker-wrapper]:w-full">
                          <Field name="due_date">
                            {({ field }: any) => (
                              <DatePicker
                                {...field}
                                inputProps={{
                                  label: 'Due Date',
                                  // error: errors?.due_date,
                                }}
                                minDate={values.invoice_date}
                                placeholderText="Select Date"
                                onChange={(date: Date) => {
                                  // console.log(e, 'eeeeeeee');
                                  setDueDate(date)
                                  setFieldValue('due_date', date);
                                  // Update the form field value
                                }}
                                selected={dueDate} // Set the selected date value
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            name="due_date"
                            component="div"
                            className="mt-0.5 text-xs text-red"
                          />
                        </div>
                      </div>
                    </FormBlockWrapper>

                    <FormBlockWrapper
                      title={'Item Details:'}
                      description={'Add one or multiple item'}
                      className="pt-7 @2xl:pt-9 @3xl:pt-11"
                    >
                      <div className="col-span-2 @container">
                        <FieldArray name="invoice_content">
                          {({ push, remove }) => (
                            <div>
                              {values.invoice_content.map(
                                (content: any, index: number) => (
                                  <div
                                    key={index}
                                    className="mb-8 grid grid-cols-1 items-start rounded-lg border border-gray-200 p-4 shadow @md:p-5 @xl:p-6"
                                  >
                                    {/* <Field name={`invoice_content[${index}].item`} /> */}
                                    <div className="mb-2 w-full">
                                      <Field
                                        name={`invoice_content[${index}].item`}
                                        className="w-full"
                                      >
                                        {({ field, meta }: FieldProps) => (
                                          <Input
                                            onKeyDown={handleKeyDown}
                                            {...field}
                                            label="Item *"
                                            placeholder="Enter Item Name"
                                            // error={errors?.invoice_content[index]?.item}
                                            className="w-full"
                                          />
                                        )}
                                      </Field>
                                      <ErrorMessage
                                        name={`invoice_content[${index}].item`}
                                        component="div"
                                        className="mt-0.5 text-xs text-red"
                                      />
                                    </div>

                                    <div className="grid w-full items-start gap-3 @md:grid-cols-2 @lg:gap-4 @xl:grid-cols-3 @2xl:gap-5 @4xl:grid-cols-4">
                                      <div>
                                        <Field
                                          name={`invoice_content[${index}].qty`}
                                          className="w-full"
                                        >
                                          {({ field, meta }: FieldProps) => (
                                            <Input
                                              onKeyDown={handleKeyDown}
                                              {...field}
                                              label="Quantity"
                                              type="number"
                                              min={1}
                                              placeholder="1"
                                              // error={meta.error}
                                              className="w-full"
                                              suffix={
                                                <>
                                                  <ActionIcon
                                                    title="Decrement"
                                                    size="sm"
                                                    variant="outline"
                                                    className="scale-90 shadow-sm"
                                                    onClick={() => {
                                                      setFieldValue(
                                                        `invoice_content[${index}].qty`,
                                                        +values.invoice_content[
                                                          index
                                                        ]?.qty > 0
                                                          ? +values
                                                            .invoice_content[
                                                            index
                                                          ]?.qty - 1
                                                          : 0
                                                      );
                                                    }}
                                                  >
                                                    <PiMinusBold
                                                      className="h-3.5 w-3.5"
                                                      strokeWidth={2}
                                                    />
                                                  </ActionIcon>
                                                  <ActionIcon
                                                    title="Increment"
                                                    size="sm"
                                                    variant="outline"
                                                    className="scale-90 shadow-sm"
                                                    onClick={() => {
                                                      setFieldValue(
                                                        `invoice_content[${index}].qty`,
                                                        +values.invoice_content[
                                                          index
                                                        ]?.qty + 1
                                                      );
                                                    }}
                                                  >
                                                    <PiPlusBold
                                                      className="h-3.5 w-3.5"
                                                      strokeWidth={2}
                                                    />
                                                  </ActionIcon>
                                                </>
                                              }
                                              suffixClassName="flex gap-1 items-center -me-2"
                                            />
                                          )}
                                        </Field>
                                        <ErrorMessage
                                          name={`invoice_content[${index}].qty`}
                                          component="div"
                                          className="mt-0.5 text-xs text-red"
                                        />
                                      </div>

                                      <div>
                                        <Field
                                          name={`invoice_content[${index}].rate`}
                                          className="w-full"
                                        >
                                          {({ field, meta }: FieldProps) => (
                                            <Input
                                              onKeyDown={handleKeyDown}
                                              {...field}
                                              label="Rate *"
                                              type="number"
                                              prefix={'$'}
                                              placeholder="100"
                                              // error={errors?.invoice_content?.[index]?.rate?.message}
                                              className="w-full"
                                            />
                                          )}
                                        </Field>
                                        <ErrorMessage
                                          name={`invoice_content[${index}].rate`}
                                          component="div"
                                          className="mt-0.5 text-xs text-red"
                                        />
                                      </div>

                                      <div>
                                        <Field
                                          name={`invoice_content[${index}].tax`}
                                          className="w-full"
                                        >
                                          {({ field, meta }: FieldProps) => (
                                            <Input
                                              maxLength={3}
                                              onKeyDown={handleKeyDown}
                                              {...field}
                                              type="number"
                                              label="Taxes *"
                                              suffix={'%'}
                                              placeholder="15"
                                              className="w-full"
                                            />
                                          )}
                                        </Field>
                                        <ErrorMessage
                                          name={`invoice_content[${index}].tax`}
                                          component="div"
                                          className="mt-0.5 text-xs text-red"
                                        />
                                      </div>
                                      <div className="ms-3 mt-9 flex items-start text-sm">
                                        <Text className="me-1 text-lg text-gray-500">
                                          Total:
                                        </Text>
                                        <Text
                                          as="b"
                                          className="text-lg font-medium"
                                        >
                                          $
                                          {(
                                            values?.invoice_content[index]?.rate *
                                            values?.invoice_content[index]
                                              ?.qty +
                                            ((values?.invoice_content[index]
                                              ?.rate *
                                              values?.invoice_content[index]
                                                ?.qty) /
                                              100) *
                                            values?.invoice_content[index]?.tax
                                          ).toFixed(2)}
                                        </Text>
                                      </div>

                                      {/* <div className='w-full mb-2'> */}
                                      <Field
                                        name={`invoice_content[${index}].description`}
                                        className="w-full"
                                      >
                                        {({ field, meta }: FieldProps) => (
                                          <Textarea
                                            onKeyDown={handleKeyDown}
                                            {...field}
                                            label="Description *"
                                            placeholder="Enter Item Description"
                                            // error={errors?.invoice_content?.[index]?.description}
                                            className="row-start-2 @md:col-span-2 @xl:col-span-3 @xl:row-start-2 @4xl:col-span-4"
                                            textareaClassName="h-20"
                                          />
                                        )}
                                      </Field>
                                      <ErrorMessage
                                        name={`invoice_content[${index}].description`}
                                        component="div"
                                        className="mt-0.5 text-xs text-red"
                                      />
                                      {/* </div> */}
                                    </div>
                                    {values?.invoice_content?.length !== 1 && (
                                      <Button
                                        variant="text"
                                        color="danger"
                                        onClick={() => remove(index)}
                                        className="-mx-2 -mb-1 ms-auto mt-5 h-auto px-2 py-1 font-semibold"
                                      >
                                        <PiTrashBold className="me-1 h-[18px] w-[18px]" />{' '}
                                        Remove
                                      </Button>
                                    )}
                                  </div>
                                )
                              )}

                              <div className="flex w-full flex-col items-start justify-between @4xl:flex-row @4xl:pt-6">
                                <Button
                                  onClick={() =>
                                    push({
                                      item: '',
                                      description: '',
                                      qty: 1,
                                      rate: 0,
                                      tax: 0,
                                    })
                                  }
                                  variant="flat"
                                  className="-mt-2 mb-7 w-full @4xl:mb-0 @4xl:mt-0 @4xl:w-auto"
                                  disabled={values.invoice_content.some(
                                    (field: any) =>
                                      Object.values(field).some(
                                        (innerField) => innerField === ''
                                      )
                                  )}
                                >
                                  <PiPlusBold className="me-1.5 h-4 w-4" /> Add
                                  Item
                                </Button>

                                <div className="grid w-full gap-2 @4xl:w-auto">
                                  <div className="grid grid-cols-3 gap-3 @lg:gap-4"></div>

                                  <div className="ms-auto mt-6 grid w-full gap-3.5 text-sm text-gray-600 @xl:max-w-xs">
                                    <Text className="flex items-center justify-between text-base font-semibold text-gray-900">
                                      Total:{' '}
                                      <Text as="span">
                                        {calculateTotalTax(
                                          values.invoice_content
                                        )}
                                      </Text>
                                    </Text>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </FieldArray>
                      </div>
                    </FormBlockWrapper>

                    <div
                      className={cn(
                        'sticky bottom-0 left-0 right-0 -mb-8 flex items-center justify-end gap-4 border-t bg-white px-4 py-4 dark:bg-gray-50 md:px-5 lg:px-6 3xl:px-8 4xl:px-10',
                        negMargin
                      )}
                    >
                      <Button
                        type="submit"
                        onClick={() => {
                          setsentStatus(true);
                        }}
                        // isLoading={isLoading}
                        className="w-full @xl:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
                        disabled={updateloader}
                      >
                        Save & Send
                        {(updateloader && sentstatus) && (
                          <Spinner
                            size="sm"
                            tag="div"
                            className="ms-3"
                            color="white"
                          />
                        )}
                      </Button>

                      <Button
                        type="submit"
                        onClick={() => {
                          setsentStatus(false);
                        }}
                        // isLoading={isLoading}
                        className="w-full @xl:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
                        disabled={updateloader}
                      >
                        Save
                        {(updateloader && !sentstatus) && (
                          <Spinner
                            size="sm"
                            tag="div"
                            className="ms-3"
                            color="white"
                          />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
            )
          )}
        </Formik>}
    </>
  );
}

