'use client';

import { RefObject, useEffect, useState } from 'react';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Popover } from '@/components/ui/popover';
import { Title } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import TruckSolidIcon from '@/components/icons/truck-solid';
import BrushSolidIcon from '@/components/icons/brush-solid';
import CubeSolidIcon from '@/components/icons/cube-solid';
import FileStackIcon from '@/components/icons/file-stack';
import CloudTaskIcon from '@/components/icons/cloud-task';
import ShoppingBagSolidIcon from '@/components/icons/shopping-bag-solid';
import BulbSolidIcon from '@/components/icons/bulb-solid';
import ParcelMapIcon from '@/components/icons/parcel-map';
import Link from 'next/link';
import { useMedia } from '@/hooks/use-media';
import SimpleBar from '@/components/ui/simplebar';
import { PiCheck } from 'react-icons/pi';
import { useDispatch } from 'react-redux';
import {
  clearData,
  getAllnotification,
  readnotification,
} from '@/redux/slices/soket/notification/notificationSlice';
import { useSelector } from 'react-redux';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { useRouter } from 'next/navigation';
import ViewTaskForm from '@/app/shared/(user)/task/create-edit/view-task-form';
import { routes } from '@/config/routes';
import Spinner from '@/components/ui/spinner';

dayjs.extend(relativeTime);

// const data = [
//   {
//     id: 1,
//     name: 'Invitation for crafting engaging designs',
//     icon: <BrushSolidIcon />,
//     unRead: true,
//     sendTime: '2023-06-01T09:35:31.820Z',
//   },
//   {
//     id: 2,
//     name: 'Isomorphic dashboard redesign',
//     icon: <CubeSolidIcon />,
//     unRead: true,
//     sendTime: '2023-05-30T09:35:31.820Z',
//   },
//   {
//     id: 3,
//     name: '3 New Incoming Project Files:',
//     icon: <FileStackIcon />,
//     unRead: false,
//     sendTime: '2023-06-01T09:35:31.820Z',
//   },
//   {
//     id: 4,
//     name: 'Swornak purchased isomorphic',
//     icon: <ShoppingBagSolidIcon />,
//     unRead: false,
//     sendTime: '2023-05-21T09:35:31.820Z',
//   },
//   {
//     id: 5,
//     name: 'Task #45890 merged with #45890 in “Ads Pro Admin Dashboard project:',
//     icon: <CloudTaskIcon />,
//     unRead: true,
//     sendTime: '2023-06-01T09:35:31.820Z',
//   },
//   {
//     id: 6,
//     name: '3 new application design concepts added',
//     icon: <BulbSolidIcon />,
//     unRead: true,
//     sendTime: '2023-05-15T09:35:31.820Z',
//   },
//   {
//     id: 7,
//     name: 'Your order has been placed',
//     icon: <ParcelMapIcon />,
//     unRead: false,
//     sendTime: '2023-05-16T09:35:31.820Z',
//   },
//   {
//     name: 'Order has been shipped to #123221',
//     icon: <TruckSolidIcon />,
//     unRead: false,
//     sendTime: '2023-05-01T09:35:31.820Z',
//   },
// ];

