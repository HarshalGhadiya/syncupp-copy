import AxiosDefault from "@/services/AxiosDefault";


// Contact us 
type ContactusState = {
    first_name: string,
    last_name: string,
    email: string,
    contact_number: string,
    country: string,
    no_of_people: string,
    thoughts: string,
    isAgreedtosyncup: false,
}

export const ContactusApi = async (data: ContactusState) => {
    const response = await AxiosDefault({
        url: "/api/v1/inquiry/send-inquiry",
        method: "POST",
        data: data,
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};