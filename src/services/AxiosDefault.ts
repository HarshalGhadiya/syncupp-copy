import { routes } from "@/config/routes";
import axios, { AxiosRequestConfig } from "axios";
import { isEmpty, isString } from "lodash";
// import toast from "react-hot-toast";


const AxiosDefaultSetting = async ({
  method,
  data,
  url,
  contentType,
  customHeaders, // New parameter for additional headers
}: {
  method?: string;
  data?: any;
  url?: string;
  contentType?: string;
  customHeaders?: Record<string, string>; // Additional headers
}): Promise<any> => {


  const AxiosDefault = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
    timeout: 10000,
    headers: {
      "Content-Type": isEmpty(contentType) ? "application/json" : contentType,
      Accept: "application/json",
      ...customHeaders, // Merge custom headers
    },
  });

  AxiosDefault.interceptors.request.use(
    async (config) => {
      try {
        const userData: any = localStorage.getItem("token");
        if (isString(userData) && !isEmpty(userData)) {
          config.headers["Authorization"] = `Bearer ${userData}`;
        }
      } catch (error) {
        // console.log('Axios default error',error);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  AxiosDefault.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {


      if (error?.response && error?.response?.status === 401) {
        try {
          // const expiryTime = new Date(new Date().getTime() - 100000);
          // You can handle the 401 error here

          // toast.error(error?.response?.message)
          localStorage.removeItem('token');
          localStorage.clear();
          window.location.href = routes?.signIn;

        } catch (e) {
          return Promise.reject(e);
        }
      }
      return Promise.reject(error);
    }
  );

  AxiosDefault.defaults.method = method;

  return await AxiosDefault({
    method,
    data,
    url,
    contentType,
  } as AxiosRequestConfig)
};

export default AxiosDefaultSetting;
