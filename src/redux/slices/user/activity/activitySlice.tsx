import { DeleteActivityApi, GetActivityByIdApi, GetAllActivityApi, PatchEditActivityApi, PostAddActivityApi } from "@/api/user/activity/activityApis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';

type AddActivityData = {
  title: string;
  agenda: string;
  activity_type: string;
  client_id: string;
  assign_to: string;
  due_date?: string;
  meeting_start_time?: string;
  meeting_end_time?: string;
  internal_info?: string;
  recurring_end_date?: string;
  mark_as_done?: boolean;
}

type EditActivityData = {
  _id: string;
  title: string;
  agenda: string;
  activity_type: string;
  client_id: string;
  assign_to: string;
  due_date?: string;
  meeting_start_time?: string;
  meeting_end_time?: string;
  internal_info?: string;
  recurring_end_date?: string;
  mark_as_done?: boolean;
}

type GetAllActivityData = {
  page?: number;
  items_per_page?: number;
  sort_order?: string;
  sort_field?: string;
  search?: string;
  client_id?: string;
  team_id?: string;
  agency_id?: string;
  activity_type?: string;
  filter?: any;
  pagination?: boolean;
}

type GetActivityByIdData = {
  activityId: string;
}

type DeleteActivityData = {
  activityIdsToDelete: string[];
}


interface PostAPIResponse {
  status: boolean;
  message: string
}

interface ActivityInitialState {
  loading: boolean;
  data: any;
  activity: any;
  activityName: string;
  userReferenceId: string;
  calendarView: boolean;
  paginationParams: any;
  addActivityStatus: string;
  getAllActivityStatus: string;
  getActivityStatus: string;
  editActivityStatus: string;
  deleteActivityStatus: string;
}

const initialState: ActivityInitialState = {
  loading: false,
  data: '',
  activity: '',
  activityName: '',
  userReferenceId: '',
  calendarView: false,
  paginationParams: {},
  addActivityStatus: '',
  getAllActivityStatus: '',
  getActivityStatus: '',
  editActivityStatus: '',
  deleteActivityStatus: '',
};

