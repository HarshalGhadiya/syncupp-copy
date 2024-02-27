import { combineReducers } from '@reduxjs/toolkit';
import signinSlice from './slices/user/auth/signinSlice';
import signupSlice from './slices/user/auth/signupSlice';
import resetPasswordSlice from './slices/user/auth/resetPasswordSlice';
import changePasswordSlice from './slices/user/auth/changePasswordSlice';
import forgotPasswordSlice from './slices/user/auth/forgotPasswordSlice';
import adminSignInSlice from './slices/admin/auth/signin/signinSlice';
import adminForgotPasswordSlice from './slices/admin/auth/forgotpassword/forgetPasswordSlice';
import adminResetPasswordSlice from './slices/admin/auth/resetpassword/resetPasswordSlice';
import socialSignupSlice from './slices/user/auth/socialSignupSlice';
import viewProfileSlice from './slices/admin/auth/viewprofile/viewProfileSlice';
import clientSlice from './slices/user/client/clientSlice';
import teamSlice from './slices/user/team-member/teamSlice';
import adminChangePasswordSlice from './slices/admin/auth/updatePassword/changePasswordSlice';
import adminfaqSlice from './slices/admin/faq/faqSlice';
import agencySlice from './slices/admin/agency/agencySlice';
import agreementSlice from './slices/user/agreement/agreementSlice';
import clientAgreementSlice from './slices/user/client/agreement/clientAgreementSlice';
import userAgencySlice from './slices/user/agency/agencySlice';
import invoiceSlice from './slices/user/invoice/invoiceSlice';
import taskSlice from './slices/user/task/taskSlice';
import clientReviewSlice from './slices/admin/clientReview/clientReviewSlice';
import cmsSlice from './slices/admin/cms/cmsSlice';
import couponManagementSlice from './slices/admin/coupon-managemnt/couponManagementSlice';
import paymentSlice from './slices/payment/paymentSlice';
import inquirySlice from './slices/admin/inquiry/inquirySlice';
import SubscriptionSlice from './slices/user/manage-subscription.tsx/SubscriptionSlice';
import authSlice from './slices/affiliate/authSlice';
import taskStatusSlice from './slices/user/task/taskStatusSlice';
import activitySlice from './slices/user/activity/activitySlice';
import contactusSlice from './slices/affiliate/contactusSlice';
import faqSlice from './slices/affiliate/faqSlice';
import invoicesformSlice from './slices/user/invoice/invoicesformSlice';
import clientInvoiceSlice from './slices/user/client/invoice/clientinvoiceSlice';
import notificationSlice from './slices/soket/notification/notificationSlice';

const combinedReducer = combineReducers({
  signIn: signinSlice,
  signUp: signupSlice,
  forgotPassword: forgotPasswordSlice,
  resetPassword: resetPasswordSlice,
  changePassword: changePasswordSlice,
  socialSignup: socialSignupSlice,
  adminSignIn: adminSignInSlice,
  adminForgotPassword: adminForgotPasswordSlice,
  adminResetPassword: adminResetPasswordSlice,
  viewProfile: viewProfileSlice,
  client: clientSlice,
  adminChangePassword: adminChangePasswordSlice,
  adminFaq: adminfaqSlice,
  adminClientReview: clientReviewSlice,
  adminCms: cmsSlice,
  teamMember: teamSlice,
  adminAgency: agencySlice,
  adminCoupon: couponManagementSlice,
  managesubcription: SubscriptionSlice,
  userAgency: userAgencySlice,
  invoice: invoiceSlice,
  invoiceform: invoicesformSlice,
  agreement: agreementSlice,
  clienAgreement: clientAgreementSlice,
  task: taskSlice,
  taskStatus: taskStatusSlice,
  payment: paymentSlice,
  inquiry: inquirySlice,
  auth: authSlice,
  contactus: contactusSlice,
  faq: faqSlice,
  notification: notificationSlice,
  activity: activitySlice,
  clieninvoice: clientInvoiceSlice,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'signin/logoutUser') {
    state = undefined;
  } else if (action.type === 'signup/lologoutUserSignUp') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default rootReducer;
