import AxiosDefault from '../../../services/AxiosDefault';

export type AddTermAndConditionData = {
  _id?: string;
  title: string;
  description?: string;
};

type ApiResponse = {
  success: boolean;
  message: string;
  token: string;
  data?: any;
};
// Add new Term & condition API
export const PostTermAndCondotionEnroll = async (
  data: AddTermAndConditionData
): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: '/api/v1/crm/term-and-condition',
    method: 'PUT',
    data: data,
    contentType: 'application/json',
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};
export const EditCmsAbotus = async (data: any): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: '/api/v1/admin/add-term-and-condition',
    method: 'PUT',
    data: data,
    contentType: 'application/json',
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};
export const EditCmsConatctUs = async (data: any): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: '/api/v1/crm/contact-us',
    method: 'PUT',
    data: data,
    contentType: 'application/json',
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};

export const GetCmsConatctUS = async (): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: '/api/v1/crm/contact-us',
    method: 'GET',
    contentType: 'application/json',
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};

export const EditCmsPrivacyPolicy = async (data: any): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: '/api/v1/crm/privacy-policy',
    method: 'PUT',
    data: data,
    contentType: 'application/json',
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};
export const EditCmscancellation = async (data: any): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: '/api/v1/crm/Cancellation-and-Refund',
    method: 'PUT',
    data: data,
    contentType: 'application/json',
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};
export const getCmscancellation = async (): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: '/api/v1/crm/Cancellation-and-Refund',
    method: 'GET',
    contentType: 'application/json',
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};
export const EditCmsshipping = async (data: any): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: '/api/v1/crm/Shipping-and-Delivery',
    method: 'PUT',
    data: data,
    contentType: 'application/json',
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};
export const getCmsshipping = async (): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: '/api/v1/crm/Shipping-and-Delivery',
    method: 'GET',
    contentType: 'application/json',
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};
export const EditCmsAboutus = async (data: any): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: '/api/v1/crm/about-us-update',
    method: 'PUT',
    data: data,
    contentType: 'application/json',
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};
export const GetCmsAboutus = async (): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: '/api/v1/crm/about-us',
    method: 'GET',
    contentType: 'application/json',
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};
export const GetCmsPrivacyPolicy = async (): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: '/api/v1/crm/privacy-policy',
    method: 'GET',
    contentType: 'application/json',
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};
export const ViewCmsAbotus = async (data: any): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: '/api/v1/admin/add-term-and-condition',
    method: 'GET',
    data: data,
    contentType: 'application/json',
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};
export const GetCmsTermscondition = async (): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: '/api/v1/crm/term-and-condition',
    method: 'GET',
    contentType: 'application/json',
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};
export const GetCmsPricingPlan = async (): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: '/api/v1/crm/price-plan',
    method: 'GET',
    contentType: 'application/json',
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};
export const EditCmsPricingPaln = async (data: any): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: '/api/v1/crm/price-plan',
    method: 'PUT',
    data: data,
    contentType: 'application/json',
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};
