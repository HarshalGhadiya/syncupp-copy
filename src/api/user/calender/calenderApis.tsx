import AxiosDefault from "../../../services/AxiosDefault";

type PostAddInvoiceApiData = {
    email: string;
    name: string;
    contact_number?: string;
    role?: string;
  }
type GetInvoiceApiData = {
  _id: string;
  company_name: string;
  name: string;
  first_name?: string;
  last_name?: string;
  }

  export const PostAddInvoiceApi = async (data: PostAddInvoiceApiData) => {
    const response = await AxiosDefault({
      url: "/api/v1/team-member/add",
      method: "POST",
      data: data,
      contentType: "application/json", 
    });
    const responseData = response.data;
    return responseData;
  };
  export const GetInvoiceApi = async (data: GetInvoiceApiData) => {
    const response = await AxiosDefault({
      url: "/api/v1/invoice/get-clients",
      method: "GET",
      data: data,
      contentType: "application/json", 
    });
    const responseData = response.data;
    return responseData;
  };