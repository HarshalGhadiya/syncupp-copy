'use client';

import { Title } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '@/components/ui/spinner';
import { useModal } from '@/app/shared/modal-views/use-modal';
import cn from '@/utils/class-names';
import { Input } from '@/components/ui/input';
import {
  TermsAndConditionSchema,
  termsAndConditionSchema,
} from '@/utils/validators/terms-condition.schema';
import QuillEditor from '@/components/ui/quill-editor';
import {
  EditAboutUs,
  GetAboutUS,
  cleardata,
  postAddTermAndCondition,
} from '@/redux/slices/admin/cms/cmsSlice';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';
import {
  ckeditorsSchema,
  CkeditorSchema,
} from '@/utils/validators/cmsckeditor.schema';
import Link from 'next/link';

const initialValues: CkeditorSchema = {
  description: '',
};

export default function CmsAboutUs() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { closeModal } = useModal();
  const [formdata, setformData] = useState({
    description: '',
  });

  const termAndCondition = useSelector((state: any) => state?.root?.adminCms);

  const onSubmit: SubmitHandler<CkeditorSchema> = (data) => {
    console.log(data, 'data');
    const formData = {
      description: data?.description,
    };
    dispatch(EditAboutUs(formData)).then((result: any) => {
      if (EditAboutUs.fulfilled.match(result)) {
        if (result && result.payload.success === true) {
          router.replace(routes.admin.cms);
          closeModal();
        }
      }
    });
  };
  const initialValues: CkeditorSchema = {
    description:
      termAndCondition &&
      termAndCondition.conatcUSdata &&
      termAndCondition?.conatcUSdata?.data
        ? termAndCondition?.conatcUSdata?.data?.description
        : '',
  };
  useEffect(() => {
    dispatch(GetAboutUS());
    return () => {
      dispatch(cleardata());
    };
  }, []);

  if (!termAndCondition?.conatcUSdata) {
    return (
      <div className="flex items-center justify-center p-10">
        <Spinner size="xl" tag="div" className="ms-3" />
      </div>
    );
  } else {
    return (
      <>
        <Form<CkeditorSchema>
          validationSchema={ckeditorsSchema}
          onSubmit={onSubmit}
          useFormProps={{
            defaultValues: initialValues,
            mode: 'all',
          }}
          className=" p-10 [&_label]:font-medium"
        >
          {({ register, control, formState: { errors } }) => (
            console.log(errors),
            (
              <div className="space-y-5">
                <div className="mb-6 flex items-center justify-between">
                  <Title as="h3" className="text-xl xl:text-2xl">
                    About Us
                  </Title>
                </div>
                <Controller
                  control={control}
                  name="description"
                  render={({ field: { onChange, value } }) => (
                    <QuillEditor
                      value={value}
                      onChange={onChange}
                      label="Description"
                      className="col-span-full [&_.ql-editor]:min-h-[20rem]"
                      labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    />
                  )}
                />
                <p className="text-red-700">{errors.description?.message}</p>
                <div className={cn('float-end grid grid-cols-2 gap-4 pt-5')}>
                  <Link href={routes.admin.cms}>
                    <Button
                      variant="outline"
                      className="@xl:w-auto dark:hover:border-gray-400"
                    >
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    className="hover:gray-700 @xl:w-auto dark:bg-gray-200 dark:text-white"
                    disabled={termAndCondition.loading}
                  >
                    Save
                    {termAndCondition.loading && (
                      <Spinner size="sm" tag="div" className="ms-3" />
                    )}
                  </Button>
                </div>
              </div>
            )
          )}
        </Form>
      </>
    );
  }
}
