'use client';

import { RefObject, useEffect, useState } from 'react';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Popover } from '@/components/ui/popover';
import { Title } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

import { useMedia } from '@/hooks/use-media';
import SimpleBar from '@/components/ui/simplebar';
import { PiCheck } from 'react-icons/pi';
import { useDispatch } from 'react-redux';
import {
  clearData,
  getAllnotification,
  readnotification,
  receiveNotification,
} from '@/redux/slices/soket/notification/notificationSlice';
import { useSelector } from 'react-redux';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { useRouter } from 'next/navigation';
import ViewTaskForm from '@/app/shared/(user)/task/create-edit/view-task-form';
import { routes } from '@/config/routes';
import Spinner from '@/components/ui/spinner';
import Link from 'next/link';
import { Button } from 'rizzui';

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

export default function Notificationpage() {
  const notification = useSelector((state: any) => state?.root?.notification);
  const signIn = useSelector((state: any) => state?.root?.signIn);
  const { loading } = useSelector((state: any) => state?.root?.notification);
  const [payload, setPalyload] = useState({
    skip: 0,
    limit: 5,
  });
  const [updatedData, setUpdateddata] = useState<any[]>([]);
  const [viewmoreLoader, setViewMoreloader] = useState(false);
  const { closeModal, openModal } = useModal();
  const router = useRouter();
  //const dispatch = useDispatch();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllnotification(payload)).then((result: any) => {
      if (result && result.payload?.data?.notificationList) {
        setViewMoreloader(false);
        setUpdateddata([
          ...updatedData,
          ...result?.payload?.data.notificationList,
        ]);
      }
    });
  }, [payload]);
  //redirect routes and open popup
  const handleNotificationClick = (item: any) => {
    //read notification
    dispatch(readnotification({ notification_id: item._id }));
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
  };
  const allnotification = async () => {
    const res = await dispatch(readnotification({ notification_id: 'all' }));
    if (res?.payload?.success === true) {
      dispatch(getAllnotification(payload));
    }
  };
  const viewAllActivity = () => {
    setViewMoreloader(true);
    setPalyload({
      ...payload,
      skip: payload.skip + 5,
    });
  };
  //api call
  if (loading && payload.skip == 0) {
    return (
      <div className="flex items-center justify-center p-10">
        <Spinner size="xl" tag="div" className="ms-3" />
      </div>
    );
  } else {
    return (
      <div className="w-full text-left  rtl:text-right">
        <div className="mb-3 flex items-center justify-between ps-6">
          <Title as="h5">Notifications</Title>
          <Checkbox label="Mark All As Read" onChange={allnotification} />
        </div>
        <SimpleBar className="max-h-[420px]">
          <div className="grid cursor-pointer grid-cols-1 gap-1 ps-4">
            {updatedData?.map((item: any) => (
              <div
                key={item?.name + item?.id}
                className="group grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-md px-2 py-2 pe-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-50"
                onClick={() => handleNotificationClick(item)}
              >
                {/* <div className="flex h-9 w-9 items-center justify-center rounded bg-gray-100/70 p-1 dark:bg-gray-50/50 [&>svg]:h-auto [&>svg]:w-5">
                {item.icon}
              </div> */}
                <div className="contents grid-cols-[minmax(0,1fr)_auto] items-center">
                  <div className="w-full">
                    <Title
                      as="h6"
                      className={`mb-0.5 truncate text-sm hover:underline ${
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
          href={'#'}
          onClick={viewAllActivity}
          className="-me-6 block px-6 pb-0.5 pt-3 text-center hover:underline"
        >
          <div className="flex">
            Load more
            {viewmoreLoader && <Spinner size="sm" tag="div" className="ms-3" />}
          </div>
        </Link>
        {/* <Link
          href={'#'}
          onClick={viewAllActivity}
          className="-me-6 block px-6 pb-0.5 pt-3 text-center hover:underline"
        >
          <div className="flex">
            Load more
            {loading && <Spinner size="sm" tag="div" className="ms-3" />}
          </div>
        </Link> */}
      </div>
    );
  }
}
