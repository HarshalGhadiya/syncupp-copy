import AxiosDefault from "@/services/AxiosDefault";

type PostAddActivityApiData = {
  title: string;
  agenda: string;
  activity_type: string;
  client_id: string;
  assign_to: string;
  due_date?: string;
  meeting_start_time?: string;
  meeting_end_time?: string;
  internal_info?: string;
  recurring_end_date?: string;
  mark_as_done ?: boolean;
}
  
type PatchEditActivityApiData = {
  _id: string;
  title: string;
  agenda: string;
  activity_type: string;
  client_id: string;
  assign_to: string;
  due_date?: string;
  meeting_start_time?: string;
  meeting_end_time?: string;
  internal_info?: string;
  recurring_end_date?: string;
  mark_as_done ?: boolean;
}

type GetActivityByIdApiData = {
  activityId: string;
}

type DeleteActivityApiData = {
  activityIdsToDelete: string[];
}

type GetAllActivityApiData = {
  page?: number;
  items_per_page?: number;
  sort_order?: string;
  sort_field?: string;
  search?: string;
  client_id?: string;
  team_id?: string;
  agency_id?: string;
  activity_type?: string;
  filter?: any;
  pagination?: boolean;
}



// type ApiResponse = {
//   success: boolean;
//   message: string;
//   token: string;
// };

export const PostAddActivityApi = async (data: PostAddActivityApiData) => {
  // console.log(data)
  const response = await AxiosDefault({
    url: "/api/v1/activity/call-meeting",
    method: "POST",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};


export const PatchEditActivityApi = async (data: PatchEditActivityApiData) => {
    const response = await AxiosDefault({
      url: `/api/v1/activity/update/call-meeting/${data._id}`,
      method: "PATCH",
      data: data,
      contentType: "application/json", 
    });
    const responseData = response.data;
    return responseData;
  };

export const GetAllActivityApi = async (data: GetAllActivityApiData) => {
  const response = await AxiosDefault({
    url: "/api/v1/activity/list",
    method: "POST",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};

export const GetActivityByIdApi = async (data: GetActivityByIdApiData) => {
  const response = await AxiosDefault({
    url: `/api/v1/activity/call-meeting/${data.activityId}`,
    method: "GET",
    // data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};

export const DeleteActivityApi = async (data: DeleteActivityApiData) => {
  const response = await AxiosDefault({
    url: `/api/v1/activity/delete-task`,
    method: "DELETE",
    data: data,
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};

