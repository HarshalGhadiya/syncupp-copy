'use client';

import { Title, ActionIcon } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '@/components/ui/spinner';
import { useModal } from '@/app/shared/modal-views/use-modal';
import cn from '@/utils/class-names';
import { PiXBold } from 'react-icons/pi';
import { Input } from '@/components/ui/input';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import { useEffect } from 'react';
import { FaqSchema, faqSchema } from '@/utils/validators/faq.schema';
import { Textarea } from 'rizzui';
import { getAllFaq, getFaqDataByID, postAddFaq, updateFaqDataByID } from '@/redux/slices/admin/faq/faqSlice';
import { handleKeyDown } from '@/utils/common-functions';

const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});


export default function AddFaqForm(props: any) {

  const { title, row } = props;
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const adminFaq = useSelector((state: any) => state?.root?.adminFaq);
  
  // let data = row;
  let initialValues: FaqSchema = {
    title: "",
    description: "",
  }; 

  useEffect(() => {
    row && dispatch(getFaqDataByID({ _id: row?._id }))
  }, [row, dispatch]); 

  let data = adminFaq?.faqData;
  
  let defaultValuess = {
    title: data?.title,
    description: data?.description,
  };

  const onSubmit: SubmitHandler<FaqSchema> = (data) => {

    const filteredFormData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined && value !== '')
    );

    if(title === 'FAQ') {
        dispatch(postAddFaq(filteredFormData)).then((result: any) => {
          if(postAddFaq.fulfilled.match(result)) {
            if (result && result.payload.success === true) {
              closeModal();
              dispatch(getAllFaq({ sortField: 'title', sortOrder: 'desc' }));
            }
          }
        });
    } else {
      dispatch(updateFaqDataByID({...filteredFormData,_id:row._id})).then((result: any) => {
        if(updateFaqDataByID.fulfilled.match(result)) {
          if (result && result.payload.success === true) {
            closeModal();  
            dispatch(getAllFaq({ sortField: 'title', sortOrder: 'desc' }));
          }
        }
      });
    }
  };
  
  if(!adminFaq?.faqData && title === 'Edit FAQ') {
    return (
      <div className='p-10 flex items-center justify-center'>
        <Spinner size="xl" tag='div' className='ms-3' />
      </div>
    )
  } else {
  return (
    <>
      <Form<FaqSchema>
        validationSchema={faqSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'all',
          defaultValues: defaultValuess,
        }}
        className=" p-10 [&_label]:font-medium"
      >
        {({ register, control, formState: { errors }, setValue }) => (
          <div className="space-y-5">
            <div className="mb-6 flex items-center justify-between">
              <Title as="h3" className="text-xl xl:text-2xl">
                {title}
              </Title>
              <ActionIcon
                size="sm"
                variant="text"
                onClick={() => closeModal()}
                className="p-0 text-gray-500 hover:!text-gray-900"
              >
                <PiXBold className="h-[18px] w-[18px]" />
              </ActionIcon>
            </div>
            <div
              className={cn(
                'grid grid-cols-1 gap-4'
              )}
            >
              <Input
                onKeyDown={handleKeyDown}
                type="text"
                label="Title"
                placeholder="Enter your Title here....."
                color="info"
                className="[&>label>span]:font-medium"
                {...register('title')}
                error={errors?.title?.message}
              />
            </div>
            <div>
              <Textarea
                label="Description"
                placeholder="Describe your Content Here..."
                color="info"
                className="[&>label>span]:font-medium"
                {...register('description')}
                error={errors?.description?.message}
              />
            </div>
            <div>
              <div className={cn('grid grid-cols-2 gap-2 pt-5')}>
                <div>
                  <Button
                    variant="outline"
                    className="@xl:w-auto dark:hover:border-gray-400"
                    onClick={() => closeModal()}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="hover:gray-700 ms-3 @xl:w-auto dark:bg-gray-200 dark:text-white"
                    disabled={adminFaq?.loading}
                  >
                    Save
                    {adminFaq?.loading && (
                        <Spinner
                          size="sm"
                          tag="div"
                          className="ms-3"
                          color="white"
                        />
                      )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Form>
    </>
  );
  }
}
