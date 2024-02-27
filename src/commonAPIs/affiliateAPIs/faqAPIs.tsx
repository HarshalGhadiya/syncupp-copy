import AxiosDefault from "@/services/AxiosDefault";


// Faq us 
type FaqState = {}

export const FaqlistApi = async (data: FaqState) => {
    const response = await AxiosDefault({
        url: "/api/v1/admin/get-all-faq",
        method: "POST",
        data: data,
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};