'use client';

import { Title, Text } from '@/components/ui/text';
import cn from '@/utils/class-names';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
// import { Link } from 'react-scroll';
import Link from 'next/link';
import { Button } from 'rizzui';
import { routes } from '@/config/routes';
import { FaArrowLeft } from 'react-icons/fa';
import PageHeader from '@/app/shared/page-header';
import { getClientById } from '@/redux/slices/user/client/clientSlice';
import ClientActivityTablePage from './client-activity-details';
import Spinner from '@/components/ui/spinner';
import ClientAgreementTablePage from './client-agreement-details';
import { setActivityUserReferenceId } from '@/redux/slices/user/activity/activitySlice';
import ClientInvoiceTablePage from './client-invoice-details';



const menuItems = [
  {
    label: 'Activity',
  },
  {
    label: 'Agreement',
  },
  {
    label: 'Invoice',
  },
];


const pageHeader = {
  title: 'Client Details',
};

export default function ClientViewProfileForm(props: any) {
  const { id } = props;
  const dispatch = useDispatch();
  const signIn = useSelector((state: any) => state?.root?.signIn);
  const clientSliceData = useSelector((state: any) => state?.root?.client);
  const router = useRouter();

  const [selectedTask, setSelectedTask] = useState('Activity');
  const [clientId, setClientId] = useState('');
  const [clientName, setClientName] = useState('');
  // console.log("client name...", clientName)


  useEffect(() => {
    id && dispatch(getClientById({ clientId: id })).then((result: any) => {
      if (getClientById.fulfilled.match(result)) {
        if (result && result.payload.success === true) {
          setClientId(result?.payload?.data?.reference_id)
          dispatch(setActivityUserReferenceId(result?.payload?.data?.reference_id));
          const fullName =
            (result?.payload?.data?.first_name.charAt(0).toUpperCase() + result?.payload?.data?.first_name.slice(1)) +
            ' ' +
            (result?.payload?.data?.last_name.charAt(0).toUpperCase() + result?.payload?.data?.last_name.slice(1));
          setClientName(fullName)
        }
      }
    })
  }, [id, dispatch]);

  let data = clientSliceData?.clientProfile;

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
  };

  return (
    <>
      <PageHeader title={pageHeader.title}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link href={routes.client}>
            <Button className="mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0">
              <FaArrowLeft className="me-1.5 h-[17px] w-[17px]" />
              Back
            </Button>
          </Link>
        </div>
      </PageHeader>

      <div className={cn('grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 @3xl:gap-10')}>
        <InformationCard title="Personal Information" data={data} />
        <InformationCard title="Company Information" data={data} />
        <InformationCard title="General Information" data={data} />
      </div>

      <div className='border-b-[1px] mt-8'>
        {menuItems.map((menu, index) => (
          <Button
            key={index}
            className={cn(
              'group relative cursor-pointer whitespace-nowrap py-2.5 font-medium text-gray-500 before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0.5  before:bg-gray-1000 before:transition-all hover:text-gray-900',
              menu.label === selectedTask
                ? 'before:visible before:w-full before:opacity-100'
                : 'before:invisible before:w-0 before:opacity-0'
            )}
            variant='text'
            // disabled={menu.label !== selectedTask}
            onClick={() => handleTaskClick(menu.label)}
          >
            <Text
              as="span"
              className={cn(
                "inline-flex rounded-md px-2.5 py-1.5 transition-all duration-200 group-hover:bg-gray-100/70",
                menu.label === selectedTask && 'text-black'
              )}
            >
              {menu.label}
            </Text>
          </Button>
        ))}
      </div>
      <div className="mt-3">
        {selectedTask === 'Activity' && (
          <div>
            {clientId === '' && clientName === '' ? (
              <div className='p-10 flex items-center justify-center'>
                <Spinner size="xl" tag='div' />
              </div>
            ) : (
              <ClientActivityTablePage clientId={clientId} clientName={clientName} />
            )}
          </div>
        )}
        {selectedTask === 'Agreement' && (
          <ClientAgreementTablePage />
        )}
        {selectedTask === 'Invoice' && (
          <ClientInvoiceTablePage />
        )}
      </div>
    </>
  );
}


function InformationCard({
  title,
  className,
  data,
}: {
  title: string;
  className?: string;
  data?: any;
}) {
  return (
    <div
      className={cn(
        'rounded-lg border border-gray-300 p-5 @3xl:p-7 ',
        className
      )}
    >
      <Title as="h3" className="text-base font-semibold sm:text-lg">
        {title}
      </Title>
      {title === "Personal Information" &&
        <ul className="mt-4 grid gap-3 @3xl:mt-5">
          <li className="flex items-center gap-1">
            <span className="font-semibold text-gray-900">Name :</span>
            <span className='capitalize'>{data?.first_name ?? '-'} {data?.last_name ?? '-'}</span>
          </li>
          <li className="flex items-center gap-1">
            <span className="font-semibold text-gray-900">Email :</span>
            <span>{data?.email?.toLowerCase() ?? '-'}</span>
          </li>
          <li className="flex items-center gap-1">
            <span className="font-semibold text-gray-900">Contact No :</span>
            <span>{data?.contact_number ?? '-'}</span>
          </li>
        </ul>
      }
      {title === "Company Information" &&
        <ul className="mt-4 grid gap-3 @3xl:mt-5">
          <li className="flex items-center gap-1">
            <span className="font-semibold text-gray-900">Name :</span>
            <span className='capitalize'>{data?.client?.company_name ?? '-'}</span>
          </li>
          <li className="flex items-center gap-1">
            <span className="font-semibold text-gray-900">URL&nbsp;:</span>
            <span className=' w-[15rem] truncate'>
              <a href={data?.client?.company_website ?? '-'} target='_blank' >{data?.client?.company_website ?? '-'}</a>
            </span>
          </li>
          <li className="flex items-center gap-1">
            <span className="font-semibold text-gray-900">Industry :</span>
            <span>{data?.client?.industry ?? '-'}</span>
          </li>
          <li className="flex items-center gap-1">
            <span className="font-semibold text-gray-900">Employee :</span>
            <span>{data?.client?.no_of_people ?? '-'}</span>
          </li>
        </ul>
      }
      {title === "General Information" &&
        <ul className="mt-4 grid gap-3 @3xl:mt-5">
          <li className="flex items-center gap-1">
            <span className="font-semibold text-gray-900">Address :</span>
            <span>{data?.client?.address ?? '-'}</span>
          </li>
          <li className="flex items-center gap-1">
            <span className="font-semibold text-gray-900">City :</span>
            <span>{data?.client?.city?.name ?? '-'}</span>
          </li>
          <li className="flex items-center gap-1">
            <span className="font-semibold text-gray-900">State :</span>
            <span>{data?.client?.state?.name ?? '-'}</span>
          </li>
          <li className="flex items-center gap-1">
            <span className="font-semibold text-gray-900">Country :</span>
            <span>{data?.client?.country?.name ?? '-'}</span>
          </li>
          <li className="flex items-center gap-1">
            <span className="font-semibold text-gray-900">Pincode :</span>
            <span>{data?.client?.pincode ?? '-'}</span>
          </li>
        </ul>
      }
    </div>
  );
}



