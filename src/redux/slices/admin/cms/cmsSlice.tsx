import {
  EditCmsAboutus,
  EditCmsConatctUs,
  EditCmsPricingPaln,
  EditCmsPrivacyPolicy,
  EditCmscancellation,
  EditCmsshipping,
  GetCmsAboutus,
  GetCmsConatctUS,
  GetCmsPricingPlan,
  GetCmsPrivacyPolicy,
  GetCmsTermscondition,
  PostTermAndCondotionEnroll,
  getCmscancellation,
  getCmsshipping,
} from '@/api/admin/cms/cmsApis';
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

type AddTermAndConditionData = {
  _id?: string;
  title: string;
  description?: string;
};
interface FaqDataResponse {
  status: boolean;
  message: string;
}
interface TermAndConditionInitialState {
  loading: boolean;
  _id: string;
  title: string;
  description?: string;
  data: any;
  addTermAndConditionStatus: any;
  conatcUSdata: any;
}
const initialState: TermAndConditionInitialState = {
  loading: false,
  _id: '',
  title: '',
  description: '',
  data: [],
  addTermAndConditionStatus: '',
  conatcUSdata: '',
};

export const postAddTermAndCondition: any = createAsyncThunk(
  'cms/postAddTermAndCondition',
  async (data: AddTermAndConditionData) => {
    try {
      const response: any = await PostTermAndCondotionEnroll(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as FaqDataResponse;
    }
  }
);

export const Gettermsandcondition: any = createAsyncThunk(
  'cms/gettems',
  async (data: any) => {
    try {
      const response: any = await GetCmsTermscondition();
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as FaqDataResponse;
    }
  }
);
export const GetAboutUS: any = createAsyncThunk(
  'cms/getaboutus',
  async (data: any) => {
    try {
      const response: any = await GetCmsAboutus();
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as FaqDataResponse;
    }
  }
);
export const EditAboutUs: any = createAsyncThunk(
  'cms/editaboutus',
  async (data: any) => {
    try {
      const response: any = await EditCmsAboutus(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as FaqDataResponse;
    }
  }
);

export const Getpricingplan: any = createAsyncThunk(
  'cms/getpricingplan',
  async (data: any) => {
    try {
      const response: any = await GetCmsPricingPlan();
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as FaqDataResponse;
    }
  }
);
export const Editpricingplan: any = createAsyncThunk(
  'cms/editpricingplan',
  async (data: any) => {
    try {
      const response: any = await EditCmsPricingPaln(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as FaqDataResponse;
    }
  }
);

export const EditContactUS: any = createAsyncThunk(
  'cms/editconatcus',
  async (data: any) => {
    try {
      const response: any = await EditCmsConatctUs(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as FaqDataResponse;
    }
  }
);
export const GetConatcus: any = createAsyncThunk(
  'cms/getconatcus',
  async (data: any) => {
    try {
      const response: any = await GetCmsConatctUS();
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as FaqDataResponse;
    }
  }
);

export const EditPrivacy: any = createAsyncThunk(
  'cms/editPrivacy',
  async (data: any) => {
    try {
      const response: any = await EditCmsPrivacyPolicy(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as FaqDataResponse;
    }
  }
);
export const Editcancllation: any = createAsyncThunk(
  'cms/editcancellation',
  async (data: any) => {
    try {
      const response: any = await EditCmscancellation(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as FaqDataResponse;
    }
  }
);
export const Getcancelation: any = createAsyncThunk(
  'cms/getgetcancellation',
  async (data: any) => {
    try {
      const response: any = await getCmscancellation();
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as FaqDataResponse;
    }
  }
);
export const Editshipping: any = createAsyncThunk(
  'cms/editshipping',
  async (data: any) => {
    try {
      const response: any = await EditCmsshipping(data);
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as FaqDataResponse;
    }
  }
);
export const Getshipping: any = createAsyncThunk(
  'cms/getshipping',
  async (data: any) => {
    try {
      const response: any = await getCmsshipping();
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as FaqDataResponse;
    }
  }
);

export const GetPrivacy: any = createAsyncThunk(
  'cms/getgetPRivacy',
  async (data: any) => {
    try {
      const response: any = await GetCmsPrivacyPolicy();
      return response;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as FaqDataResponse;
    }
  }
);
export const cleardata = createAction('cms/clearState');
export const cmsSlice = createSlice({
  name: 'cms',
  initialState,
  reducers: {
    RemoveFaqData(state) {
      return {
        ...state,
        faqData: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(cleardata, (state) => {
      return {
        ...state,
        conatcUSdata: '',
      };
    });
    //get about us
    builder
      .addCase(GetAboutUS.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(GetAboutUS.fulfilled, (state, action) => {
        return {
          ...state,
          // data: action.payload,
          loading: false,
          conatcUSdata: action.payload,
        };
      })
      .addCase(GetAboutUS.rejected, (state) => {
        return {
          ...state,
          loading: false,
          addTermAndConditionStatus: 'error',
        };
      });
    //edit cancellation
    builder
      .addCase(Editcancllation.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(Editcancllation.fulfilled, (state, action) => {
        if (action.payload.status == true) {
          toast.error(action.payload.message);
        } else {
          toast.success(action.payload.message);
        }
        return {
          ...state,
          // data: action.payload,
          loading: false,
        };
      })
      .addCase(Editcancllation.rejected, (state) => {
        return {
          ...state,
          loading: false,
          addTermAndConditionStatus: 'error',
        };
      });

    //get pricing plan
    builder
      .addCase(Getpricingplan.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(Getpricingplan.fulfilled, (state, action) => {
        return {
          ...state,
          // data: action.payload,
          loading: false,
          conatcUSdata: action.payload,
        };
      })
      .addCase(Getpricingplan.rejected, (state) => {
        return {
          ...state,
          loading: false,
          addTermAndConditionStatus: 'error',
        };
      });
    //edit cancellation
    builder
      .addCase(Editpricingplan.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(Editpricingplan.fulfilled, (state, action) => {
        if (action.payload.status == true) {
          toast.error(action.payload.message);
        } else {
          toast.success(action.payload.message);
        }
        return {
          ...state,
          // data: action.payload,
          loading: false,
        };
      })
      .addCase(Editpricingplan.rejected, (state) => {
        return {
          ...state,
          loading: false,
          addTermAndConditionStatus: 'error',
        };
      });

    //edit shipping
    builder
      .addCase(Editshipping.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(Editshipping.fulfilled, (state, action) => {
        if (action.payload.status == true) {
          toast.error(action.payload.message);
        } else {
          toast.success(action.payload.message);
        }
        return {
          ...state,
          // data: action.payload,
          loading: false,
        };
      })
      .addCase(Editshipping.rejected, (state) => {
        return {
          ...state,
          loading: false,
          addTermAndConditionStatus: 'error',
        };
      });
    //get cancellation

    builder
      .addCase(Getcancelation.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(Getcancelation.fulfilled, (state, action) => {
        return {
          ...state,
          // data: action.payload,
          loading: false,
          conatcUSdata: action.payload,
        };
      })
      .addCase(Getcancelation.rejected, (state) => {
        return {
          ...state,
          loading: false,
          addTermAndConditionStatus: 'error',
        };
      });

    //get shipping
    builder
      .addCase(Getshipping.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(Getshipping.fulfilled, (state, action) => {
        return {
          ...state,
          // data: action.payload,
          loading: false,
          conatcUSdata: action.payload,
        };
      })
      .addCase(Getshipping.rejected, (state) => {
        return {
          ...state,
          loading: false,
          addTermAndConditionStatus: 'error',
        };
      });

    //edit about us

    builder
      .addCase(EditAboutUs.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(EditAboutUs.fulfilled, (state, action) => {
        if (action.payload.status == true) {
          toast.error(action.payload.message);
        } else {
          toast.success(action.payload.message);
        }
        return {
          ...state,
          // data: action.payload,
          loading: false,
        };
      })
      .addCase(EditAboutUs.rejected, (state) => {
        return {
          ...state,
          loading: false,
          addTermAndConditionStatus: 'error',
        };
      });

    builder
      .addCase(GetPrivacy.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(GetPrivacy.fulfilled, (state, action) => {
        return {
          ...state,
          // data: action.payload,
          loading: false,
          conatcUSdata: action.payload,
        };
      })
      .addCase(GetPrivacy.rejected, (state) => {
        return {
          ...state,
          loading: false,
          addTermAndConditionStatus: 'error',
        };
      });

    builder
      .addCase(postAddTermAndCondition.pending, (state) => {
        return {
          ...state,
          loading: true,
          addTermAndConditionStatus: 'pending',
        };
      })
      .addCase(postAddTermAndCondition.fulfilled, (state, action) => {
        if (action.payload.status == true) {
          toast.error(action.payload.message);
        } else {
          toast.success(action.payload.message);
        }
        return {
          ...state,
          // data: action.payload,
          loading: false,
          addTermAndConditionStatus: 'success',
        };
      })
      .addCase(postAddTermAndCondition.rejected, (state) => {
        return {
          ...state,
          loading: false,
          addTermAndConditionStatus: 'error',
        };
      });
    //get terms and conditon
    builder
      .addCase(Gettermsandcondition.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(Gettermsandcondition.fulfilled, (state, action) => {
        return {
          ...state,
          // data: action.payload,
          loading: false,
          conatcUSdata: action.payload,
        };
      })
      .addCase(Gettermsandcondition.rejected, (state) => {
        return {
          ...state,
          loading: false,
          addTermAndConditionStatus: 'error',
        };
      });

    //get conatctus
    builder
      .addCase(GetConatcus.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(GetConatcus.fulfilled, (state, action) => {
        return {
          ...state,
          // data: action.payload,
          loading: false,
          conatcUSdata: action.payload,
        };
      })
      .addCase(GetConatcus.rejected, (state) => {
        return {
          ...state,
          loading: false,
          addTermAndConditionStatus: 'error',
        };
      });

    // update contact us
    builder
      .addCase(EditContactUS.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(EditContactUS.fulfilled, (state, action) => {
        if (action.payload.status == true) {
          toast.error(action.payload.message);
        } else {
          toast.success(action.payload.message);
        }
        return {
          ...state,
          // data: action.payload,
          loading: false,
        };
      })
      .addCase(EditContactUS.rejected, (state) => {
        return {
          ...state,
          loading: false,
          addTermAndConditionStatus: 'error',
        };
      });

    //update privacy
    builder
      .addCase(EditPrivacy.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(EditPrivacy.fulfilled, (state, action) => {
        if (action.payload.status == true) {
          toast.error(action.payload.message);
        } else {
          toast.success(action.payload.message);
        }
        return {
          ...state,
          // data: action.payload,
          loading: false,
        };
      })
      .addCase(EditPrivacy.rejected, (state) => {
        return {
          ...state,
          loading: false,
          addTermAndConditionStatus: 'error',
        };
      });
  },
});

export const { RemoveFaqData } = cmsSlice.actions;
export default cmsSlice.reducer;
