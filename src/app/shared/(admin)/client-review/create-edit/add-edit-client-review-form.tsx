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
import { useEffect, useRef, useState } from 'react';
import { Textarea } from 'rizzui';
import {
  ClientReviewSchema,
  clientReviewSchema,
} from '@/utils/validators/client-review.schema copy';
import {
  getAllClientReview,
  getClientReviewDataByID,
  postClientReviewEnroll,
  updateClientReviewDataByID,
} from '@/redux/slices/admin/clientReview/clientReviewSlice';
import UploadIcon from '@/components/shape/upload';
import { handleKeyDown } from '@/utils/common-functions';

const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});

export default function AddClientReviewForm(props: any) {
  const { title, row } = props;
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const adminClientReview = useSelector(
    (state: any) => state?.root?.adminClientReview
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isImageDeleted, setIsImageDeleted] = useState(false);
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file && !['image/jpeg', 'image/png'].includes(file.type)) {
      alert('Please upload only JPEG or PNG files.');
      return;
    }
    if (file && file.size > 2 * 1024 * 1024) {
      alert('File size exceeds 2MB limit. Please choose a smaller file.');
      return;
    }
    setSelectedFile(file || null);
    setIsImageDeleted(false)
    // image Preview
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const previewUrl = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  const handleClickUpload = () => {
    inputRef.current?.click(); // Use optional chaining to safely access inputRef.current
  };
  const handleDeleteImage = () => {
    setSelectedFile(null);
    
  }

  useEffect(() => {
    row && dispatch(getClientReviewDataByID({ _id: row?._id }));
  }, [row, dispatch]);


  let data = adminClientReview?.clientReviewData;

  let defaultValuess = {
    client_review_image: data?.client_review_image,
    customer_name: data?.customer_name,
    company_name: data?.company_name,
    review: data?.review,
  };


  const onSubmit: SubmitHandler<ClientReviewSchema> = (data) => {
    try {
      let formData: any = new FormData();
      if (title === 'Add Client Review' ||  title === 'Edit Client Review') {
        formData.append('client_review_image', selectedFile);
      }
      formData.append('customer_name', data.customer_name);
      formData.append('company_name', data.company_name);
      formData.append('review', data.review);
      if (title === 'Client Review') {
        dispatch(postClientReviewEnroll(formData)).then((result: any) => {
          if (postClientReviewEnroll.fulfilled.match(result)) {
            if (result && result.payload.success === true) {
            }
          }
        })
        .finally(() => {
          closeModal();
          dispatch(getAllClientReview(data));
      });
      } else {
        let d = {
          id: row._id,
          formData,
        };
        dispatch(updateClientReviewDataByID(d)).then((result: any) => {
          if (updateClientReviewDataByID.fulfilled.match(result)) {
            if (result && result.payload.success === true) {
            }
          }
        })
        .finally(() => {
          closeModal();
          dispatch(getAllClientReview(data));
      });
      }
    } catch (error) {
      // console.log(error);
    }
  };

  if (!adminClientReview?.clientReviewData && title === 'Edit Client Review') {
    return (
      <div className="flex items-center justify-center p-10">
        <Spinner size="xl" tag="div" className="ms-3" />
      </div>
    );
  } else {
    return (
      <>
        <Form<ClientReviewSchema>
          validationSchema={clientReviewSchema}
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
              <div className={cn('grid grid-cols-1 gap-4')}>
                <Input
                  onKeyDown={handleKeyDown}
                  type="text"
                  label="Customer Name"
                  placeholder="Enter Customer Name here....."
                  color="info"
                  className="[&>label>span]:font-medium"
                  {...register('customer_name')}
                  error={errors?.customer_name?.message}
                />
                <Input
                  onKeyDown={handleKeyDown}
                  type="text"
                  label="Company Name"
                  placeholder="Enter Customer Name here....."
                  color="info"
                  className="[&>label>span]:font-medium"
                  {...register('company_name')}
                  error={errors?.company_name?.message}
                />
              </div>
              <div>
                <Textarea
                  onKeyDown={handleKeyDown}
                  label="Review"
                  placeholder="Describe your Content Here..."
                  color="info"
                  className="[&>label>span]:font-medium"
                  {...register('review')}
                  error={errors?.review?.message}
                />
              </div>
              <div className="flex gap-10">
                <div
                  className="relative flex h-20  w-20 cursor-pointer flex-col items-center justify-center gap-2 rounded-full border-[1.8px]"
                  onClick={handleClickUpload}
                >
                  <UploadIcon className="size-6"></UploadIcon>
                  <p className="pt-1 text-center text-xs ">
                    Select or drag file{' '}
                  </p>
                </div>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".jpeg, .jpg, .png"
                  style={{ display: 'none' }}
                  ref={inputRef}
                />
                {/*preview Image*/}
                {selectedFile ? (
                  <div className="flex gap-2">
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '10px',
                      }}
                    />
                    {/* <PiTrashFill className="h-[18px] w-[18px] cursor-pointer"onClick={handleDeleteImage}  /> */}
                  </div>
                ) : null}
                {title === 'Edit Client Review' &&
                data?.client_review_image &&
                !selectedFile ? (
                  <div className="flex gap-2">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API}${data?.client_review_image}`}
                      alt="Preview"
                      style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '10px',
                      }}
                    />
                    {/* <PiTrashFill className="h-[18px] w-[18px] cursor-pointer" onClick={handleDeleteImage}/> */}
                  </div>
                ) : null}
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
                      disabled={adminClientReview?.loading}
                    >
                      Save
                      {adminClientReview?.loading && (
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
