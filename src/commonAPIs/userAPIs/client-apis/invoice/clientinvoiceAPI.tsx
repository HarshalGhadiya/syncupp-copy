import AxiosDefault from "@/services/AxiosDefault";

/* client Invoice List */

// client Invoice list API types
type GetAllclientInvoicelistApiData = {
    page?: number;
    items_per_page?: number;
    sort_order?: string;
    sort_field?: string;
    search?: string;
    agency_id?: string
}

export const GetAllclientInvoiceApi = async (data: GetAllclientInvoicelistApiData) => {
    const response = await AxiosDefault({
        url: "/api/v1/invoice/get-all",
        method: "POST",
        data: data,
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};



// Get Single Client Invoice
type GetClientInvoiceByIdApiData = {
    id: string;
}

export const GetClientInvoiceByIdApi = async (data: GetClientInvoiceByIdApiData) => {
    const response = await AxiosDefault({
        url: `/api/v1/invoice/${data}`,
        method: "GET",
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};