export const postAddActivity: any = createAsyncThunk(
  "activity/postAddActivity",
  async (data: AddActivityData) => {
    try {
      // const apiData = {
      //   title: data?.title,
      //   internal_info: data?.description,
      //   due_date: data?.due_date,
      //   client_id: data?.client,
      //   assign_to: data?.assigned,
      //   mark_as_done: data?.done
      // }
      const response: any = await PostAddActivityApi(data);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);

export const patchEditActivity: any = createAsyncThunk(
  "activity/patchEditActivity",
  async (data: EditActivityData) => {
    try {
      // const apiData = {
      //   _id: data?._id,
      //   title: data?.title,
      //   internal_info: data?.description,
      //   due_date: data?.due_date,
      //   client_id: data?.client,
      //   assign_to: data?.assigned,
      //   mark_as_done: data?.done
      // }
      const response: any = await PatchEditActivityApi(data);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);


export const getActivityById: any = createAsyncThunk(
  "activity/getActivityById",
  async (data: GetActivityByIdData) => {
    try {
      const response: any = await GetActivityByIdApi(data);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);

export const getAllActivity: any = createAsyncThunk(
  "activity/getAllActivity",
  async (data: GetAllActivityData) => {
    try {
      const response: any = await GetAllActivityApi(data);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);

export const deleteActivity: any = createAsyncThunk(
  "activity/deleteActivity",
  async (data: DeleteActivityData) => {
    try {
      const response: any = await DeleteActivityApi(data);
      return response;
    } catch (error: any) {
      return { status: false, message: error.response.data.message } as PostAPIResponse;
    }
  }
);

export const activitySlice: any = createSlice({
  name: "activity",
  initialState,
  reducers: {
    RemoveActivityData(state) {
      return {
        ...state,
        activity: ''
      }
    },
    setActivityName(state, action) {
      return {
        ...state,
        activityName: action?.payload
      }
    },
    setCalendarView(state, action) {
      return {
        ...state,
        calendarView: action.payload
      }
    },
    setPaginationDetails(state, action) {
      console.log("pagination params....", action?.payload)
      return {
        ...state,
        paginationParams: action?.payload,
      }
    },
    setActivityUserReferenceId(state, action) {
      return {
        ...state,
        userReferenceId: action?.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postAddActivity.pending, (state) => {
        return {
          ...state,
          loading: true,
          addActivityStatus: 'pending'
        }
      })
      .addCase(postAddActivity.fulfilled, (state, action) => {
        // console.log(action.payload);
        if (action.payload.status == false) {
          toast.error(action.payload.message)
        } else {
          toast.success(action.payload.message)
        }
        return {
          ...state,
          //   data: action.payload,
          loading: false,
          addActivityStatus: 'success'
        }
      })
      .addCase(postAddActivity.rejected, (state) => {
        return {
          ...state,
          loading: false,
          addActivityStatus: 'error'
        }
      });
    // new cases for Edit activity
    builder
      .addCase(patchEditActivity.pending, (state) => {
        return {
          ...state,
          loading: true,
          editActivityStatus: 'pending'
        }
      })
      .addCase(patchEditActivity.fulfilled, (state, action) => {
        // console.log(action.payload);
        if (action.payload.status == false) {
          toast.error(action.payload.message)
        } else {
          toast.success(action.payload.message)
        }
        return {
          ...state,
          //   data: action.payload,
          loading: false,
          editActivityStatus: 'success'
        }
      })
      .addCase(patchEditActivity.rejected, (state) => {
        return {
          ...state,
          loading: false,
          editActivityStatus: 'error'
        }
      });

    // new cases for get all activity
    builder
      .addCase(getAllActivity.pending, (state) => {
        return {
          ...state,
          loading: true,
          getAllActivityStatus: 'pending'
        }
      })
      .addCase(getAllActivity.fulfilled, (state, action) => {
        // console.log(action.payload);
        if (action.payload.status === false) {
          toast.error(action.payload.message)
        }
        return {
          ...state,
          data: action?.payload?.data,
          loading: false,
          getAllActivityStatus: 'success'
        }
      })
      .addCase(getAllActivity.rejected, (state) => {
        return {
          ...state,
          loading: false,
          getAllActivityStatus: 'error'
        }
      });
    // new cases for get activity by Id
    builder
      .addCase(getActivityById.pending, (state) => {
        return {
          ...state,
          loading: true,
          getActivityStatus: 'pending'
        }
      })
      .addCase(getActivityById.fulfilled, (state, action) => {
        // console.log(action.payload);
        // if(action.payload.status == false){
        //     toast.error(action.payload.message)
        // } else {
        //     toast.success(action.payload.message)
        // }
        return {
          ...state,
          activity: action?.payload?.data,
          loading: false,
          getActivityStatus: 'success'
        }
      })
      .addCase(getActivityById.rejected, (state) => {
        return {
          ...state,
          loading: false,
          getActivityStatus: 'error'
        }
      });
    // new cases for delete activity
    builder
      .addCase(deleteActivity.pending, (state) => {
        return {
          ...state,
          loading: true,
          deleteActivityStatus: 'pending'
        }
      })
      .addCase(deleteActivity.fulfilled, (state, action) => {
        // console.log(action.payload);
        if (action.payload.status == false) {
          toast.error(action.payload.message)
          return {
            ...state,
            //   data: action.payload,
            loading: false,
            deleteActivityStatus: 'error'
          }
        } else {
          toast.success(action.payload.message)
          return {
            ...state,
            //   data: action.payload,
            loading: false,
            deleteActivityStatus: 'success'
          }
        }
      })
      .addCase(deleteActivity.rejected, (state) => {
        return {
          ...state,
          loading: false,
          deleteActivityStatus: 'error'
        }
      });
  },
});

export const { RemoveActivityData, setActivityName, setCalendarView, setPaginationDetails, setActivityUserReferenceId } = activitySlice.actions;
export default activitySlice.reducer;
