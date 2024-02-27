import AxiosDefault from "../../../services/AxiosDefault";

type PostAddInvoiceApiData = {
  email: string;
  name: string;
  contact_number?: string;
  role?: string;
}
type DeleteInvoice = {
  invoiceIdsToDelete: string | string[]
}
type UpdateInvoiceStatusByID = {
  _id: string,
  status: string
}
type UpdateInvoiceDataByID = {
  _id: string,
  client_id: string,
  invoice_id: string,
  due_date: Date,
  invoice_date: Date,
  invoice_content: [
    {
      item: string,
      qty: Number,
      rate: Number,
      tax: Number,
      amount: Number,
      description: string
    }
  ]
}
type DownloadInvoice = {
  invoice_id: string
};
type SendInvoice = {
  invoice_id: string
};
type GetAllInvoiceData = {
  sort_field: string;
  sort_order: string;
  page: Number;
  items_per_page: Number;
  agency_id: string;
};

type PostCreateInvoice = {
  invoice_number: string,
  client_id: string,
  due_date: string,
  invoice_date: string,
  invoice_content: [
    {
      item: string,
      description: string,
      qty: Number,
      rate: Number,
      tax: Number,
      amount: Number
    }
  ],
  sent?: boolean,
}

type GetInvoiceDataByID =
  {
    _id: string,
    invoice_number: string,
    due_date: Date,
    invoice_date: Date,
    invoice_content: [
      {
        item: string,
        qty: Number,
        rate: Number,
        tax: string,
        amount: Number,
        description: string,
        _id: string
      },
    ],
    sub_total: Number,
    total: Number,
    createdAt: Date,
    updatedAt: Date,
    status: string,
    from: {
      _id: string,
      name: string,
      company_name: string,
      address: string,
      pincode: Number,
      state: {
        _id: string,
        name: string
      },
      city: {
        _id: string,
        name: string
      },
      country: {
        _id: string,
        name: string
      }
    },
    to: {
      _id: string,
      name: string,
      company_name: string,
      address: string,
      pincode: Number,
      state: {
        _id: string,
        name: string
      },
      city: {
        _id: string,
        name: string
      },
      country: {
        _id: string,
        name: string
      }
    }
  }
type GetInvoiceData = {
  _id: string,
  company_name: string,
  address: string,
  city: {
    _id: string,
    name: string
  },
  state: {
    _id: string,
    name: string
  },
  country: {
    _id: string,
    name: string
  },
  pincode: Number,
  contact_number: string
}
type GetInvoiceApiData = {
  _id: string;
  company_name: string;
  name: string;
}
type GetInvoiceDataClient = {
  client_id: string
}


// GET ALL CLIENT LIST APIs
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
//  GET INVOICE DATA BY ID
export const GetInvoiceDataByIDApi = async (data: GetInvoiceDataByID) => {
  const response = await AxiosDefault({
    url: `/api/v1/invoice/${data._id}`,
    method: "GET",
    data: data,
    contentType: "application/json",
  });
  const responseData = response.data;
  return responseData;
};
//  Get All INVOICE DATA
export const GetInvoiceDataApi = async (data: GetInvoiceDataClient) => {
  const response = await AxiosDefault({
    url: "/api/v1/invoice/get-invoice-data",
    method: "POST",
    data: data,
    contentType: "application/json",
  });
  const responseData = response.data;
  return responseData;
};



//  CREATE INVOICE POST API
export const PostCreateInvoiceApi = async (data: PostCreateInvoice) => {
  const response = await AxiosDefault({
    url: "/api/v1/invoice/create-invoice",
    method: "POST",
    data: data,
    contentType: "application/json",
  });
  const responseData = response.data;
  return responseData;
};




// GET ALL INVOICE DATA TABLE
export const GetAllInvoiceDataTableApi = async (data: GetAllInvoiceData) => {
  const response = await AxiosDefault({
    url: "/api/v1/invoice/get-all",
    method: "POST",
    data: data,
    contentType: "application/json",
  });
  const responseData = response.data;
  return responseData;
};
// POST SEND INVOICE Email
export const PostSendInvoiceApi = async (data: SendInvoice) => {
  const response = await AxiosDefault({
    url: "/api/v1/invoice/send-invoice",
    method: "POST",
    data: data,
    contentType: "application/json",
  });
  const responseData = response.data;
  return responseData;
};
//  POST DOWNLOAD INVOICE
export const PostDownloadInvoiceApi = async (data: DownloadInvoice) => {
  const customHeaders = {
    // Add any additional headers you need for this specific request
    responseType: "application/pdf",
  };

  const response = await AxiosDefault({
    url: `/api/v1/invoice/download-invoice/${data?.invoice_id}`,
    method: "GET",
    // data: data,
    contentType: "application/pdf",
    customHeaders
  });


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

  const responseData = response.data;
  return responseData;
};
// UPDATE INVOICE DATA BY ID
export const UpdateInvoiceDataByIDApi = async (data: UpdateInvoiceDataByID) => {
  const response = await AxiosDefault({
    url: `/api/v1/invoice/${data?.invoice_id}`,
    method: "PUT",
    data: data,
    contentType: "application/json",
  });
  const responseData = response.data;
  return responseData;
};

// UPDATE INVOICE STATUS UPDATE BY ID
export const UpdateInvoiceStatusByIDApi = async (data: UpdateInvoiceStatusByID, invoice_id: any) => {
  const response = await AxiosDefault({
    url: `/api/v1/invoice/status-update/${invoice_id}`,
    method: "PUT",
    data: data,
    contentType: "application/json",
  });
  const responseData = response.data;
  return responseData;
};
// DELETE INVOICE
export const DeleteInvoiceApi = async (data: DeleteInvoice) => {
  const response = await AxiosDefault({
    url: `/api/v1/invoice/delete-invoice`,
    method: "DELETE",
    data: data,
    contentType: "application/json",
  });
  const responseData = response.data;
  return responseData;
};
