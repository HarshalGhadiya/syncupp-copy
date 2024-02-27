import { Task } from "./types";
import { useSortable } from "@dnd-kit/sortable";
import { ActionIcon } from '@/components/ui/action-icon';
import { Button } from '@/components/ui/button';
import { Popover } from '@/components/ui/popover';
import { Title, Text } from '@/components/ui/text';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { BsPersonFill } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { Tooltip } from '@/components/ui/tooltip';
import EyeIcon from "@/components/icons/eye";
import CustomModalButton from "@/app/shared/custom-modal-button";
import ViewTaskForm from "../create-edit/view-task-form";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllTask, putTaskStatusChange } from "@/redux/slices/user/task/taskSlice";
import cn from "@/utils/class-names";
import moment from "moment";
// import { CSS } from "@dnd-kit/utilities";


interface Props {
  task: Task;
}

function TaskCard({ task }: Props) {
  // const [mouseIsOver, setMouseIsOver] = useState(false);
  // console.log("mouse is over....", mouseIsOver)
  const signIn = useSelector((state: any) => state?.root?.signIn)
  const dispatch = useDispatch();

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task._id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transition,
    // transform: CSS.Transform.toString(transform),
  };


  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
      p-3 h-[175px] min-h-[100px] items-center flex text-left rounded-md border-2 border-black  cursor-grab relative"
      />
    );
  }


const handleApiCall = (statusData: Record<string, string>) => {

  dispatch(putTaskStatusChange({ _id: statusData?._id, status: statusData?.status })).then((result: any) => {
    if (putTaskStatusChange.fulfilled.match(result)) {
      if (result && result.payload.success === true) {
        dispatch(getAllTask({ pagination: false }));
      }
    }
  });

}



  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      // onClick={toggleEditMode}
      className="h-[175px] min-h-[100px] bg-white items-center flex text-left border border-gray-200 rounded-md cursor-grab relative task transition-all ease-in-out duration-300 hover:z-50 hover:-translate-y-1 hover:shadow-lg"
    // className="p-[0.3rem]"
    // onMouseEnter={() => {
    //   setMouseIsOver(true);
    // }}
    // onMouseLeave={() => {
    //   setMouseIsOver(false);
    // }}
    >
      <div className=" h-full w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        <div className="flex items-center gap-2 mt-4">
          <Tooltip
            size="sm"
            content={() => task?.title}
            placement="top-start"
            color="invert"
          >
            <ActionIcon variant="text" className="w-[13rem] text-left">
              <Title
                as="h4"
                className="ps-4 my-3 w-[13rem] text-[20px] lg:text-xl 4xl:text-[22px] truncate"
              >
                {task?.title}
              </Title>
            </ActionIcon>
          </Tooltip>
          <div className={cn(
            'ms-auto',
            (signIn?.role === 'client' || signIn?.role === 'team_client') && 'me-4'
          )}>
            <CustomModalButton
              icon={<EyeIcon className="h-4 w-4" />}
              view={<ViewTaskForm data={task} />}
              customSize="625px"
              title='View Task'
            />
            {(signIn?.role !== 'client' && signIn?.role !== 'team_client') &&
              <Popover
                placement="left"
                className="z-[99] min-w-[135px] px-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100"
                content={({ setOpen }) => (
                  <div className="px-2 text-gray-900">
                    <Button
                      variant="text"
                      onClick={() => handleApiCall({ _id: task?._id, status: 'pending' })}
                      className="flex w-full items-center justify-start px-2 py-2.5 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
                    >
                      {/* <PiCopySimple className="mr-2 h-5 w-5 text-gray-500" /> */}
                      Pending
                    </Button>
                    <Button
                      variant="text"
                      onClick={() => handleApiCall({ _id: task?._id, status: 'in_progress' })}
                      className="flex w-full items-center justify-start px-2 py-2.5 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
                    >
                      {/* <PiShareFat className="mr-2 h-5 w-5 text-gray-500" /> */}
                      Inprogress
                    </Button>
                    <Button
                      variant="text"
                      className="flex w-full items-center justify-start px-2 py-2.5 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
                      onClick={() => handleApiCall({ _id: task?._id, status: 'completed' })}
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
          </div>
        </div>

        <div className="flex items-center gap-2 ps-4 mt-6">
          <MdOutlineCalendarMonth className="h-5 w-5" />
          <span>Deadline: </span>
          <span className="font-medium text-gray-1000 mt-1">
            {moment(task?.due_date).format("DD MMM, YY - hh:mm A")}
          </span>
        </div>
        <div className="ps-3 mt-6 flex items-center justify-start gap-3">
          <Tooltip
            size="sm"
            content={() => task?.assigned_by_name}
            placement="top"
            color="invert"
          >
            <ActionIcon variant="text">
              <FaUserCircle size='25px' />
            </ActionIcon>
          </Tooltip>
          <Tooltip
            size="sm"
            content={() => task?.client_name}
            placement="top"
            color="invert"
          >
            <ActionIcon variant="text">
              <BsPersonFill size='25px' />
            </ActionIcon>
          </Tooltip>
          <Tooltip
            size="sm"
            content={() => task?.assigned_to_name}
            placement="top"
            color="invert"
          >
            <ActionIcon variant="text">
              <FaPeopleGroup size='25px' />
            </ActionIcon>
          </Tooltip>
        </div>
      </div>


      {/* <div
        className={cn(
          'relative rounded-lg border border-gray-200 bg-gray-0 p-8 shadow-sm transition-all hover:z-50 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-50',
        )}
      >
        <div className='flex items-start justify-between'>
          <div className="w-full truncate">
            <Text className="h-7 w-7">{task?.content}</Text>
          </div>
          <div className="flex">
            <Popover
              placement="left"
              className="z-[99] min-w-[140px] px-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100"
              content={({ setOpen }) => (
                <div className="px-2 text-gray-900">
                  <Button
                    variant="text"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-start px-2 py-2.5 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
                  >
                    <PiCopySimple className="mr-2 h-5 w-5 text-gray-500" />
                    Copy
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-start px-2 py-2.5 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
                  >
                    <PiShareFat className="mr-2 h-5 w-5 text-gray-500" />
                    Share
                  </Button>
                  <Button
                    variant="text"
                    className="flex w-full items-center justify-start px-2 py-2.5 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <PiTrashSimple className="mr-2 h-5 w-5 text-gray-500" />
                    Delete
                  </Button>
                </div>
              )}
            >
              <ActionIcon title={'More Options'} variant="text">
                <PiDotsThreeOutlineVerticalFill className="h-5 w-5 text-gray-500" />
              </ActionIcon>
            </Popover>
          </div>
        </div>
      </div> */}

      {/* <Card item={task} key={task.id} /> */}

      {/* {mouseIsOver && (
        <button
          onClick={() => {
            deleteTask(task.id);
          }}
          className="stroke-black absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded opacity-60 hover:opacity-100"
        >
          <TrashIcon />
        </button>
      )} */}
    </div>
  );
}

export default TaskCard;