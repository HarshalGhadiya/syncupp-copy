"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/spinner';
import { routes } from '@/config/routes';

const WithAuth = (WrappedComponent: any) => {
  const AuthComponent = (props: any) => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);

    const token = localStorage.getItem('token');
    useEffect(() => {
      if (!token) {
        router.replace(routes.admin.signIn);
      } else {
        setLoading(false);
      }
    }, [token , router]);

    if (isLoading) {
      return <div className='flex justify-center items-center col-span-full mt-3'><Spinner size='xl' /></div>;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default WithAuth;