function NotificationsList({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const notification = useSelector((state: any) => state?.root?.notification);
  const { loading } = useSelector((state: any) => state?.root?.notification);
  const signIn = useSelector((state: any) => state?.root?.signIn);
  const { closeModal, openModal } = useModal();
  const router = useRouter();
  const [payload, setPalyload] = useState({
    skip: 0,
    limit: 5,
  });
  //const dispatch = useDispatch();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllnotification(payload));
  }, [payload]);
  //redirect routes and open popup
  const handleNotificationClick = async (item: any) => {
    //read notification
    const res = await dispatch(readnotification({ notification_id: item._id }));
    if (res?.payload?.success === true) {
      dispatch(getAllnotification(payload));
    }
    const data = {
      _id: item?.data_reference_id,
    };
    switch (item.type) {
      case 'activity':
        router.push(routes.userCalendar);
        setTimeout(() => {
          openModal({
            view: <ViewTaskForm data={data} />,
          });
        }, 2000);
        break;
      case 'task':
        router.push(routes.task);
        setTimeout(() => {
          openModal({
            view: <ViewTaskForm data={data} />,
          });
        }, 2000);
        break;
      case 'other':
        router.push(routes.userCalendar);
        setTimeout(() => {
          openModal({
            view: <ViewTaskForm data={data} />,
          });
        }, 2000);
        break;

      default:
        '';
    }
    setIsOpen(false);
  };
  const allnotification = async () => {
    const res = await dispatch(readnotification({ notification_id: 'all' }));
    if (res?.payload?.success === true) {
      dispatch(getAllnotification(payload));
    }
  };
  const viewAllActivity = () => {
    setIsOpen(false);
    router.push(routes.notification);
  };
  //api call
  if (loading) {
    return (
      <div className="flex items-center justify-center p-10">
        <Spinner size="xl" tag="div" className="ms-3" />
      </div>
    );
  } else {
    return (
      <div className="w-[320px] text-left sm:w-[360px] 2xl:w-[420px] rtl:text-right">
        <div className="mb-3 flex items-center justify-between ps-6">
          <Title as="h5">Notifications</Title>
          <Checkbox label="Mark All As Read" onChange={allnotification} />
        </div>
        <SimpleBar className="max-h-[420px]">
          <div className="grid cursor-pointer grid-cols-1 gap-1 ps-4">
            {notification &&
              notification?.notification &&
              notification?.notification?.map((item: any) => (
                <div
                  key={item?.name + item?.id}
                  className="group grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-md px-2 py-2 pe-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-50"
                  onClick={() => handleNotificationClick(item)}
                >
                  {/* <div className="flex h-9 w-9 items-center justify-center rounded bg-gray-100/70 p-1 dark:bg-gray-50/50 [&>svg]:h-auto [&>svg]:w-5">
                {item.icon}
              </div> */}
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center">
                    <div className="w-full">
                      <Title
                        as="h6"
                        className={`mb-0.5 w-11/12 truncate text-sm ${
                          item?.is_read ? 'font-normal' : 'font-semibold'
                        }`}
                      >
                        {item?.message}
                      </Title>
                      <span className="ms-auto whitespace-nowrap pe-8 text-xs text-gray-500">
                        {/* @ts-ignore */}
                        {dayjs(item?.createdAt).fromNow(true)}
                      </span>
                    </div>
                    <div className="ms-auto flex-shrink-0">
                      {item?.is_read ? (
                        <Badge
                          renderAsDot
                          size="lg"
                          color="primary"
                          className="scale-90"
                        />
                      ) : (
                        <span className="inline-block rounded-full bg-gray-100 p-0.5 dark:bg-gray-50">
                          <PiCheck className="h-auto w-[9px]" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </SimpleBar>
        <Link
          href={routes.notification}
          onClick={() => setIsOpen(false)}
          className="-me-6 block px-6 pb-0.5 pt-3 text-center hover:underline"
        >
          View All Activity
        </Link>
      </div>
    );
  }
}

export default function NotificationDropdown({
  children,
}: {
  children: JSX.Element & { ref?: RefObject<any> };
}) {
  const isMobile = useMedia('(max-width: 480px)', false);
  const [isOpen, setIsOpen] = useState(false);
  const [payload, setPalyload] = useState({
    skip: 0,
    limit: 5,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllnotification(payload));
  }, [payload]);
  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => <NotificationsList setIsOpen={setIsOpen} />}
      shadow="sm"
      placement={isMobile ? 'bottom' : 'bottom-end'}
      className="z-50 px-0 pb-4 pe-6 pt-5 dark:bg-gray-100 [&>svg]:hidden [&>svg]:dark:fill-gray-100 sm:[&>svg]:inline-flex"
    >
      {children}
    </Popover>
  );
}
