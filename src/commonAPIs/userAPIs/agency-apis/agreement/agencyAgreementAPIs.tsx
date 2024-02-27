import AxiosDefault from "@/services/AxiosDefault";
import { string } from "prop-types";

// Agency Agreement List
type GetAllAgreementlistApiData = {
    page?: number;
    items_per_page?: number;
    sort_order?: string;
    sort_field?: string;
    search?: string;
}

export const GetAllAgreementApi = async (data: GetAllAgreementlistApiData) => {
    const response = await AxiosDefault({
        url: "/api/v1/agreement/get-all-agreement",
        method: "POST",
        data: data,
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};


//Delete Agency Agreement 

type DeleteAgencyAgreement = {
    id: string[] | string
    agency_id?: string
}

export const DeleteAgencyAgreementsApi = async (data: DeleteAgencyAgreement) => {
    const response = await AxiosDefault({
        url: `/api/v1/agreement/delete-agreement`,
        method: "POST",
        data: data,
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};

// get A Single Aggrement By Id

type GetAgreementByIdApiData = {
    id: string;
}

export const GetSingleAgreementByIdApi = async (data: GetAgreementByIdApiData) => {
    const response = await AxiosDefault({
        url: `/api/v1/agreement/get-agreement/${data}`,
        method: "GET",
        // data: data,
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};



// get A Single Aggrement By Id

type SendAgreementApiData = {
    agreementId: string;
}

export const SendAgreement = async (data: SendAgreementApiData) => {
    const response = await AxiosDefault({
        url: `/api/v1/agreement/send-agreement`,
        method: "POST",
        data: { agreementId: data },
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};


// Download pdf
type DownloadAgreementApiData = {
    id: string;
}

export const DownloadAgreement = async (data: DownloadAgreementApiData) => {
    const customHeaders = {
        // Add any additional headers you need for this specific request
        responseType: "application/pdf",
    };

    const response = await AxiosDefault({
        url: `/api/v1/agreement/download-pdf/${data}`,
        method: "GET",
        // data: { agreementId: data },
        contentType: "application/pdf",
        customHeaders
    });

    // console.log(response?.data?.data?.data,'response')

    // Set headers on the frontend
    const contentType = 'application/pdf';
    const contentDisposition = 'attachment; filename="document.pdf"';


    // Convert the numeric array to a Uint8Array
    const uint8Array = new Uint8Array(response?.data?.data?.data);

    // Convert Uint8Array to Blob
    const blob = new Blob([uint8Array], { type: 'application/pdf' });

    // Create a URL for the Blob
    const pdfUrl = URL.createObjectURL(blob);



    // Create a link element and simulate a click to trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = contentDisposition.split('=')[1].replace(/"/g, '');
    link.click();

    const responseData = response?.data;
    return responseData;
};


// Create Agreement
type CreateAgencyAgreement = {
    client_id: string,
    title: string,
    receiver: string,
    due_date: string,
    agreement_content: string
    send?: boolean
}

export const CreateAgencyAgreementsApi = async (data: CreateAgencyAgreement) => {
    const response = await AxiosDefault({
        url: `/api/v1/agreement/add-agreement`,
        method: "POST",
        data: data,
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};

// Edit Agreement
type EditAgencyAgreement = {
    client_id: string,
    title: string,
    receiver: string,
    due_date: string,
    agreement_content: string,
    send?: boolean
}

export const EditAgencyAgreementsApi = async (data: EditAgencyAgreement, id: string) => {
    const response = await AxiosDefault({
        url: `/api/v1/agreement/update-agreement/${id}`,
        method: "PUT",
        data: data,
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};

// Edit Status of Agreement

type EditStatusAgreement = {
    status: string
}

export const EditAgreementStatus = async (data: EditStatusAgreement, id: string) => {
    const response = await AxiosDefault({
        url: `/api/v1/agreement/update-agreement-status/${id}`,
        method: "PUT",
        data: data,
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};

//Get Dropdown Client list
export const GetDropdownClienlist = async (data: any) => {
    const response = await AxiosDefault({
        url: `/api/v1/agency/clients`,
        method: "POST",
        data: data,
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};
