import AxiosDefault from "@/services/AxiosDefault";


// faq List
type GetAllfaqlistApiData = {
    page?: number;
    items_per_page?: number;
    sort_order?: string;
    sort_field?: string;
    search?: string;
}

export const GetAllfaqApi = async (data: GetAllfaqlistApiData) => {
    const response = await AxiosDefault({
        url: "/api/v1/admin/get-all-faq",
        method: "POST",
        data: data,
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};



//Delete faq list

type DeleteAgency = {
    agencies: string[];
    status?: string | boolean
    delete?: boolean
}

export const DeleteAgencysApi = async (data: DeleteAgency) => {
    const response = await AxiosDefault({
        url: `/api/v1/admin/update-agency`,
        method: "PATCH",
        data: data,
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};