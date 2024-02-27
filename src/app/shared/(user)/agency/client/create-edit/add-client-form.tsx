'use client';

import { Title, ActionIcon } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/spinner';
import { useModal } from '@/app/shared/modal-views/use-modal';
import cn from '@/utils/class-names';
import { PiXBold } from 'react-icons/pi';
import { Input } from '@/components/ui/input';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import { handleKeyContactDown, handleKeyDown } from '@/utils/common-functions';
import TitleSeparation from './title-separation';
import { ClientSchema, clientSchema } from '@/utils/client-schema';
import { RemoveRegionalData, getAllClient, getCities, getClientById, getCountry, getState, patchEditClient, postAddClient } from '@/redux/slices/user/client/clientSlice';
import { useEffect, useState } from 'react';
import { routes } from '@/config/routes';
import { refferalPayment, refferalPaymentStatistics } from '@/redux/slices/user/team-member/teamSlice';
import { initiateRazorpay } from '@/services/clientpaymentService';

const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});


export default function AddClientForm(props: any) {
  const { title, row ,fdata, setFdata} = props;
  const clientSliceData = useSelector((state: any) => state?.root?.client);
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const router = useRouter();
  const [save, setSave] = useState(false)
  const [loader, setLoader] = useState(false);
  const [reset, setReset] = useState({});
  const [loadingflag, setloadingflag] = useState(false)
  const paginationParams = useSelector((state: any) => state?.root?.client?.paginationParams);
  const token = localStorage.getItem('token')


  
  let initialValues: ClientSchema = {
    // name: "",
    first_name: "",
    last_name: "",
    email: "",
    company_name: "",
    company_website: "",
    address: "",
    city: undefined,
    state: undefined,
    country: undefined,
    pincode: "",
    title: "",
    contact_number: "",
    // titleOption: ""
  };  

  const ClintlistAPIcall = async () => {
    let { page, items_per_page, sort_field, sort_order, search } = paginationParams;
    await dispatch(getAllClient({ page, items_per_page, sort_field, sort_order, search, pagination: true }));

}

  useEffect(() => {
    dispatch(getCountry());
  }, [dispatch]);

  useEffect(() => {
    row && dispatch(getClientById({ clientId: row?._id }))
  }, [row, dispatch]); 

  let data = clientSliceData?.client;
  
  let defaultValuess = {
    first_name: data?.first_name,
    last_name: data?.last_name,
    email: data?.email,
    company_name: data?.client?.company_name,
    company_website: data?.client?.company_website,
    address: data?.client?.address,
    city: data?.client?.city?.name,
    state: data?.client?.state?.name,
    country: data?.client?.country?.name,
    pincode: data?.client?.pincode,
    title: data?.client?.title,
    contact_number: data?.contact_number
  };

  const [regionalData, setRegionalData] = useState({
    city: data?.client?.city?.id,
    state: data?.client?.state?.id,
    country: data?.client?.country?.id
  });  
  
  let countryOptions: Record<string, string>[] = [];
  clientSliceData?.countries !== '' && clientSliceData?.countries?.map((country: Record<string, string>) => {
    countryOptions.push({ name: country?.name, value: country?.name }) 
  })
  const countryHandleChange = (titleOption: string) => {
    const [ countryObj ] = clientSliceData?.countries?.filter((country: Record<string, string>) => country?.name === titleOption )
    dispatch(getState({ countryId: countryObj._id }))
    setRegionalData({...regionalData, country: countryObj._id})
  };

  let stateOptions: Record<string, string>[] = [];
  clientSliceData?.states !== '' && clientSliceData?.states?.map((state: Record<string, string>) => {
    stateOptions.push({ name: state?.name, value: state?.name }) 
  })

  const stateHandleChange = (titleOption: string) => {
    const [ stateObj ] = clientSliceData?.states?.filter((state: Record<string, string>) => state?.name === titleOption )
    dispatch(getCities({ stateId: stateObj._id }))
    setRegionalData({...regionalData, state: stateObj._id})
  };

  let cityOptions: Record<string, string>[] = [];

  clientSliceData?.cities !== '' && clientSliceData?.cities?.map((city: Record<string, string>) => {
    cityOptions.push({ name: city?.name, value: city?.name }) 
  })

  const cityHandleChange = (titleOption: string) => {
    const [ cityObj ] = clientSliceData?.cities?.filter((city: Record<string, string>) => city?.name === titleOption )
    setRegionalData({...regionalData, city: cityObj._id})
  };
  
  const onSubmit: SubmitHandler<ClientSchema> = (dataa) => {
    setloadingflag(true);
    
    const formData = {
      first_name: dataa?.first_name ?? '',
      last_name: dataa?.last_name ?? '',
      email: dataa?.email ?? '',
      company_name: dataa?.company_name ?? '',
      company_website: dataa?.company_website ?? '',
      address: dataa?.address ?? '',
      pincode: dataa?.pincode ?? '',
      title: dataa?.title ?? '',
      contact_number: dataa?.contact_number ?? ''
    }
    const filteredFormData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== undefined && value !== '')
    );
    const filteredRegionalData = Object.fromEntries(
      Object.entries(regionalData).filter(([_, value]) => value !== undefined && value !== '')
      );
    const fullData = { ...filteredRegionalData, ...filteredFormData }

    if(title === 'New Client') {
      dispatch(postAddClient(fullData)).then((result: any) => {
        if (postAddClient.fulfilled.match(result)) {
          setLoader(false);
          setSave(false);
          if (result && result.payload.success === true) {

            const userReferenceId = result?.payload?.data?.reference_id ?? '';

            dispatch(refferalPaymentStatistics()).then((result: any) => {
              if (refferalPaymentStatistics.fulfilled.match(result)) {
                if (result && result.payload.success === true) {

                  if (result?.payload?.data?.available_sheets > 0) {
                    // console.log(142, userReferenceId)
                    dispatch(refferalPayment({ user_id: userReferenceId, without_referral: true })).then((result: any) => {
                      if (refferalPayment.fulfilled.match(result)) {
                        if (result && result.payload.success === true) {
                          closeModal();
                          dispatch(getAllClient({ sort_field: 'createdAt', sort_order: 'desc', pagination: true }));
                          setloadingflag(false)
                        } else {
                          setloadingflag(false)
                        }
                      }
                    });

                  } else if (result?.payload?.data?.redirect_payment_page) {
                    console.log(146)

                    router.push(routes?.clients?.payment)

                  } else if (!result?.payload?.data?.redirect_payment_page) {
                    console.log(151)

                    initiateRazorpay(router, routes.client, token, userReferenceId, ClintlistAPIcall, setloadingflag, closeModal)

                  }

                } else {
                  setloadingflag(false)
                }
              } 
            });

            // save && closeModal();
            // setReset({ ...initialValues })
            dispatch(getAllClient({ sort_field: 'createdAt', sort_order: 'desc', pagination: true }));
            dispatch(RemoveRegionalData())
            setSave(false);




          } else {
            setloadingflag(false)
          }
        }
      });
    } else {
      dispatch(patchEditClient({ ...fullData, clientId: data._id })).then((result: any) => {
        if(patchEditClient.fulfilled.match(result)) {
          if (result && result.payload.success === true) {
            save && closeModal();
            dispatch(getAllClient({ sort_field: 'createdAt', sort_order: 'desc', pagination: true }));
            setSave(false);
          }
        }
      });
    } 
  };

  const handleSaveClick = () => {
    setSave(true);
  }
  
  if(!clientSliceData?.client && title === 'Edit Client') {
    return (
      <div className='p-10 flex items-center justify-center'>
        <Spinner size="xl" tag='div' className='ms-3' />
      </div>
    )
  } else {
  return (
    <>
      <Form<ClientSchema>
        validationSchema={clientSchema}
        onSubmit={onSubmit}
        resetValues={reset}
        useFormProps={{
          mode: 'all',
          defaultValues: defaultValuess,
        }}
        className=" p-10 [&_label]:font-medium"
      >
        {({
          register,
          control,
          formState: { errors, isSubmitSuccessful },
          handleSubmit,
        }) => (
          <div className="space-y-5">
            <div className="mb-6 flex items-center justify-between">
              <Title as="h3" className="text-xl xl:text-2xl">
                {title}
              </Title>
              <ActionIcon
                size="sm"
                variant="text"
                onClick={() => closeModal()}
                className="p-0 text-gray-500 hover:!text-gray-900"
              >
                <PiXBold className="h-[18px] w-[18px]" />
              </ActionIcon>
            </div>
            <TitleSeparation
              className="mb-10 dark:before:bg-gray-200 xl:mb-7 dark:[&>span]:bg-[#191919]"
              title="Account Info"
            />
            {/* <Controller
              control={control}
              name="titleOption"
              render={({ field: { onChange, value } }) => (
                <Select
                  options={titleOption}
                  onChange={(titleOption: string) => {
                    onChange(titleOption);
                    peopleCountChange(titleOption);
                  }}
                  value={value}
                  label="Title"
                  // rounded="pill"
                  color="info"
                  // size={isMedium ? 'lg' : 'xl'}
                  getOptionValue={(option) => option.value}
                  dropdownClassName="p-1 border w-12 border-gray-100 shadow-lg"
                  className="w-24"
                  error={errors?.titleOption?.message as string}
                />
              )}
            /> */}
            <div
              className={cn(
                'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2'
              )}
            >
              <Input
                onKeyDown={handleKeyDown}
                type="text"
                label="First Name *"
                placeholder="Enter First Name"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('first_name')}
                error={errors?.first_name?.message}
              />
              <Input
                onKeyDown={handleKeyDown}
                type="text"
                label="Last Name *"
                placeholder="Enter Last Name"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('last_name')}
                error={errors?.last_name?.message}
              />
              <Input
                onKeyDown={handleKeyDown}
                type="email"
                label="Email ID *"
                placeholder="Enter your email"
                disabled={title === 'Edit Client'}
                color="info"
                className="[&>label>span]:font-medium"
                {...register('email')}
                error={errors?.email?.message}
              />
              <Input
                onKeyDown={handleKeyContactDown}
                type="text"
                label="Phone"
                placeholder="Enter Phone Number"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('contact_number')}
                error={errors?.contact_number?.message}
              />
            </div>
            <TitleSeparation
              className="mb-10 dark:before:bg-gray-200 xl:mb-7 dark:[&>span]:bg-[#191919]"
              title="Company Info"
            />
            <div
              className={cn(
                'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2'
              )}
            >
              <Input
                onKeyDown={handleKeyDown}
                type="text"
                label="Company Name *"
                placeholder="Enter Company Name"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('company_name')}
                error={errors?.company_name?.message as string}
              />
              <Input
                onKeyDown={handleKeyDown}
                type="text"
                label="Company Website"
                placeholder="Enter website URL"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('company_website')}
                error={errors?.company_website?.message as string}
              />
            </div>
            <TitleSeparation
              className="mb-10 dark:before:bg-gray-200 xl:mb-7 dark:[&>span]:bg-[#191919]"
              title="Address"
            />
            <div
              className={cn(
                'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2'
              )}
            >
              <Input
                onKeyDown={handleKeyDown}
                type="text"
                label="Address *"
                placeholder="Enter Your Address"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('address')}
                error={errors?.address?.message as string}
              />
              <Controller
                name="country"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    options={countryOptions}
                    value={value}
                    onChange={(titleOption: string) => {
                      onChange(titleOption);
                      countryHandleChange(titleOption);
                    }}
                    label="Country"
                    color="info"
                    error={errors?.country?.message as string}
                    getOptionValue={(option) => option.name}
                    dropdownClassName="p-1 border w-12 border-gray-100 shadow-lg"
                    className="font-medium"
                  />
                )}
              />
            </div>
            <div
              className={cn(
                'grid grid-cols-1 gap-4 pb-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'
              )}
            >
              <Controller
                name="state"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    options={stateOptions}
                    value={value}
                    onChange={(titleOption: string) => {
                      onChange(titleOption);
                      stateHandleChange(titleOption);
                    }}
                    label="State"
                    color="info"
                    disabled={stateOptions.length === 0}
                    error={errors?.state?.message as string}
                    getOptionValue={(option) => option.name}
                    dropdownClassName="p-1 border w-12 border-gray-100 shadow-lg"
                    className="font-medium"
                  />
                )}
              />
              <Controller
                name="city"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    options={cityOptions}
                    value={value}
                    onChange={(titleOption: string) => {
                      onChange(titleOption);
                      cityHandleChange(titleOption);
                    }}
                    disabled={cityOptions.length === 0}
                    label="City"
                    color="info"
                    error={errors?.city?.message as string}
                    getOptionValue={(option) => option.name}
                    dropdownClassName="p-1 border w-12 border-gray-100 shadow-lg"
                    className="font-medium"
                  />
                )}
              />
              <Input
                onKeyDown={handleKeyContactDown}
                type="text"
                label="Pin Code"
                placeholder="Enter Pincode Number"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('pincode')}
                error={errors.pincode?.message}
              />
            </div>
            <div>
              <div className={cn('grid grid-cols-2 gap-5 pt-5')}>
                <div>
                  <Button
                    variant="outline"
                    className="@xl:w-auto dark:hover:border-gray-400"
                    onClick={() => closeModal()}
                  >
                    Cancel
                  </Button>
                </div>
                <div className="float-right text-right">
                  {/* {title === 'New Client' && (
                    <Button
                      // type='submit'
                      className="hover:gray-700 @xl:w-auto dark:bg-gray-200 dark:text-white"
                      disabled={
                        Object.keys(errors).length === 0 &&
                        loader &&
                        isSubmitSuccessful &&
                        !save
                      }
                      onClick={() => {
                        handleSubmit(onSubmit)();
                        setLoader(true);
                      }}
                    >
                      Save & New
                      {Object.keys(errors).length === 0 &&
                        loader &&
                        isSubmitSuccessful &&
                        !save && (
                          <Spinner
                            size="sm"
                            tag="div"
                            className="ms-3"
                            color="white"
                          />
                        )}
                    </Button>
                  )} */}
                  <Button
                    type="submit"
                    className="bg-[#53216F] hover:bg-[#8e45b8] ms-3 @xl:w-auto dark:bg-gray-200 dark:text-white"
                    disabled={loadingflag}
                    onClick={handleSaveClick}
                  >
                    Save
                    {loadingflag && (
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
          </div>
        )}
      </Form>
    </>
  );
  }
}
