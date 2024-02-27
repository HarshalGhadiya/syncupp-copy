import AxiosDefault from '@/services/AxiosDefault';

// Agency List
type GetAlldata = {
  page?: number;
  items_per_page?: number;
  sort_order?: string;
  sort_field?: string;
  search?: string;
};

export const GetAllBilling = async (data: GetAlldata) => {
  const response = await AxiosDefault({
    url: '/api/v1/payment/history',
    method: 'POST',
    data: data,
    contentType: 'application/json',
  });
  const responseData = response.data;
  return responseData;
};
export const GetAllSeats = async (data: GetAlldata) => {
  const response = await AxiosDefault({
    url: '/api/v1/payment/sheets',
    method: 'POST',
    data: data,
    contentType: 'application/json',
  });
  const responseData = response.data;
  return responseData;
};
export const CancleSub = async () => {
  const response = await AxiosDefault({
    url: '/api/v1/payment/sheets',
    method: 'GET',
    contentType: 'application/json',
  });
  const responseData = response.data;
  return responseData;
};
export const RemoveUSer = async (id: any) => {
  const response = await AxiosDefault({
    url: '/api/v1/payment/remove-user',
    method: 'POST',
    data: id,
    contentType: 'application/json',
  });
  const responseData = response.data;
  return responseData;
};

export const CancleSubcr = async () => {
  const response = await AxiosDefault({
    url: '/api/v1/payment/cancel-subscription',
    method: 'GET',
    contentType: 'application/json',
  });
  const responseData = response.data;
  return responseData;
};

export const GetCardData = async (data: any) => {
  const response = await AxiosDefault({
    url: '/api/v1/payment/get-subscription',
    method: 'GET',
    data: data,
    contentType: 'application/json',
  });
  const responseData = response.data;
  return responseData;
};
