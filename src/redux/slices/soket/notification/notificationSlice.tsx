import {
  GetAllNotification,
  ReadNotification,
} from '@/commonAPIs/socketAPIs/notification/notificationAPIs';
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

interface NotificationInitialState {
  loading: boolean;
  notification: any;
  un_read_noti: any;
  updatepage_notification: any;
}
interface NotificationDataResponse {
  status: boolean;
  message: string;
  un_read_noti: any;
}

const initialState: NotificationInitialState = {
  loading: false,
  notification: [],
  updatepage_notification: [],
  un_read_noti: '',
};
export const getAllnotification: any = createAsyncThunk(
  'notification/getAllnotification',
  async (data: any) => {
    try {
      const response: any = await GetAllNotification(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as NotificationDataResponse;
    }
  }
);
//read notification
export const readnotification: any = createAsyncThunk(
  'notification/readnotification',
  async (data: any) => {
    try {
      const response: any = await ReadNotification(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as NotificationDataResponse;
    }
  }
);
export const clearData = createAction('notification/clearState');
export const receiveNotification = createAction<any>(
  'notification/receiveNotification'
);

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    RemoveFaqData(state) {
      return {
        ...state,
        notification: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(receiveNotification, (state, action) => {
      const newNotification = action.payload;
      return {
        ...state,
        notification: [newNotification.notification, ...state.notification],
        un_read_noti: newNotification.un_read_count,
      };
    });
    builder.addCase(clearData, (state) => {
      return {
        ...state,
        notification: [],
      };
    });
    builder
      .addCase(getAllnotification.pending, (state) => {
        return {
          ...state,
          loading: true,
          getFaqStatus: 'pending',
        };
      })
      .addCase(getAllnotification.fulfilled, (state, action) => {
        console.log('action', action.payload.data.notificationList);
        if (action.payload.status == true) {
          toast.error(action.payload.message);
        }

        return {
          ...state,
          notification: action.payload.data.notificationList,
          un_read_noti: action.payload.data.un_read_count,
          loading: false,
          getFaqStatus: 'success',
        };
      })
      .addCase(getAllnotification.rejected, (state) => {
        return {
          ...state,
          loading: false,
          getFaqStatus: 'error',
        };
      });

    //read notification
    builder
      .addCase(readnotification.pending, (state) => {
        return {
          ...state,
          getFaqStatus: 'pending',
        };
      })
      .addCase(readnotification.fulfilled, (state, action) => {
        if (action.payload.status == true) {
          toast.error(action.payload.message);
        }

        return {
          ...state,
          getFaqStatus: 'success',
        };
      })
      .addCase(readnotification.rejected, (state) => {
        return {
          ...state,
          getFaqStatus: 'error',
        };
      });
  },
});

export const { RemoveFaqData } = notificationSlice.actions;
export default notificationSlice.reducer;
