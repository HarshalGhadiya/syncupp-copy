export const routes = {
  // User panel

  home: '/home',
  signIn: '/signin',
  signUp: '/signup',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  viewProfile: '/view-profile',
  dashboard: '/dashboard',
  client: '/client',
  notification: '/notification',
  clients: {
    verify: '/client/verify',
    payment: '/client/payment',
    agreement: '/client/agreement',
    invoice: '/client/invoice',
    invoicedetails: (id: string) => `/client/invoice/${id}`,
    details: (id: string) => `/client/details/${id}`,
  },
  team: '/team',
  teams: {
    verify: '/team/verify',
    details: (id: string) => `/team/details/${id}`,
  },
  agency_team: '/agency-team',
  agency_teams: {
    details: (id: string) => `/agency-team/details/${id}`,
  },
  agency_team_payment: '/agency-team/payment',
  client_team: '/client-team',
  client_teams: {
    payment: '/client-team/payment',
    details: (id: string) => `/client-team/details/${id}`,
  },
  referal: '/referal',
  invoice: '/invoice',
  invoiceForm: '/invoice/create',
  invoiceEdit: '/invoice/edit',
  // invoiceView: '/invoice/view-invoice',
  invoiceView: (id: string) => `/invoice/${id}`,

  viewTeam: '/agency-team/team-details',
  task: '/tasks',
  manageSubcription: '/manage-subscripation',
  userCalendar: '/calendar',
  userCalendarForm: '/calendar/calendar-form',
  userCalendarAddActivity: '/calendar/create-edit',

  agreement: '/agreement',
  createAgreement: `/agreement/create-agreement`,

  // Admin panel
  admin: {
    signIn: '/admin/signin',
    signUp: '/admin/signup',
    forgotPassword: '/admin/forgot-password',
    resetPassword: '/admin/reset-password',
    dashboard: '/admin/dashboard',
    viewProfile: '/admin/profile',
    faq: '/admin/faq',
    agencylist: '/admin/agencylist',
    inquiry: '/admin/inquiry',
    payment: '/admin/payment-transaction',
    agencyView: '/admin/agency-details',
    clientReview: '/admin/client-review',
    cms: '/admin/cms',
    cmsTC: '/admin/cms/team-and-condition',
    cmsContact: '/admin/cms/contact-us/edit',
    cmsAbout: '/admin/cms/about-us/edit',
    cmsPricing: '/admin/cms/pricing/edit',
    cmsPrivacy: '/admin/cms/privacy/edit',
    cmsPriceCampare: '/admin/cms/pricing-campare/edit',
    cmsshippinganddelivery: '/admin/cms/shipping-and-delivery/edit',
    cmscancellationandrefund: '/admin/cms/cancellation-and-refund/edit',

    cmsAboutView: '/admin/cms/about-us/view-aboutus',
    cmsContactView: '/admin/cms/contact-us/view-contactus',
    cmsPricingView: '/admin/cms/pricing/view-pricing',
    cmsPrivacyView: '/admin/cms/privacy/view-Privacy',
    cmsPriceCampareView: '/admin/cms/pricing-campare/view-pricaingcampare',

    couponManagement: '/admin/coupon-management',
    createCouponManagement: `/admin/coupon-management/create`,
    UpdateCouponManagement: `/admin/coupon-management/update`,
  },

  // Affiliate routes

  affiliate: {
    signup: `/affiliate/signup`,
    signin: `/affiliate/signin`,
    forgotPassword: `/affiliate/forgot-password`,
    resetPassword: `/affiliate/reset-password`,
  },
};
