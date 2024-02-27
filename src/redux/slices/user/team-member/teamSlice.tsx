import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import {
  DeleteTeamMemberApi,
  GetAllTeamMemberApi,
  GetTeamMemberProfileApi,
  MemberStatusChangeApi,
  PostAddTeamMemberApi,
  PostTeamMemberVerifyApi,
  PutEditTeamMemberApi,
  RefferalPaymentApi,
  RefferalPaymentStatisticsApi,
} from '@/api/user/team-member/teamApis';

type TeamData = {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  contact_number?: string;
  role?: string;
  sort_field?: string;
  sort_order?: string;
  page?: any;
  items_per_page?: number;
  search?: string;
  agency_id?: string;
  client_id?: string;
  pagination?: boolean;
  client_team?: boolean;
};

type DeleteTeamMemberData = {
  teamMemberIds: string[];
  agency_id?: string;
};

type RefferalPaymentData = {
  user_id: string;
  without_referral?: boolean;
}

type GetTeamMemberProfileApiData = {
  _id: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  first_name: string;
  last_name: string;
  user_type: string;
  agency_id: string;
  member_role: string;
};

type PostTeamMemberVerifyData = {
  email: string;
  agency_id: string;
  redirect: boolean;
  token?: string;
  client_id?: string;
  password?: string;
  // first_name?: string;
  // last_name?: string;
};

type StatusChange = {
  id: string;
};

interface TeamMemberDataResponse {
  status: boolean;
  message: string;
}

const initialState = {
  loading: false,
  user: {},
  data: [],
  teamMember: '',
  clientId: '',
  clientName: '',
  teamList: '',
  teamMemberProfile: '',
  refferalStatisticsData: '',
  getAllTeamMemberStatus: '',
  addTeamMemberStatus: '',
  editTeamMemberStatus: '',
  deleteTeamMemberStatus: '',
  getTeamMemberProfileStatus: '',
  verifyTeamMemberStatus: '',
  paginationParams: '',
  addClientteamdetails: '',
  getRefferalStatisticsStatus: '',
  postRefferalPaymentStatus: '',
};

export const addTeamMember: any = createAsyncThunk(
  'team/addTeamMember',
  async (data: TeamData) => {
    const apiData = {
      id: data._id,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      contact_number: data.contact_number,
      role: data.role,
      agency_id: data?.agency_id,
    };
    try {
      const response: any = await PostAddTeamMemberApi(apiData);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as TeamMemberDataResponse;
    }
  }
);

