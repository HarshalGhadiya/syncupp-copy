import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, Id, Task } from "./types";
// import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import TaskCard from "./task-card";
import SimpleBar from '@/components/ui/simplebar';
import { Empty } from "rizzui";
import { Text } from '@/components/ui/text';
import { useSelector } from "react-redux";
import Spinner from "@/components/ui/spinner";

interface Props {
  column: Column;
  tasks: Task[];
}

function ColumnContainer({
  column,
  tasks,
}: Props) {

  const taskData = useSelector((state: any) => state?.root?.task);

  const tasksIds = useMemo(() => {
    return tasks?.map((task) => task?._id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column._id,
    data: {
      type: "Column",
      column,
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
        className="opacity-40 border-2 w-[350px] h-[600px] max-h-[600px] rounded-md flex flex-col"></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-[350px] h-[650px] max-h-[650px] rounded-md flex flex-col bg-gray-100">
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        className="bg-gray-100 text-md text-black h-[48px] cursor-grab border rounded-md rounded-b-none p-3 font-bold flex justify-center items-center">
        <div className="flex justify-center items-center">
          {column?.title}
        </div>
      </div>

      {/* Column task container */}
      <SimpleBar className="max-h-[600px]">
        {taskData?.getAllTaskStatus === 'pending' ? (
          <div className="grid mt-40 h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
            <Spinner size="xl" />
          </div>
        ) : (
          <SortableContext items={tasksIds}>
            {tasks && tasks?.length > 0 ?
              (tasks?.map((task) => (
                <div key={task?._id} className="px-2 pt-2">
                  <TaskCard
                    key={task?._id}
                    task={task}
                  />
                </div>
              ))) : (
                <div className="py-5 mt-28 text-center lg:py-8">
                  <Empty /> <Text className="mt-3">No Data</Text>
                </div>
              )
            }
          </SortableContext>
        )

        }
      </SimpleBar>
    </div>
  );
}

export default ColumnContainer;