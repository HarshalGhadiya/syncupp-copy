import AxiosDefault from "@/services/AxiosDefault";

// Client Agreement List
type GetAllclientAgreementlistApiData = {
    page?: number;
    items_per_page?: number;
    sort_order?: string;
    sort_field?: string;
    search?: string;
    agency_id?: string
}

export const GetAllclientAgreementApi = async (data: GetAllclientAgreementlistApiData) => {
    const response = await AxiosDefault({
        url: "/api/v1/agreement/get-all-agreement",
        method: "POST",
        data: data,
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};



// Get Single Client Agreement
type GetClientAgreementByIdApiData = {
    id: string;
}

export const GetClientAgreementByIdApi = async (data: GetClientAgreementByIdApiData) => {
    const response = await AxiosDefault({
        url: `/api/v1/agreement/get-agreement/${data}`,
        method: "GET",
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};


//  Agreement status change
type clientAgreementstatusChange = {
    id: string;
}

export const ClientAgreementstatusChange = async (data: clientAgreementstatusChange) => {
    const response = await AxiosDefault({
        url: `/api/v1/agreement/update-agreement-status/${data?.id}`,
        method: "PUT",
        data: data,
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};