export const clientteamStatuschange: any = createAsyncThunk(
  'team/clientteamStatuschange',
  async (data: StatusChange) => {
    try {
      const response: any = await MemberStatusChangeApi(data);
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

export const verifyTeamMember: any = createAsyncThunk(
  'team/verifyTeamMember',
  async (data: PostTeamMemberVerifyData) => {
    try {
      const response: any = await PostTeamMemberVerifyApi(data);
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

export const editTeamMember: any = createAsyncThunk(
  'team/editTeamMember',
  async (data: TeamData) => {
    const apiData = {
      id: data._id,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      contact_number: data.contact_number,
      role: data.role,
      agency_id: data?.agency_id,
    };
    try {
      const response: any = await PutEditTeamMemberApi(apiData);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as TeamMemberDataResponse;
    }
  }
);
export const getAllTeamMember: any = createAsyncThunk(
  'teamMember/getAllTeamMember',
  async (data: TeamData) => {
    try {
      const response: any = await GetAllTeamMemberApi(data);
      return { response: response, pagination: data?.pagination };
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as TeamMemberDataResponse;
    }
  }
);
export const getTeamMemberProfile: any = createAsyncThunk(
  'teamMember/getTeamMemberProfile',
  async (data: GetTeamMemberProfileApiData) => {
    const apiData = {
      _id: data?._id,
      name: data?.name,
      email: data?.email,
      status: data?.status,
      createdAt: data?.createdAt,
      updatedAt: data?.updatedAt,
      first_name: data?.first_name,
      last_name: data?.last_name,
      user_type: data?.user_type,
      agency_id: data?.agency_id,
      member_role: data?.member_role,
    };
    try {
      const response: any = await GetTeamMemberProfileApi(apiData);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as TeamMemberDataResponse;
    }
  }
);
export const deleteTeamMember: any = createAsyncThunk(
  'teamMember/deleteTeamMember',
  async (data: DeleteTeamMemberData) => {
    try {
      const apiData = {
        teamMemberIds: data.teamMemberIds,
        agency_id: data?.agency_id,
      };
      const response: any = await DeleteTeamMemberApi(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as TeamMemberDataResponse;
    }
  }
);

export const refferalPaymentStatistics: any = createAsyncThunk(
  'teamMember/refferalPaymentStatistics',
  async () => {
    try {
      const response: any = await RefferalPaymentStatisticsApi();
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as TeamMemberDataResponse;
    }
  }
);

export const refferalPayment: any = createAsyncThunk(
  'teamMember/refferalPayment',
  async (data: RefferalPaymentData ) => {
    try {
      const response: any = await RefferalPaymentApi(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as TeamMemberDataResponse;
    }
  }
);

export const teamSlice = createSlice({
  name: 'teamMember',
  initialState,
  reducers: {
    RemoveTeamMemberData(state) {
      return {
        ...state,
        teamMember: '',
      };
    },
    setPagginationParams(state, action) {
      return {
        ...state,
        paginationParams: action.payload,
      };
    },
    setUserReferenceId(state, action) {
      return {
        ...state,
        addClientteamdetails: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTeamMember.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          addTeamMemberStatus: 'pending',
        };
      })
      .addCase(addTeamMember.fulfilled, (state, action) => {
        if (action?.payload?.status === false) {
          toast.error(action.payload.message);
        }
        return {
          ...state,
          addClientteamdetails: action.payload,
          loading: false,
          addTeamMemberStatus: 'success',
        };
      })
      .addCase(addTeamMember.rejected, (state) => {
        return {
          ...state,
          loading: false,
          addTeamMemberStatus: 'error',
        };
      });

    // new cases for verify team member
    builder
      .addCase(verifyTeamMember.pending, (state) => {
        return {
          ...state,
          loading: true,
          verifyTeamMemberStatus: 'pending',
        };
      })
      .addCase(verifyTeamMember.fulfilled, (state, action) => {
        if (action.payload.success == true) {
          toast.success(action.payload.message);
          localStorage.clear();
        } else {
          toast.error(action.payload.message);
        }
        return {
          ...state,
          // user: action.payload,
          loading: false,
          verifyTeamMemberStatus: 'success',
        };
      })
      .addCase(verifyTeamMember.rejected, (state) => {
        return {
          ...state,
          loading: false,
          verifyTeamMemberStatus: 'error',
        };
      });
    // new cases for edit team member
    builder
      .addCase(editTeamMember.pending, (state) => {
        return {
          ...state,
          loading: true,
          editTeamMemberStatus: 'pending',
        };
      })
      .addCase(editTeamMember.fulfilled, (state, action) => {
        if (action.payload.success == true) {
          toast.success(action.payload.message);
        } else {
          toast.error(action.payload.message);
        }
        return {
          ...state,
          // user: action.payload,
          loading: false,
          editTeamMemberStatus: 'success',
        };
      })
      .addCase(editTeamMember.rejected, (state) => {
        return {
          ...state,
          loading: false,
          editTeamMemberStatus: 'error',
        };
      });
    // new cases for get all team member
    builder
      .addCase(getAllTeamMember.pending, (state) => {
        return {
          ...state,
          loading: true,
          getAllTeamMemberStatus: 'pending',
        };
      })
      .addCase(getAllTeamMember.fulfilled, (state, action) => {
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
            getAllTeamMemberStatus: 'success',
          };
        } else {
          return {
            ...state,
            loading: false,
            teamList: action?.payload?.response?.data,
          };
        }
      })
      .addCase(getAllTeamMember.rejected, (state) => {
        return {
          ...state,
          loading: false,
          getAllTeamMemberStatus: 'error',
        };
      });

    //clientteamMembers Status change

    builder
      .addCase(clientteamStatuschange.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(clientteamStatuschange.fulfilled, (state, action) => {
        if (action?.payload?.status === false) {
          toast.error(action.payload.message);
        } else {
          toast.success(action.payload.message);
        }
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(clientteamStatuschange.rejected, (state) => {
        return {
          ...state,
          loading: false,
        };
      });

    // new cases for get team member profile
    builder
      .addCase(getTeamMemberProfile.pending, (state) => {
        return {
          ...state,
          loading: true,
          getTeamMemberProfileStatus: 'pending',
        };
      })
      .addCase(getTeamMemberProfile.fulfilled, (state, action) => {
        return {
          ...state,
          teamMember: action.payload.data,
          teamMemberProfile: action.payload.data,
          loading: false,
          getTeamMemberProfileStatus: 'success',
        };
      })
      .addCase(getTeamMemberProfile.rejected, (state) => {
        return {
          ...state,
          loading: false,
          getTeamMemberProfileStatus: 'error',
        };
      });

    // new cases for delete team member profile
    builder
      .addCase(deleteTeamMember.pending, (state) => {
        return {
          ...state,
          loading: true,
          deleteTeamMemberStatus: 'pending',
        };
      })
      .addCase(deleteTeamMember.fulfilled, (state, action) => {
        if (action.payload.status == false) {
          toast.error(action.payload.message);
          return {
            ...state,
            //   data: action.payload,
            loading: false,
            deleteTeamMemberStatus: 'error',
          };
        } else {
          if (action.payload.message) {
            toast.success(action.payload.message);
          }
          return {
            ...state,
            //   data: action.payload,
            loading: false,
            deleteTeamMemberStatus: 'success',
          };
        }
      })
      .addCase(deleteTeamMember.rejected, (state) => {
        return {
          ...state,
          loading: false,
          deleteTeamMemberStatus: 'error',
        };
      });

      // new cases for refferal payment statistics 
    builder
    .addCase(refferalPaymentStatistics.pending, (state) => {
      return {
        ...state,
        loading: true,
        getRefferalStatisticsStatus: 'pending',
      };
    })
    .addCase(refferalPaymentStatistics.fulfilled, (state, action) => {
      if (action.payload.status == false) {
        toast.error(action.payload.message);
        return {
          ...state,
          //   data: action.payload,
          loading: false,
          getRefferalStatisticsStatus: 'error',
        };
      } else {
        // if (action.payload.message) {
        //   toast.success(action.payload.message);
        // }
        return {
          ...state,
          refferalStatisticsData: action?.payload?.data,
          loading: false,
          getRefferalStatisticsStatus: 'success',
        };
      }
    })
    .addCase(refferalPaymentStatistics.rejected, (state) => {
      return {
        ...state,
        loading: false,
        getRefferalStatisticsStatus: 'error',
      };
    });

     // new cases for refferal payment 
     builder
     .addCase(refferalPayment.pending, (state) => {
       return {
         ...state,
         loading: true,
         postRefferalPaymentStatus: 'pending',
       };
     })
     .addCase(refferalPayment.fulfilled, (state, action) => {
        // console.log("refferalPayment api response", action?.payload)
       if (action.payload.status == false) {
         toast.error(action.payload.message);
         return {
           ...state,
           //   data: action.payload,
           loading: false,
           postRefferalPaymentStatus: 'error',
         };
       } else {
        //  if (action.payload.message) {
        //    toast.success(action.payload.message);
        //  }
         if (action.payload.data.success === true) {
          toast.success(action.payload.message);
        } else {
          toast.error(action.payload.message);
        }
         return {
           ...state,
           loading: false,
           //   data: action.payload,
           postRefferalPaymentStatus: 'success',
         };
       }
     })
     .addCase(refferalPayment.rejected, (state) => {
       return {
         ...state,
         loading: false,
         postRefferalPaymentStatus: 'error',
       };
     });

  },
});

export const { RemoveTeamMemberData, setPagginationParams, setUserReferenceId } = teamSlice.actions;
export default teamSlice.reducer;
