'use client';
import PageHeader from '@/app/shared/page-header';
import { GetConatcus, cleardata } from '@/redux/slices/admin/cms/cmsSlice';
import React, { useEffect } from 'react';
import Spinner from '@/components/ui/spinner';
import { useDispatch, useSelector } from 'react-redux';

function ViewConatcus() {
  const dispatch = useDispatch();
  const termAndCondition = useSelector((state: any) => state?.root?.adminCms);
  useEffect(() => {
    dispatch(GetConatcus());
    return () => {
      dispatch(cleardata());
    };
  }, []);
  console.log(
    termAndCondition?.conatcUSdata?.data?.description,
    'termAndCondition?.conatcUSdata?.data?.description'
  );
  function removeFirstAndLastPTags(html: any) {
    // Find the index of the first occurrence of '<p>'
    const startIndex = html.indexOf('<p>');

    // Find the index of the last occurrence of '</p>'
    const endIndex = html.lastIndexOf('</p>');

    // Extract the substring without the first '<p>' and the last '</p>'
    const modifiedHtml = html.substring(startIndex + 3, endIndex);

    return modifiedHtml;
  }

  if (Object.entries(termAndCondition?.conatcUSdata).length === 0) {
    return (
      <div className="flex items-center justify-center p-10">
        <Spinner size="xl" tag="div" className="ms-3" />
      </div>
    );
  } else {
    return (
      <>
        <PageHeader title="Conatct Us" />
        <div
          dangerouslySetInnerHTML={{
            __html: termAndCondition?.conatcUSdata?.data?.description,
          }}
        />
      </>
    );
  }
}

export default ViewConatcus;
