"use client";
import AuthWrapperTwo from '@/app/shared/(user)/auth-layout/auth-wrapper-two';
import SetPasswordForm from './set-password-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { routes } from '@/config/routes';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Spinner from '@/components/ui/spinner';
import { verifyTeamMember } from '@/redux/slices/user/team-member/teamSlice';
import WithAuthPublic from '@/utils/public-route-user';
import { postClientRedirect } from '@/redux/slices/user/client/clientSlice';

function MainPage() {

    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const agencyId = searchParams.get("agencyId");
    const clientId = searchParams.get("clientId");
    const token = searchParams.get("token");
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
      dispatch(postClientRedirect({ email: email })).then((result: any) => {
        if (postClientRedirect.fulfilled.match(result)) {
          if (result && result?.payload?.success === true) {
            // console.log(result?.payload?.data?.password_required)
            setRedirect(result?.payload?.data?.password_required)
            if (!result?.payload?.data?.password_required) {
              dispatch(verifyTeamMember({ email: email, agency_id: agencyId, token: token, client_id: clientId, redirect: true })).then((result: any) => {
                if (verifyTeamMember.fulfilled.match(result)) {
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
    }, [dispatch, email, agencyId, router, token, clientId])
  

    // useEffect(() => { redirect &&
    //     dispatch(verifyTeamMember({email: email, agency_id: agencyId, redirect: redirect, token: token })).then((result: any) => {
    //       if (verifyTeamMember.fulfilled.match(result)) {
    //         if (result && result.payload.success === true ) {
    //           router.replace(routes.signIn);
    //         } 
    //       }
    //     })
    //   }, [dispatch, router, agencyId, email, token, redirect]);

  return (
    <>
        { redirect ? (
            <AuthWrapperTwo title="Set your password" isSocialLoginActive={false}>
                <SetPasswordForm redirect={!redirect} />
            </AuthWrapperTwo> ) : (
                <div className='flex justify-center items-center col-span-full mt-3'><Spinner size='xl' /></div>
            )
        }
    </>
  );
}

export default WithAuthPublic(MainPage)