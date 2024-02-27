'use client';

import { CompanyDetailsSchema, companyDetailsSchema } from "@/utils/validators/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "rizzui";
import CompanyDetailsForm from "./company-details";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser, signUpUserSubscription } from "@/redux/slices/user/auth/signupSlice";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";
import { routes } from "@/config/routes";
import useMedia from "react-use/lib/useMedia";
import { initiateRazorpay } from "@/services/paymentService";

export default function CompanyForm(props: any) {


    const isMedium = useMedia('(max-width: 1200px)', false);
    const { signUpFormData, setNextBtn, setTitle, setFdata, fdata } = props;
    const signUp = useSelector((state: any) => state?.root?.signUp)
    const { subscriptionData } = useSelector((state: any) => state?.root?.signUp)
    // console.log(subscriptionData, 'subscriptionData')


    const initialValues = {
        companyName: fdata?.companyName ?? '',
        companyWebsite: fdata?.companyWebsite ?? '',
        peopleCount: fdata?.peopleCount ?? '',
        industry: fdata?.industry ?? ''
    };
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const methods = useForm<CompanyDetailsSchema>({
        resolver: zodResolver(companyDetailsSchema),
        defaultValues: initialValues,
    });

    const onSubmit: SubmitHandler<CompanyDetailsSchema> = (data) => {
        dispatch(signUpUser({ ...signUpFormData, ...data })).then((result: any) => {
            // console.log(result.payload, 'result.payload')
            if (signUpUser.fulfilled.match(result)) {
                if (result && result.payload.success === true) {
                    // router.replace(routes.signIn);
                    localStorage.setItem("token", result?.payload?.data?.token);
                    initiateRazorpay(router, routes.dashboard, result?.payload?.data?.token, dispatch)
                    // dispatch(signUpUserSubscription({})).then((result: any) => {
                    //     initiateRazorpay(router, routes.dashboard, result?.payload?.data?.token)
                    // })
                }
            }
        })
    };


    const handleClick = () => {
        dispatch(signUpUser({ ...signUpFormData })).then((result: any) => {
            // console.log(result.payload, 'result.payload')
            if (signUpUser.fulfilled.match(result)) {
                if (result && result.payload.success === true) {
                    // router.replace(routes.signIn);
                    localStorage.setItem("token", result?.payload?.data?.token);
                    initiateRazorpay(router, routes.dashboard, result?.payload?.data?.token, dispatch)
                    // dispatch(signUpUserSubscription({})).then((result: any) => {
                    // })
                }
                setLoader(false)
            }
        })
        setLoader(true);
    };

    const handlePrevClick = () => {
        setNextBtn(false);
        setTitle('Sign Up');
    }

    return (
        <>
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                // className={cn('[&_label.block>span]:font-medium', className)}
                >
                    <CompanyDetailsForm fdata={fdata} setFdata={setFdata} />
                    <Button
                        className="border-2 text-base font-bold float-right mt-8"
                        type="submit"
                        color="info"
                        rounded="pill"
                        size={isMedium ? 'lg' : 'xl'}
                        disabled={signUp?.loading && !loader}
                    >
                        Submit
                        {signUp?.loading && !loader && <Spinner size="sm" tag='div' className='ms-3' color='white' />}
                    </Button>
                </form>
            </FormProvider>
            <Button
                className="border-2  text-base font-medium float-right me-3 mt-8"
                type="submit"
                color="info"
                rounded="pill"
                size={isMedium ? 'lg' : 'xl'}
                onClick={handleClick}
                disabled={loader}
            >
                Skip & Save
                {loader && <Spinner size="sm" tag='div' className='ms-3' color='white' />}
            </Button>
            <Button
                className="border-2  text-base font-medium float-left me-3 mt-8"
                type="submit"
                color="info"
                rounded="pill"
                size={isMedium ? 'lg' : 'xl'}
                onClick={handlePrevClick}
            >
                Previous
            </Button>
        </>
    );
}