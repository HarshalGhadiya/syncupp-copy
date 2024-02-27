'use client';

import SelectLoader from '@/components/loader/select-loader';
import dynamic from 'next/dynamic';
import { Input } from '@/components/ui/input';
import { Controller, useFormContext } from 'react-hook-form';
import { handleKeyDown } from '@/utils/common-functions';
import useMedia from 'react-use/lib/useMedia';

const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const peopleCountOptions = [
  { name: '1-50', value: '1-50' },
  { name: '51-200', value: '51-200' },
  { name: '201-500', value: '201-500' },
  { name: '501-1000', value: '501-1000' },
]
const industryOptions = [
  { name: 'IT', value: 'IT' },
  { name: 'Marketing', value: 'Marketing' },
  { name: 'Digital Marketing', value: 'Digital Marketing' },
]

export default function CompanyDetailsForm(props: any) {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const { fdata, setFdata } = props;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFdata({
      ...fdata,
      [event.target.name]: event.target.value
    });
  };
  const peopleCountChange = (selectedOption: string) => {
    setFdata({
      ...fdata,
      peopleCount: selectedOption
    });
  };
  const industryChange = (selectedOption: string) => {
    setFdata({
      ...fdata,
      industry: selectedOption
    });
  };
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  
  return (
    <>
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:gap-5 xl:pb-2">
          <Input
            onKeyDown={handleKeyDown}
            type="text"
            label="Company Name *"
            placeholder="Enter Company Name"
            rounded="pill"
            size={isMedium ? 'lg' : 'xl'}
            color="info"
            className="[&>label>span]:font-medium"
            {...register('companyName', { onChange: (e: any)=> handleChange(e)})}
            error={errors.companyName?.message as string}
          />
          <Input
            onKeyDown={handleKeyDown}
            type="text"
            label="Company Website *"
            placeholder="Enter Website URL"
            rounded="pill"
            size={isMedium ? 'lg' : 'xl'}
            color="info"
            className="[&>label>span]:font-medium"
            {...register('companyWebsite', { onChange: (e: any)=> handleChange(e)})}
            error={errors?.companyWebsite?.message as string}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:gap-5 xl:pb-1">
          <Controller
            control={control}
            name="peopleCount"
            render={({ field: { onChange, value } }) => (
              <Select
                options={peopleCountOptions}
                onChange={(selectedOption: string) => {
                  onChange(selectedOption);
                  peopleCountChange(selectedOption);
                }}
                value={value}
                label="How many people *"
                rounded="pill"
                color="info"
                size={isMedium ? 'lg' : 'xl'}
                getOptionValue={(option) => option.value}
                dropdownClassName="p-1 border w-12 border-gray-100 shadow-lg"
                className="font-medium"
                error={errors?.peopleCount?.message as string}
              />
            )}
          />
          <Controller
            control={control}
            name="industry"
            render={({ field: { onChange, value } }) => (
              <Select
                options={industryOptions}
                onChange={(selectedOption: string) => {
                  onChange(selectedOption);
                  industryChange(selectedOption);
                }}
                value={value}
                label="Industry *"
                size={isMedium ? 'lg' : 'xl'}
                rounded="pill"
                color="info"
                getOptionValue={(option) => option.value}
                dropdownClassName="p-1 border w-12 border-gray-100 shadow-lg"
                className="font-medium"
                error={errors?.industry?.message as string}
              />
            )}
          />
        </div>
      </div>
    </>
  );
}
