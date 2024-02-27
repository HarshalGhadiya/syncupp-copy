import AxiosDefault from "../../../services/AxiosDefault";

export type AddFAQData = {
    _id?:string,
    title: string,
    description?: string,
    items_per_page?:Number,
  page?:Number,
  search?:string,
  sort_field?:string,
  sort_order?:string,
  id?: string
};

type ApiResponse = {
  success: boolean;
  message: string;
  token: string;
  data?: any 
};
// Add new FAQ API
export const PostFaqEnroll = async (data: AddFAQData): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: "/api/v1/admin/add-faq",
    method: "POST",
    data: data,
    contentType: "application/json", 
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};
// Get All FAQ List
export const GetAllFaq = async (data: AddFAQData): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: "/api/v1/admin/get-all-faq",
    method: "POST",
    data: data,
    contentType: "application/json",  
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};
//get FAQ Data By ID
export const GetFaqDataByID = async (data: AddFAQData): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: `/api/v1/admin/get-faq/${data._id}`,
    method: "GET",
    data: data,
    contentType: "application/json", 
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};
// delete FAQ DATA By ID
export const DeleteFaqData = async (data: AddFAQData): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: `/api/v1/admin/delete-faq`,
    method: "DELETE",
    data: data,
    contentType: "application/json", 
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};
// Update FAQ Data By ID
export const UpdateFaqDataByID = async (data: AddFAQData): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: `/api/v1/admin/update-faq/${data._id}`,
    method: "PUT",
    data: data,
    contentType: "application/json", 
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};