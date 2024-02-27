import AxiosDefault from "@/services/AxiosDefault";


// Inquiry List
type GetAllinquiryApiData = {
    page?: number;
    items_per_page?: number;
    sort_order?: string;
    sort_field?: string;
    search?: string;
}

export const GetAllinquiryApi = async (data: GetAllinquiryApiData) => {
    const response = await AxiosDefault({
        url: "/api/v1/inquiry/get-all",
        method: "POST",
        data: data,
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};



//Delete Inquiry list
type DeleteInquiry = {
    inquiryIdsToDelete: string[];
}

export const DeleteInquirysApi = async (data: DeleteInquiry) => {
    const response = await AxiosDefault({
        url: `/api/v1/inquiry`,
        method: "DELETE",
        data: data,
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};