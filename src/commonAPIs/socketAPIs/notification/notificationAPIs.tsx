import AxiosDefault from '@/services/AxiosDefault';

export const GetAllNotification = async (data: any) => {
  const response = await AxiosDefault({
    url: `/api/v1/notification?skip=${data.skip}&limit=${data.limit}`,
    method: 'GET',
    data: data,
    contentType: 'application/json',
  });
  const responseData = response.data;
  return responseData;
};
//read notification
export const ReadNotification = async (data: any) => {
  const response = await AxiosDefault({
    url: '/api/v1/notification/read-notification',
    method: 'POST',
    data: data,
    contentType: 'application/json',
  });
  const responseData = response.data;
  return responseData;
};
