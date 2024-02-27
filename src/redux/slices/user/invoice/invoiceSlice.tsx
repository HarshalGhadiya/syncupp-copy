import { DeleteInvoiceApi, GetAllInvoiceDataTableApi, GetInvoiceApi, GetInvoiceDataApi, GetInvoiceDataByIDApi, PostCreateInvoiceApi, PostDownloadInvoiceApi, PostSendInvoiceApi, UpdateInvoiceDataByIDApi, UpdateInvoiceStatusByIDApi } from "@/api/user/invoice/invoiceApis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';

type GetInvoiceApiData = {
  _id: string;
  company_name: string;
  name: string;
};
type DeleteInvoice = {
  invoiceIdsToDelete: string | string[]
}
type UpdateInvoiceStatusByID = {
  _id: string,
  invoice_id?: string,
  status: string
}
type UpdateInvoiceDataByID = {
  _id: string,
  invoice_id?: string,
  client_id: string,
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
type GetInvoiceDataClient = {
  client_id: string
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
interface PostAPIResponse {
  status: boolean;
  message: string
}

interface invoiceInitialState {
  loading: boolean;
  data: any;
  invoice: any;
  getInvoiceStatus: string;
  getInvoiceApidata: any;
  getInvoiceDataByIDdata: any;
  getInvoiceData: any;
  postCreateInvoiceData: any;
  getAllInvoiceDataTableData: any;
  postSendInvoiceData: any;
  postDownloadInvoiceData: any;
  updateInvoiceData: any;
  updateInvoiceStatusData: any;
  DeleteInvoiceData: any;
  paginationParams?: any
}

const initialState: invoiceInitialState = {
  loading: false,
  data: '',
  invoice: '',
  getInvoiceStatus: '',
  getInvoiceApidata: '',
  getInvoiceDataByIDdata: '',
  getInvoiceData: '',
  postCreateInvoiceData: '',
  getAllInvoiceDataTableData: '',
  postSendInvoiceData: '',
  postDownloadInvoiceData: '',
  updateInvoiceData: '',
  updateInvoiceStatusData: '',
  DeleteInvoiceData: '',
  paginationParams: {}
};

export const getInvoiceApi: any = createAsyncThunk(
  "invoice/getInvoiceApi",
  async (data: GetInvoiceApiData) => {
    try {
      const response: any = await GetInvoiceApi(data);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);

export const getInvoiceDataByID: any = createAsyncThunk(
  "invoice/getInvoiceDataByID",
  async (data: GetInvoiceDataByID) => {
    try {
      const response: any = await GetInvoiceDataByIDApi(data);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);

export const getInvoiceData: any = createAsyncThunk(
  "invoice/getInvoiceData",
  async (data: GetInvoiceDataClient) => {
    try {
      const response: any = await GetInvoiceDataApi(data);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);

export const postCreateInvoice: any = createAsyncThunk(
  "invoice/postCreateInvoice",
  async (data: PostCreateInvoice) => {
    try {
      const response: any = await PostCreateInvoiceApi(data);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);

export const getAllInvoiceDataTable: any = createAsyncThunk(
  "invoice/getAllInvoiceDataTable",
  async (data: GetAllInvoiceData) => {
    try {
      const response: any = await GetAllInvoiceDataTableApi(data);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);

export const postSendInvoice: any = createAsyncThunk(
  "invoice/postSendInvoice",
  async (data: SendInvoice) => {
    try {
      const response: any = await PostSendInvoiceApi(data);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);

export const postDownloadInvoice: any = createAsyncThunk(
  "invoice/postDownloadInvoice",
  async (data: DownloadInvoice) => {
    try {
      const response: any = await PostDownloadInvoiceApi(data);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);

// export const updateInvoice: any = createAsyncThunk(
//   "invoice/updateInvoice",
//   async (data: UpdateInvoiceDataByID) => {
//     const invoce_id = data?.invoice_id
//     delete data?.invoice_id;
//     try {
//       const response: any = await UpdateInvoiceDataByIDApi(data, invoce_id);
//       return response;
//     } catch (error: any) {
//       return { status: false, message: error.response.data.message } as PostAPIResponse;
//     }
//   }
// );

export const updateInvoiceStatus: any = createAsyncThunk(
  "invoice/updateInvoiceStatus",
  async (data: UpdateInvoiceStatusByID) => {
    const invoice_id = data?.invoice_id
    delete data?.invoice_id;
    // console.log("####DADADADA" , invoice_id , data)
    try {
      // const invoce_id = data?.invoice_id
      const response: any = await UpdateInvoiceStatusByIDApi(data, invoice_id);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);

export const DeleteInvoice: any = createAsyncThunk(
  "invoice/DeleteInvoice",
  async (data: DeleteInvoice) => {
    try {
      const response: any = await DeleteInvoiceApi(data);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setPagginationParams(state, action) {
      return {
        ...state,
        paginationParams: action.payload
      }
    },
    RemoveRegionalData(state) {
      return {
        ...state,
      }
    },
    RemoveinvoiceData(state) {
      return {
        ...state,
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInvoiceApi.pending, (state) => {
        return {
          ...state,
          loading: true,
          getInvoiceStatus: 'pending'
        }
      })
      .addCase(getInvoiceApi.fulfilled, (state, action) => {
        // if(action.payload.status == false){
        //     toast.error(action.payload.message)
        // } else {
        //     toast.success(action.payload.message)
        // }
        return {
          ...state,
          getInvoiceApidata: action.payload,
          loading: false,
          getInvoiceStatus: 'success'
        }
      })
      .addCase(getInvoiceApi.rejected, (state) => {
        return {
          ...state,
          loading: false,
          getInvoiceStatus: 'error'
        }
      });
    builder
      .addCase(getInvoiceDataByID.pending, (state) => {
        return {
          ...state,
          loading: true,
          getInvoiceStatus: 'pending'
        }
      })
      .addCase(getInvoiceDataByID.fulfilled, (state, action) => {
        // if(action.payload.status == false){
        //     toast.error(action.payload.message)
        // } else {
        //     toast.success(action.payload.message)
        // }
        return {
          ...state,
          getInvoiceDataByIDdata: action.payload,
          loading: false,
          getInvoiceStatus: 'success'
        }
      })
      .addCase(getInvoiceDataByID.rejected, (state) => {
        return {
          ...state,
          loading: false,
          getInvoiceStatus: 'error'
        }
      });
    builder
      .addCase(getInvoiceData.pending, (state) => {
        return {
          ...state,
          loading: true,
          getInvoiceStatus: 'pending'
        }
      })
      .addCase(getInvoiceData.fulfilled, (state, action) => {
        // if(action.payload.status == false){
        //     toast.error(action.payload.message)
        // } else {
        //     toast.success(action.payload.message)
        // }
        return {
          ...state,
          data: action.payload.data,
          loading: false,
          getInvoiceStatus: 'success'
        }
      })
      .addCase(getInvoiceData.rejected, (state) => {
        return {
          ...state,
          loading: false,
          getInvoiceStatus: 'error'
        }
      });
    builder
      .addCase(postCreateInvoice.pending, (state) => {
        return {
          ...state,
          loading: true,
          // getInvoiceStatus: 'pending'
        }
      })
      .addCase(postCreateInvoice.fulfilled, (state, action) => {
        if (action.payload.success == true) {
          toast.success(action.payload.message)
        } else {
          toast.error(action.payload.message)
        }
        return {
          ...state,
          loading: false,
          // getInvoiceStatus: 'success'
        }
      })
      .addCase(postCreateInvoice.rejected, (state) => {
        return {
          ...state,
          loading: false,
          // getInvoiceStatus: 'error'
        }
      });
    builder
      .addCase(getAllInvoiceDataTable.pending, (state) => {
        return {
          ...state,
          loading: true,
          getInvoiceStatus: 'pending'
        }
      })
      .addCase(getAllInvoiceDataTable.fulfilled, (state, action) => {
        // if(action.payload.status == false){
        //     toast.error(action.payload.message)
        // } else {
        //     toast.success(action.payload.message)
        // }
        return {
          ...state,
          data: action.payload.data,
          loading: false,
          getInvoiceStatus: 'success'
        }
      })
      .addCase(getAllInvoiceDataTable.rejected, (state) => {
        return {
          ...state,
          loading: false,
          getInvoiceStatus: 'error'
        }
      });
    builder
      .addCase(postSendInvoice.pending, (state) => {
        return {
          ...state,
          loading: true,
          getInvoiceStatus: 'pending'
        }
      })
      .addCase(postSendInvoice.fulfilled, (state, action) => {
        if (action.payload.status == false) {
          toast.error(action.payload.message)
        } else {
          toast.success(action.payload.message)
        }
        return {
          ...state,
          postSendInvoiceData: action.payload,
          loading: false,
          getInvoiceStatus: 'success'
        }
      })
      .addCase(postSendInvoice.rejected, (state) => {
        return {
          ...state,
          loading: false,
          getInvoiceStatus: 'error'
        }
      });
    builder
      .addCase(postDownloadInvoice.pending, (state) => {
        return {
          ...state,
          loading: true,
          getInvoiceStatus: 'pending'
        }
      })
      .addCase(postDownloadInvoice.fulfilled, (state, action) => {
        if (action.payload.status == false) {
          toast.error(action.payload.message)
        } else {
          toast.success(action.payload.message)
        }
        return {
          ...state,
          postDownloadInvoiceData: action.payload,
          loading: false,
          getInvoiceStatus: 'success'
        }
      })
      .addCase(postDownloadInvoice.rejected, (state) => {
        return {
          ...state,
          loading: false,
          getInvoiceStatus: 'error'
        }
      });
    // builder
    //   .addCase(updateInvoice.pending, (state) => {
    //     return {
    //       ...state,
    //       loading: true,
    //       getInvoiceStatus: 'pending'
    //     }
    //   })
    //   .addCase(updateInvoice.fulfilled, (state, action) => {
    //     if (action.payload.success === true) {
    //       toast.success(action.payload.message)
    //     } else {
    //       toast.error(action.payload.message)
    //     }
    //     return {
    //       ...state,
    //       // updateInvoiceData: action.payload,
    //       loading: false,
    //       getInvoiceStatus: 'success'
    //     }
    //   })
    //   .addCase(updateInvoice.rejected, (state) => {
    //     return {
    //       ...state,
    //       loading: false,
    //       getInvoiceStatus: 'error'
    //     }
    //   });
    builder
      .addCase(updateInvoiceStatus.pending, (state) => {
        return {
          ...state,
          loading: true,
          getInvoiceStatus: 'pending'
        }
      })
      .addCase(updateInvoiceStatus.fulfilled, (state, action) => {
        // if(action.payload.status == false){
        //     toast.error(action.payload.message)
        // } else {
        //     toast.success(action.payload.message)
        // }
        return {
          ...state,
          updateInvoiceStatusData: action.payload,
          loading: false,
          getInvoiceStatus: 'success'
        }
      })
      .addCase(updateInvoiceStatus.rejected, (state) => {
        return {
          ...state,
          loading: false,
          getInvoiceStatus: 'error'
        }
      });
    builder
      .addCase(DeleteInvoice.pending, (state) => {
        return {
          ...state,
          loading: true,
          getInvoiceStatus: 'pending'
        }
      })
      .addCase(DeleteInvoice.fulfilled, (state, action) => {
        // if(action.payload.status == false){
        //     toast.error(action.payload.message)
        // } else {
        //     toast.success(action.payload.message)
        // }
        return {
          ...state,
          DeleteInvoiceData: action.payload,
          loading: false,
          getInvoiceStatus: 'success'
        }
      })
      .addCase(DeleteInvoice.rejected, (state) => {
        return {
          ...state,
          loading: false,
          getInvoiceStatus: 'error'
        }
      });
  },
});


export const { setPagginationParams } = invoiceSlice.actions;
export default invoiceSlice.reducer;
