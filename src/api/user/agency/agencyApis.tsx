import AxiosDefault from "@/services/AxiosDefault";
import { string } from "prop-types";

type AgencyData = {
    _id: string,
    first_name:string,
    last_name: string,
    email:string,
    role:string,
    // "reference_id": {
    //   "_id": "659ec7ca29785551a36c8f79",
    //   "createdAt": "2024-01-10T16:37:30.764Z",
    //   "updatedAt": "2024-01-10T16:37:30.764Z",
    //   "__v": 0
    // },
    status?: string,
    createdAt?: Date,
    updatedAt?:Date,
  }

type PostAgencyUpdateData ={
    first_name: string,
    last_name: string,
    contact_number: string,
    address: string,
    city: string,
    company_name: string,
    company_website: string,
    country: string,
    industry: string,
    no_of_people: string,
    pin_code: Number,
    state: string
  }

// type ApiResponse = {
//   success: boolean;
//   message: string;
//   token: string;
// };

export const GetAgencyData = async () => {
  const response = await AxiosDefault({
    url: "/api/v1/agency/get-profile",
    method: "GET",
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};

export const PostAgencyUpdateDataAPI = async (data: PostAgencyUpdateData) => {
  const response = await AxiosDefault({
    url: "/api/v1/agency/update-profile",
    method: "PUT",
    contentType: "application/json", 
  });
  const responseData = response.data;
  return responseData;
};

