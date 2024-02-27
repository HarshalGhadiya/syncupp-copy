'use client';

import FileStats from '@/app/shared/file/dashboard/file-stats';
import { getUserProfile } from '@/redux/slices/user/auth/signinSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function FileDashboard() {

  return (
    <div className="mt-2 @container">
      <FileStats className="mb-5 2xl:mb-8" />
    </div>
  );
}
