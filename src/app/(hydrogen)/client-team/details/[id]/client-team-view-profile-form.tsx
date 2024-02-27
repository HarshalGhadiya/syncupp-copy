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
import { getTeamMemberProfile } from '@/redux/slices/user/team-member/teamSlice';
import Spinner from '@/components/ui/spinner';
import ClientTeamActivityTablePage from './client-team-activity-details';
import { setActivityUserReferenceId } from '@/redux/slices/user/activity/activitySlice';



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
  title: 'Client Team member Details',
};

export default function ClientTeamMemberViewProfileForm(props: any) {
  const { id } = props;
  const dispatch = useDispatch();
  const signIn = useSelector((state: any) => state?.root?.signIn);
  const teamMemberData = useSelector((state: any) => state?.root?.teamMember);
  const router = useRouter();

  const [selectedTask, setSelectedTask] = useState('Activity');
  const [teamId, setTeamId] = useState('');
  const [teamName, setTeamName] = useState('');


  useEffect(() => {
    id && dispatch(getTeamMemberProfile({ _id: id })).then((result: any) => {
      if (getTeamMemberProfile.fulfilled.match(result)) {
        if (result && result.payload.success === true) {
          setTeamId(result?.payload?.data[0]?.reference_id)
          dispatch(setActivityUserReferenceId(result?.payload?.data[0]?.reference_id));
          const fullName =
            (result?.payload?.data[0]?.first_name.charAt(0).toUpperCase() + result?.payload?.data[0]?.first_name.slice(1)) +
            ' ' +
            (result?.payload?.data[0]?.last_name.charAt(0).toUpperCase() + result?.payload?.data[0]?.last_name.slice(1));
          setTeamName(fullName)
        }
      }
    })
  }, [id, dispatch]);

  let [data] = teamMemberData?.teamMemberProfile;

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
  };

  return (
    <>
      <PageHeader title={pageHeader.title}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link href={routes?.client_team}>
            <Button className="mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0">
              <FaArrowLeft className="me-1.5 h-[17px] w-[17px]" />
              Back
            </Button>
          </Link>
        </div>
      </PageHeader>

      <InformationCard title="Personal Information" data={data} />

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
            {teamId === '' && teamName === '' ? (
              <div className='p-10 flex items-center justify-center'>
                <Spinner size="xl" tag='div' />
              </div>
            ) : (
              <ClientTeamActivityTablePage teamId={teamId} teamName={teamName} />
            )}
          </div>
        )}
        {selectedTask === 'Agreement' && (
          <span>Agreement</span>
        )}
        {selectedTask === 'Invoice' && (
          <span>Invoice</span>
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
    <div className="rounded-xl border border-gray-300 p-5 ">
      <Title as="h3" className="text-base font-semibold sm:text-lg">
        {title}
      </Title>
      {title === "Personal Information" &&
        <div className='mt-3 grid items-start grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
          <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
            <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
              <span className="font-semibold text-gray-900">Name :</span>
              <span className='capitalize'>{data?.first_name ?? '-'} {data?.last_name ?? '-'}</span>
            </li>
          </ul>
          <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
            <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
              <span className="font-semibold text-gray-900">Email :</span>
              <span>{data?.email?.toLowerCase() ?? '-'}</span>
            </li>
          </ul>
          <ul className="grid gap-3 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
            <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
              <span className="font-semibold text-gray-900">Contact No :</span>
              <span>{data?.contact_number ?? '-'}</span>
            </li>
          </ul>
        </div>
      }
    </div>
  );
}



