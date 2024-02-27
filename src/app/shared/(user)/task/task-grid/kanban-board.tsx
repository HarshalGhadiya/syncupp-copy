import { useEffect, useMemo, useState } from "react";
import { createPortal } from 'react-dom';
import { Column, Id, Task } from "./types";
import ColumnContainer from "./column-container";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import TaskCard from "./task-card";
import { useDispatch, useSelector } from "react-redux";
import { defaultCols, } from "./data";
import SimpleBar from '@/components/ui/simplebar';
import KanbanSearch from "./kanban-search";
import { getAllTask } from "@/redux/slices/user/task/taskSlice";
import { putTaskKanbanStatusChange } from "@/redux/slices/user/task/taskStatusSlice";



function KanbanBoard() {
  const dispatch = useDispatch();

  
  const taskData = useSelector((state: any) => state?.root?.task);
  const signIn = useSelector((state: any) => state?.root?.signIn);
  const clientSliceData = useSelector((state: any) => state?.root?.client);



  // console.log("Tasks.....", taskData?.data?.activity)

  // console.log("agency id....", clientSliceData?.agencyId)

  useEffect(() => {
    signIn?.role !== 'client' && signIn?.role !== 'team_client' ? dispatch(getAllTask({ pagination: false })) : dispatch(getAllTask({ pagination: false, agency_id: clientSliceData?.agencyId }))
  }, [dispatch, clientSliceData, signIn]);



  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const columnsId = useMemo(() => columns?.map((col) => col?._id), [columns]);

  const [tasks, setTasks] = useState<Task[]>(taskData && taskData?.data?.activity);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [activeTask, setActiveTask] = useState<Task | null>(null);


    useEffect(() => {
      setTasks(taskData?.data?.activity)
    }, [taskData]);


  // console.log("Active columns....", activeColumn);
  // console.log("Active task...", activeTask);
  // console.log("Columns...", columns);
  // console.log("Tasks...", tasks);


  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );


  function onDragStart(event: DragStartEvent) {
    // console.log("on drag start.......", event.active.data.current?.type)
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    // setActiveTask(null);


    const { active, over } = event;

    if(activeTask?._id === active?.id) {
      (signIn?.role !== 'client' && signIn?.role !== 'team_client') && dispatch(putTaskKanbanStatusChange({ _id: active?.data?.current?.task?._id, status: active?.data?.current?.task?.status }))
    }



    if (!over) return;
    // console.log("on drag end task is.....", activeTask)
    // console.log("on drag end active status is.....", active)

    
    const activeId = active.id;
    const overId = over.id;
    
    if (activeId === overId) return;
    
    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;
    
    // console.log("DRAG END");

    setColumns((prevColumns) => {
      const activeColumnIndex = prevColumns.findIndex((col) => col._id === activeId);
      const overColumnIndex = prevColumns.findIndex((col) => col._id === overId);

      if (activeColumnIndex !== overColumnIndex) {
        return arrayMove(prevColumns, activeColumnIndex, overColumnIndex);
      }
      
      return prevColumns;
    });


  }

  function onDragOver(event: any) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t._id === activeId);
        const overIndex = tasks.findIndex((t) => t._id === overId);



        // if (tasks[activeIndex].status != tasks[overIndex].status) {
        //   // Fix introduced after video recording
        //   console.log("kanban board error...", tasks[activeIndex])
        //   // tasks[activeIndex].status = tasks[overIndex]?.status;
        //   tasks[activeIndex] = { ...tasks[activeIndex], status: tasks[overIndex].status};
        //   return arrayMove(tasks, activeIndex, overIndex - 1);
        // }


        if (tasks[activeIndex].status !== tasks[overIndex].status) {
          // Create a new array with the updated task
          const updatedTasks = tasks?.map((task, index) => {
            if (index === activeIndex) {
              return { ...task, status: tasks[overIndex].status };
            }
            return task;
          });
          return arrayMove(updatedTasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column

    // if (isActiveATask && isOverAColumn) {
    //   setTasks((tasks) => {
    //     const activeIndex = tasks.findIndex((t) => t._id === activeId);

    //     tasks[activeIndex].status = overId;
    //     console.log("DROPPING TASK OVER COLUMN", { activeIndex });
    //     return arrayMove(tasks, activeIndex, activeIndex);
    //   });
    // }

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t._id === activeId);

        // Create a new array with the updated task
        const updatedTasks = tasks?.map((task, index) => {
          if (index === activeIndex) {
            return { ...task, status: overId };
          }
          return task;
        });

        // console.log("DROPPING TASK OVER COLUMN", { activeIndex });

        // No need to move the task within the array since it's dropped over a column
        return updatedTasks;
      });
    }


  }


  return (
    <div>
      <KanbanSearch />
      <div className="@container border rounded-md border-t-transparent shadow-sm mt-4">
        <SimpleBar className="max-h-[600px]">
          <DndContext
            sensors={sensors}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
          >
            <div className="m-auto flex gap-4">
              <div className="flex gap-4 min-h-[600px]">
                <SortableContext items={columnsId}>
                  {columns?.map((col) => (
                    <ColumnContainer
                      key={col._id}
                      column={col}
                      tasks={tasks?.filter((task) => task?.status === col?._id)}
                    />
                  ))}
                </SortableContext>
              </div>
            </div>

            {createPortal(
              <DragOverlay>
                {activeColumn && (
                  <ColumnContainer
                    column={activeColumn}
                    tasks={tasks?.filter(
                      (task) => task?.status === activeColumn?._id
                    )}
                  />
                )}
                {activeTask && (
                  <TaskCard
                    task={activeTask}
                  />
                )}
              </DragOverlay>,
              document.body
            )}
          </DndContext>
        </SimpleBar>
      </div>
    </div>
  );
}

export default KanbanBoard;