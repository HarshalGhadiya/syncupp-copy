import AxiosDefault from '@/services/AxiosDefault';

// Agency List
type GetAllCouponData = {
  page?: number;
  items_per_page?: number;
  sort_order?: string;
  sort_field?: string;
  search?: string;
};

export const GetAllCouponApi = async (data: GetAllCouponData) => {
  const response = await AxiosDefault({
    url: '/api/v1/admin/get-coupon-list',
    method: 'POST',
    data: data,
    contentType: 'application/json',
  });
  const responseData = response.data;
  return responseData;
};

export const AddCouponApi = async (data: any) => {
  const response = await AxiosDefault({
    url: '/api/v1/admin/add-coupon',
    method: 'POST',
    data: data,
    contentType: 'multipart/form-data',
  });
  const responseData = response.data;
  return responseData;
};

export const GetcoupenDataByid = async (id: any) => {
  const response = await AxiosDefault({
    url: `/api/v1/admin/get-coupon/${id}`,
    method: 'GET',
    contentType: 'application/json',
  });
  const responseData = response.data;
  return responseData;
};

export const UpadatecoupenDataByid = async (data: any, id: any) => {
  console.log(data, 'data');
  const response = await AxiosDefault({
    url: `/api/v1/admin/update-coupon/${id}`,
    method: 'PUT',
    data: data,
    contentType: 'multipart/form-data',
  });
  const responseData = response.data;
  return responseData;
};

export const DealteCoupon = async (data: any) => {
  const response = await AxiosDefault({
    url: `/api/v1/admin/delete-coupon`,
    method: 'DELETE',
    data: data,
    contentType: 'application/json',
  });
  const responseData = response.data;
  return responseData;
};
