import {
  DeleteClientApi,
  GetAllCityApi,
  GetAllClientApi,
  GetAllCountryApi,
  GetAllStateApi,
  GetClientAgenciesApi,
  GetClientByIdApi,
  PatchEditClientApi,
  PostAddClientApi,
  PostClientRedirectApi,
  PostVerifyClientApi,
} from '@/api/user/client/clientApis';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

type AddClientData = {
  first_name: string;
  last_name: string;
  email: string;
  company_name: string;
  company_website?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  title?: string;
  contact_number?: string;
};

type EditClientData = {
  clientId: string;
  first_name: string;
  last_name: string;
  email: string;
  company_name: string;
  company_website?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  title?: string;
  contact_number?: string;
};

type VerifyClientData = {
  email: string;
  agency_id: string;
  password?: string;
  // first_name?: string;
  // last_name?: string;
  redirect: boolean;
};

type RedirectClientData = {
  email: string;
};

type GetAllClientData = {
  page?: number;
  items_per_page?: number;
  sort_order?: string;
  sort_field?: string;
  search?: string;
  pagination?: boolean;
  for_activity?: boolean;
};

type GetClientByIdData = {
  clientId: string;
};

type DeleteClientData = {
  client_ids: string[];
};

type MasterData = {
  search?: string;
  stateId?: string;
  countryId?: string;
};
interface PostAPIResponse {
  status: boolean;
  message: string;
}
interface ClientInitialState {
  loading: boolean;
  data: any;
  client: any;
  countries: any;
  clientList: any;
  states: any;
  cities: any;
  agencies: any;
  redirect: any;
  agencyId: string;
  agencyName: string;
  clientId: string;
  clientName: string;
  clientProfile: string;
  clientTeamId: string;
  addClientStatus: string;
  verifyClientStatus: string;
  clientRedirectStatus: string;
  getAllClientStatus: string;
  getClientStatus: string;
  editClientStatus: string;
  deleteClientStatus: string;
  getClientProfileStatus: string;
  addClientdetails: any;
  paginationParams?: any;
}

const initialState: ClientInitialState = {
  loading: false,
  data: '',
  client: '',
  clientList: '',
  countries: '',
  states: '',
  cities: '',
  redirect: '',
  agencies: '',
  agencyId: '',
  agencyName: '',
  clientId: '',
  clientName: '',
  clientProfile: '',
  clientTeamId: '',
  addClientStatus: '',
  verifyClientStatus: '',
  clientRedirectStatus: '',
  getAllClientStatus: '',
  getClientStatus: '',
  editClientStatus: '',
  deleteClientStatus: '',
  getClientProfileStatus: '',
  addClientdetails: {},
  paginationParams: {},
};

