import AxiosDefault from "@/services/AxiosDefault";

type PostAddTaskApiData = {
  title: string;
  agenda?: string;
  due_date?: string;
  client_id?: string;
  assign_to?: string;
  mark_as_done ?: boolean;
}
  
type PatchEditTaskApiData = {
  _id: string;
  title: string;
  agenda?: string;
  due_date?: string;
  client_id?: string;
  assign_to?: string;
  mark_as_done ?: boolean;
}

type putTaskStatusChangeApiData = {
  _id: string;
  status: string;
}

type DeleteTaskApiData = {
  taskIdsToDelete: string[];
}

type GetAllTaskApiData = {
  page?: number;
  items_per_page?: number;
  sort_order?: string;
  sort_field?: string;
  search?: string;
}

type GetTaskByIdApiData = {
  taskId: string;
}


// type ApiResponse = {
//   success: boolean;
//   message: string;
//   token: string;
// };

export const PostAddTaskApi = async (data: PostAddTaskApiData) => {
  // console.log(data)
  const response = await AxiosDefault({
    url: "/api/v1/activity/create-task",
    method: "POST",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};


export const PatchEditTaskApi = async (data: PatchEditTaskApiData) => {
    const response = await AxiosDefault({
      url: `/api/v1/activity/update-task/${data._id}`,
      method: "PUT",
      data: data,
      contentType: "application/json", 
    });
    const responseData = response.data;
    return responseData;
  };

export const GetAllTaskApi = async (data: GetAllTaskApiData) => {
  const response = await AxiosDefault({
    url: "/api/v1/activity/task-list",
    method: "POST",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};

export const GetTaskByIdApi = async (data: GetTaskByIdApiData) => {
  const response = await AxiosDefault({
    url: `/api/v1/activity/get-task/${data.taskId}`,
    method: "GET",
    // data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};

export const DeleteTaskApi = async (data: DeleteTaskApiData) => {
  const response = await AxiosDefault({
    url: `/api/v1/activity/delete-task`,
    method: "DELETE",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};

export const putTaskStatusChangeApi = async (data: putTaskStatusChangeApiData) => {
  const response = await AxiosDefault({
    url: `/api/v1/activity/update-status/${data._id}`,
    method: "PUT",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};
