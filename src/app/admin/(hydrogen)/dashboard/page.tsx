"use client"

import FileDashboard from '@/app/shared/file/dashboard';
import { getViewProfiles } from '@/redux/slices/admin/auth/viewprofile/viewProfileSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function FileDashboardPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getViewProfiles())

  }, [])
  return (
    <>
      <FileDashboard />
    </>
  );
}