export const postAddClient: any = createAsyncThunk(
  'client/postAddClient',
  async (data: AddClientData) => {
    try {
      const response: any = await PostAddClientApi(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as PostAPIResponse;
    }
  }
);

export const postVerifyClient: any = createAsyncThunk(
  'client/postVerifyClient',
  async (data: VerifyClientData) => {
    try {
      const response: any = await PostVerifyClientApi(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
        code: error.response.data.status,
      } as any;
    }
  }
);

export const postClientRedirect: any = createAsyncThunk(
  'client/postClientRedirect',
  async (data: RedirectClientData) => {
    try {
      const response: any = await PostClientRedirectApi(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as PostAPIResponse;
    }
  }
);

export const patchEditClient: any = createAsyncThunk(
  'client/patchEditClient',
  async (data: EditClientData) => {
    try {
      const response: any = await PatchEditClientApi(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as PostAPIResponse;
    }
  }
);

export const getAllClient: any = createAsyncThunk(
  'client/getAllClient',
  async (data: GetAllClientData) => {
    try {
      const response: any = await GetAllClientApi(data);
      return { response: response, pagination: data?.pagination };
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as PostAPIResponse;
    }
  }
);

export const getClientById: any = createAsyncThunk(
  'client/getClientById',
  async (data: GetClientByIdData) => {
    try {
      const response: any = await GetClientByIdApi(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as PostAPIResponse;
    }
  }
);

export const deleteClient: any = createAsyncThunk(
  'client/deleteClient',
  async (data: DeleteClientData) => {
    try {
      const response: any = await DeleteClientApi(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as PostAPIResponse;
    }
  }
);

export const getCountry: any = createAsyncThunk(
  'client/getCountry',
  async (data: MasterData) => {
    try {
      const response: any = await GetAllCountryApi(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as PostAPIResponse;
    }
  }
);

export const getState: any = createAsyncThunk(
  'client/getState',
  async (data: MasterData) => {
    try {
      const response: any = await GetAllStateApi(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as PostAPIResponse;
    }
  }
);

export const getCities: any = createAsyncThunk(
  'client/getCities',
  async (data: MasterData) => {
    try {
      const response: any = await GetAllCityApi(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as PostAPIResponse;
    }
  }
);

export const getClientAgencies: any = createAsyncThunk(
  'client/getClientAgencies',
  async () => {
    try {
      const response: any = await GetClientAgenciesApi();
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as PostAPIResponse;
    }
  }
);

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    RemoveRegionalData(state) {
      return {
        ...state,
        // countries: '',
        states: '',
        cities: '',
      };
    },
    RemoveClientData(state) {
      return {
        ...state,
        client: '',
      };
    },
    setAgencyId(state, action) {
      return {
        ...state,
        agencyId: action.payload,
      };
    },
    setPagginationParams(state, action) {
      return {
        ...state,
        paginationParams: action.payload,
      };
    },
    setAgencyName(state, action) {
      return {
        ...state,
        agencyName: action.payload,
      };
    },
    setClientId(state, action) {
      return {
        ...state,
        clientId: action.payload,
      };
    },
    setClientName(state, action) {
      return {
        ...state,
        clientName: action.payload,
      };
    },
    setClientTeamId(state, action) {
      return {
        ...state,
        clientTeamId: action.payload,
      };
    },
    setUserReferenceId(state, action) {
      return {
        ...state,
        addClientdetails: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postAddClient.pending, (state) => {
        return {
          ...state,
          loading: true,
          addClientStatus: 'pending',
        };
      })
      .addCase(postAddClient.fulfilled, (state, action) => {
        if (action.payload.status == false) {
          toast.error(action.payload.message);
        } else {
          // toast.success(action.payload.message)
        }
        return {
          ...state,
          addClientdetails: action.payload,
          loading: false,
          addClientStatus: 'success',
        };
      })
      .addCase(postAddClient.rejected, (state) => {
        return {
          ...state,
          loading: false,
          addClientStatus: 'error',
        };
      });
    // new cases for Verify client
    builder
      .addCase(postVerifyClient.pending, (state) => {
        return {
          ...state,
          loading: true,
          verifyClientStatus: 'pending',
        };
      })
      .addCase(postVerifyClient.fulfilled, (state, action) => {
        if (action.payload.status == false) {
          toast.error(action.payload.message);
        } else {
          toast.success(action.payload.message);
        }
        return {
          ...state,
          //   data: action.payload,
          loading: false,
          verifyClientStatus: 'success',
        };
      })
      .addCase(postVerifyClient.rejected, (state) => {
        return {
          ...state,
          loading: false,
          verifyClientStatus: 'error',
        };
      });
    // new cases for client redirect
    builder
      .addCase(postClientRedirect.pending, (state) => {
        return {
          ...state,
          loading: true,
          clientRedirectStatus: 'pending',
        };
      })
      .addCase(postClientRedirect.fulfilled, (state, action) => {
        return {
          ...state,
          redirect: action?.payload?.data?.password_required,
          loading: false,
          clientRedirectStatus: 'success',
        };
      })
      .addCase(postClientRedirect.rejected, (state) => {
        return {
          ...state,
          loading: false,
          clientRedirectStatus: 'error',
        };
      });
    // new cases for Edit client
    builder
      .addCase(patchEditClient.pending, (state) => {
        return {
          ...state,
          loading: true,
          editClientStatus: 'pending',
        };
      })
      .addCase(patchEditClient.fulfilled, (state, action) => {
        if (action.payload.status == false) {
          toast.error(action.payload.message);
        } else {
          toast.success(action.payload.message);
        }
        return {
          ...state,
          //   data: action.payload,
          loading: false,
          editClientStatus: 'success',
        };
      })
      .addCase(patchEditClient.rejected, (state) => {
        return {
          ...state,
          loading: false,
          editClientStatus: 'error',
        };
      });

    // new cases for get all client
    builder
      .addCase(getAllClient.pending, (state) => {
        return {
          ...state,
          loading: true,
          getAllClientStatus: 'pending',
        };
      })
      .addCase(getAllClient.fulfilled, (state, action) => {
        if (action?.payload?.status == false) {
          toast.error(action.payload.message);
          return {
            ...state,
            loading: false,
          };
        } else if (action?.payload?.pagination) {
          return {
            ...state,
            data: action?.payload?.response?.data,
            loading: false,
            getAllClientStatus: 'success',
          };
        } else {
          const fullName =
          (action?.payload?.response?.data[0]?.first_name.charAt(0).toUpperCase() + action?.payload?.response?.data[0]?.first_name.slice(1)) +
          ' ' +
          (action?.payload?.response?.data[0]?.last_name.charAt(0).toUpperCase() + action?.payload?.response?.data[0]?.last_name.slice(1));
          return {
            ...state,
            loading: false,
            clientList: action?.payload?.response?.data,
            clientId: action?.payload?.response?.data[0]?.reference_id,
            clientName: fullName === 'NaN NaN' ? '' : fullName,
          };
        }
      })
      .addCase(getAllClient.rejected, (state) => {
        return {
          ...state,
          loading: false,
          getAllClientStatus: 'error',
        };
      });
    // new cases for get client
    builder
      .addCase(getClientById.pending, (state) => {
        return {
          ...state,
          loading: true,
          getClientStatus: 'pending',
        };
      })
      .addCase(getClientById.fulfilled, (state, action) => {
        // if(action.payload.status == false){
        //     toast.error(action.payload.message)
        // } else {
        //     toast.success(action.payload.message)
        // }
        return {
          ...state,
          client: action?.payload?.data,
          clientProfile: action?.payload?.data,
          loading: false,
          getClientStatus: 'success',
        };
      })
      .addCase(getClientById.rejected, (state) => {
        return {
          ...state,
          loading: false,
          getClientStatus: 'error',
        };
      });
    // new cases for delete client
    builder
      .addCase(deleteClient.pending, (state) => {
        return {
          ...state,
          loading: true,
          deleteClientStatus: 'pending',
        };
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        if (action.payload.status == false) {
          toast.error(action.payload.message);
          return {
            ...state,
            //   data: action.payload,
            loading: false,
            deleteClientStatus: 'error',
          };
        } else {
          if (action.payload.message) {
            toast.success(action.payload.message);
          }

          return {
            ...state,
            //   data: action.payload,
            loading: false,
            deleteClientStatus: 'success',
          };
        }
      })
      .addCase(deleteClient.rejected, (state) => {
        return {
          ...state,
          loading: false,
          deleteClientStatus: 'error',
        };
      });
    // new cases for get countries
    builder.addCase(getCountry.fulfilled, (state, action) => {
      return {
        ...state,
        countries: action.payload.data,
      };
    });
    // new cases for get states
    builder.addCase(getState.fulfilled, (state, action) => {
      return {
        ...state,
        states: action.payload.data,
      };
    });
    // new cases for get cities
    builder.addCase(getCities.fulfilled, (state, action) => {
      return {
        ...state,
        cities: action.payload.data,
      };
    });
    // new cases for get agencies list
    builder.addCase(getClientAgencies.fulfilled, (state, action) => {
      const fullName =
        (action?.payload?.data[0]?.first_name.charAt(0).toUpperCase() + action?.payload?.data[0]?.first_name.slice(1)) +
        ' ' +
        (action?.payload?.data[0]?.last_name.charAt(0).toUpperCase() + action?.payload?.data[0]?.last_name.slice(1));
      return {
        ...state,
        agencies: action?.payload?.data,
        agencyId: action?.payload?.data[0]?.reference_id,
        agencyName: fullName,
      };
    });
  },
});

export const {
  RemoveRegionalData,
  RemoveClientData,
  setAgencyId,
  setAgencyName,
  setClientId,
  setClientName,
  setPagginationParams,
  setClientTeamId,
  setUserReferenceId,
} = clientSlice.actions;
export default clientSlice.reducer;
