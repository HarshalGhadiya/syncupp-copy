"use client";
import AuthWrapperTwo from '@/app/shared/(user)/auth-layout/auth-wrapper-two';
import SetPasswordForm from './set-password-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { routes } from '@/config/routes';
import { postClientRedirect, postVerifyClient } from '@/redux/slices/user/client/clientSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '@/components/ui/spinner';
import WithAuthPublic from '@/utils/public-route-user';

function MainPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const agency = searchParams.get("agency");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    dispatch(postClientRedirect({ email: email })).then((result: any) => {
      if (postClientRedirect.fulfilled.match(result)) {
        if (result && result?.payload?.success === true) {
          // console.log(result?.payload?.data?.password_required)
          setRedirect(result?.payload?.data?.password_required)
          if (!result?.payload?.data?.password_required) {
            dispatch(postVerifyClient({ email: email, agency_id: agency, redirect: true })).then((result: any) => {
              if (postVerifyClient.fulfilled.match(result)) {
                if (result && result.payload.success === true) {
                  router.replace(routes.signIn);
                } else if(result && result.payload.code === 422){
                  router.replace(routes.signIn);
                }
              }
            })
          }
        }
      }
    })
  }, [dispatch, email, agency, router])

  // useEffect(() => { redirect &&
  //     dispatch(postVerifyClient({email: email, agency_id: agency, redirect: redirect })).then((result: any) => {
  //       if (postVerifyClient.fulfilled.match(result)) {
  //         if (result && result.payload.success === true ) {
  //           router.replace(routes.signIn);
  //         } 
  //       }
  //     })
  //   }, [dispatch, router, agency, email, redirect]);

  return (
    <>
      {redirect ? (
        <AuthWrapperTwo title="Set your password" isSocialLoginActive={false}>
          <SetPasswordForm redirect={!redirect} />
        </AuthWrapperTwo>) : (
        <div className='flex justify-center items-center col-span-full mt-3'><Spinner size='xl' /></div>
      )
      }
    </>
  );
}

export default WithAuthPublic(MainPage);