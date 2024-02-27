"use client";
import { ActionIcon } from '@/components/ui/action-icon';
import { Button } from '@/components/ui/button';
import { Popover } from '@/components/ui/popover';
import { Title, Text } from '@/components/ui/text';
import { PiDotsThreeOutlineVerticalFill, PiMapPin, PiXBold } from "react-icons/pi";
import { BsPersonFill } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { Tooltip } from '@/components/ui/tooltip';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { Badge } from 'rizzui';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTask, getTaskById, putTaskStatusChange } from '@/redux/slices/user/task/taskSlice';
import moment from 'moment';
import { useEffect } from 'react';
import Spinner from '@/components/ui/spinner';


export default function ViewTaskForm(props: any) {
  const { data } = props;
  // console.log("data in task card", data)

  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const signIn = useSelector((state: any) => state?.root?.signIn);
  const taskData = useSelector((state: any) => state?.root?.task);

  useEffect(() => {
    data && dispatch(getTaskById({ taskId: data?._id })).then((result: any) => {
      if (getTaskById.fulfilled.match(result)) {
        if (result && result.payload.success === true) {
          // setClientId(result?.payload?.data[0]?.client_id);
          // setTeamId(result?.payload?.data[0]?.assign_to);
        }
      }
    });
  }, [data, dispatch]);

  let [dataa] = taskData?.task;


  function getStatusBadge(status: string) {
    switch (status?.toLowerCase()) {
      case 'pending':
        return (
          <div className="flex items-center">
            <Badge color="warning" renderAsDot />
            <Text className="ms-2 font-medium text-orange-dark">Pending</Text>
          </div>
        );
      case 'completed':
        return (
          <div className="flex items-center">
            <Badge color="success" renderAsDot />
            <Text className="ms-2 font-medium text-green-dark">Completed</Text>
          </div>
        );
      case 'overdue':
        return (
          <div className="flex items-center">
            <Badge color="danger" renderAsDot />
            <Text className="ms-2 font-medium text-red-dark">Overdue</Text>
          </div>
        );
      case 'in_progress':
        return (
          <div className="flex items-center">
            <Badge className="bg-gray-400" renderAsDot />
            <Text className="ms-2 font-medium text-gray-600">In Progress</Text>
          </div>
        );
      default:
        return (
          <div className="flex items-center">
            <Badge renderAsDot className="bg-gray-400" />
            <Text className="ms-2 font-medium text-gray-600">{status}</Text>
          </div>
        );
    }
  }

  const handleApiCall = (statusData: Record<string, string>) => {

    dispatch(putTaskStatusChange({ _id: statusData?._id, status: statusData?.status })).then((result: any) => {
      if (putTaskStatusChange.fulfilled.match(result)) {
        if (result && result.payload.success === true) {
          closeModal()
          dispatch(getAllTask({ pagination: false }));
        }
      }
    });
  
  }


  if (!taskData?.task) {
    return (
      <div className='p-10 flex items-center justify-center'>
        <Spinner size="xl" tag='div' className='ms-3' />
      </div>
    )
  } else {
    return (
      <>
        <div className=" h-full w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
          <div className="flex items-center pt-6 px-6">
            <Title as="h3" className="text-xl xl:text-2xl w-[18rem] truncate">
              {dataa?.title}
            </Title>
            <div className='ms-auto flex items-center gap-3'>
              <div>
                { getStatusBadge(dataa?.status) }
              </div>
              {(signIn?.role !== 'client' && signIn?.role !== 'team_client') &&
                <Popover
                  placement="bottom"
                  className=" min-w-[135px] px-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100 demo_test"
                  content={({ setOpen }) => (
                    <div className="px-2 text-gray-900">
                      <Button
                        variant="text"
                        onClick={() => handleApiCall({ _id: dataa?._id, status: 'pending' })}
                        className="flex w-full items-center justify-start px-2 py-2.5 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
                      >
                        {/* <PiCopySimple className="mr-2 h-5 w-5 text-gray-500" /> */}
                        Pending
                      </Button>
                      <Button
                        variant="text"
                        onClick={() => handleApiCall({ _id: dataa?._id, status: 'in_progress' })}
                        className="flex w-full items-center justify-start px-2 py-2.5 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
                      >
                        {/* <PiShareFat className="mr-2 h-5 w-5 text-gray-500" /> */}
                        Inprogress
                      </Button>
                      <Button
                        variant="text"
                        className="flex w-full items-center justify-start px-2 py-2.5 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
                        onClick={() => handleApiCall({ _id: dataa?._id, status: 'completed' })}
                      >
                        {/* <PiTrashSimple className="mr-2 h-5 w-5 text-gray-500" /> */}
                        Completed
                      </Button>
                    </div>
                  )}
                >
                  <ActionIcon title={'More Options'} variant="text">
                    <PiDotsThreeOutlineVerticalFill className="h-5 w-5 text-gray-500" />
                  </ActionIcon>
                </Popover>
              }
              <ActionIcon
                size="sm"
                variant="text"
                onClick={() => closeModal()}
                className="p-0 text-gray-500 hover:!text-gray-900"
              >
                <PiXBold className="h-[18px] w-[18px]" />
              </ActionIcon>
            </div>
          </div>

          <div className='mb-10'>
            {/* <Title as="h4" className="text-lg font-medium xl:text-xl xl:leading-7">
              {event.title}
            </Title>
            {event.description && (
              <Text className="mt-3 xl:leading-6">{event.description}</Text>
            )} */}

            <div className="mt-7 px-6 flex flex-col gap-[18px] text-gray-600">
              <div className="flex gap-2">
                <FaUserCircle className="h-5 w-5" />
                <span>Client: </span>
                <span className="font-medium text-gray-1000 capitalize">
                  {dataa?.client_name}
                </span>
              </div>
              <div className="flex gap-2">
                <BsPersonFill className="h-5 w-5" />
                <span>Assigned by: </span>
                <span className="font-medium text-gray-1000 capitalize">
                  {dataa?.assigned_by_name}
                </span>
              </div>
              <div className="flex gap-2">
                <FaPeopleGroup className="h-5 w-5" />
                <span>Assigned to: </span>
                <span className="font-medium text-gray-1000 capitalize">
                  {dataa?.assigned_to_name}
                </span>
              </div>
              <div className="flex gap-2">
                <MdOutlineCalendarMonth className="h-5 w-5" />
                <span>Created: </span>
                <span className="font-medium text-gray-1000">
                  {moment(dataa?.createdAt).format("DD MMM, YY - hh:mm A")}
                </span>
              </div>
              <div className="flex gap-2">
                <MdOutlineCalendarMonth className="h-5 w-5" />
                <span>Deadline: </span>
                <span className="font-medium text-gray-1000">
                  {moment(dataa?.due_date).format("DD MMM, YY - hh:mm A")}
                </span>
              </div>
              <div className="flex gap-2">
                <span>Task Description: </span>
                <span className="font-medium text-gray-1000 capitalize">
                  {/* {dataa?.agenda && dataa?.agenda?.slice(3, dataa?.agenda?.length - 4)} */}
                  <p dangerouslySetInnerHTML={{ __html: dataa?.agenda }}></p>
                </span>
              </div>
            </div>
            {/* <div className={cn('grid grid-cols-2 gap-4 pt-5 ')}>
              <Button
                variant="outline"
                onClick={() => handleDelete(event.id as string)}
                className="dark:hover:border-gray-400"
              >
                Delete
              </Button>
              <Button
                className="hover:bg-gray-700 dark:bg-gray-200 dark:text-white dark:hover:bg-gray-300 dark:active:bg-gray-100"
                onClick={handleEditModal}
              >
                Edit
              </Button>
            </div> */}
          </div>
        </div>
      </>
    );
  }
}



