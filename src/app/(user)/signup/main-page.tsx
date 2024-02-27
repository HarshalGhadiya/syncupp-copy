'use client';
import SignUpForm from './sign-up-form';
import { useEffect, useState } from 'react';
import CompanyForm from './company-form';
import AuthWrapperTwo from '@/app/shared/(user)/auth-layout/auth-wrapper-two';
import WithAuthPublic from '@/utils/public-route-user';

function SignUpPage() {

  const [formData, setFormData] = useState({});
  const [title, setTitle] = useState('Sign Up');
  const [nextBtn, setNextBtn] = useState(false);
  const [fdata, setFdata] = useState({})


  // useEffect(() => {
  //   if (true) {
  //     window.location.href = "/signin"
  //   }
  // }, [])


  return (
    <>
      {nextBtn ?
        <AuthWrapperTwo title={title} isSocialLoginActive={false}>
          <CompanyForm signUpFormData={formData} fdata={fdata} setFdata={setFdata} setNextBtn={setNextBtn} setTitle={setTitle} />
        </AuthWrapperTwo> :
        <AuthWrapperTwo title={title} isSocialLoginActive={true}>
          <SignUpForm setFormData={setFormData} setNextBtn={setNextBtn} setTitle={setTitle} formData={formData} />
        </AuthWrapperTwo>
      }
    </>
  );
}


export default WithAuthPublic(SignUpPage);
