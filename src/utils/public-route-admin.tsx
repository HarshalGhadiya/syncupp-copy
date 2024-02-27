'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/spinner';
import { routes } from '@/config/routes';

const WithAuthPublic = (WrappedComponent: any) => {
  const AuthComponent = (props: any) => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    useEffect(() => {
      if (token) {
        router.replace('/admin/dashboard');
      } else {
        setLoading(false);
      }
    }, [token , router]);

    if (isLoading) {
      return (
        <div className="col-span-full mt-3 flex items-center justify-center">
          <Spinner size="xl" />
        </div>
      );
    }
    return <WrappedComponent {...props} />;
  };
  return AuthComponent;
};

export default WithAuthPublic;
