import { putTaskStatusChangeApi } from "@/api/user/task/taskApis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';



type putTaskKanbanStatusChangeData = {
  _id: string;
  status: string;
}

interface PostAPIResponse {
  status: boolean;
  message: string
}

interface TaskStatusInitialState {
  loading: boolean;
  data: any;
}

const initialState: TaskStatusInitialState = {
  loading: false,
  data: '',
};

export const putTaskKanbanStatusChange: any = createAsyncThunk(
    "taskStatus/putTaskKanbanStatusChange",
    async (data: any) => {
      try {
        const response: putTaskKanbanStatusChangeData = await putTaskStatusChangeApi(data);
        return response;
      } catch (error: any) {
        return { status: false, message: error.response.data.message } as PostAPIResponse;
      }
    }
  );

export const taskSlice: any = createSlice({
  name: "taskStatus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // new cases for update task status
    builder
      .addCase(putTaskKanbanStatusChange.pending, (state) => {
        return {
          ...state,
          loading: true,
        }
      })
      .addCase(putTaskKanbanStatusChange.fulfilled, (state, action) => {
        // console.log(action.payload);
        if (action.payload.status == false) {
          toast.error(action.payload.message)
          return {
            ...state,
            //   data: action.payload,
            loading: false,
          }
        } else {
          toast.success(action.payload.message)
          return {
            ...state,
            //   data: action.payload,
            loading: false,
          }
        }
      })
      .addCase(putTaskKanbanStatusChange.rejected, (state) => {
        return {
          ...state,
          loading: false,
        }
      });
  },
});

export default taskSlice.reducer;
