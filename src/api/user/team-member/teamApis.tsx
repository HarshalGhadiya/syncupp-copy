import AxiosDefault from "../../../services/AxiosDefault";

type PostAddTeamMemberApiData = {
  email: string;
  first_name: string;
  last_name: string;
  contact_number?: string;
  role?: string;
  agency_id?: string;
}

type PostTeamMemberVerifyApiData = {
  email: string;
  agency_id: string;
  redirect: boolean;
  token?: string;
  client_id?: string;
  password?: string;
  // first_name?: string;
  // last_name?: string;
}

type PutEditTeamMemberApiData = {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  contact_number?: string;
  role?: string;
  agency_id?: string;
}

type DeleteTeamMemberApiData = {
  teamMemberIds: string[];
  agency_id?: string;
}

type GetAllTeamMemberApiData = {
  page?: number;
  items_per_page?: number;
  sort_order?: string;
  sort_field?: string;
  search?: string;
  agency_id?: string;
  client_id?: string;
  pagination?: boolean;
  client_team?: boolean;
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
  member_role: string;
  agency_id?: string;
};

type RefferalPaymentApiData = {
  user_id: string;
  without_referral?: boolean;
}

type StatusChange = {
  id: string;
};


// Add new team member API
export const PostAddTeamMemberApi = async (data: PostAddTeamMemberApiData) => {
  const response = await AxiosDefault({
    url: "/api/v1/team-member/add",
    method: "POST",
    data: data,
    contentType: "application/json",
  });
  const responseData = response.data;
  return responseData;
};

//  team member status change API
export const MemberStatusChangeApi = async (data: StatusChange) => {
  const response = await AxiosDefault({
    url: "/api/v1/team-member/reject",
    method: "PATCH",
    data: data,
    contentType: "application/json",
  });
  const responseData = response.data;
  return responseData;
};

// Verify team member API
export const PostTeamMemberVerifyApi = async (data: PostTeamMemberVerifyApiData) => {
  const response = await AxiosDefault({
    url: "/api/v1/team-member/verify",
    method: "POST",
    data: data,
    contentType: "application/json",
  });
  const responseData = response.data;
  return responseData;
};

// Edit team member API
export const PutEditTeamMemberApi = async (data: PutEditTeamMemberApiData) => {
  const response = await AxiosDefault({
    url: `/api/v1/team-member/edit/${data.id}`,
    method: "PUT",
    data: data,
    contentType: "application/json",
  });
  const responseData = response.data;
  return responseData;
};

// delete Team member API
export const DeleteTeamMemberApi = async (data: DeleteTeamMemberApiData) => {
  const response = await AxiosDefault({
    url: `/api/v1/team-member/delete`,
    method: "DELETE",
    data: data,
    contentType: "application/json",
  });
  const responseData = response.data;
  return responseData;
};


// Get all team member
export const GetAllTeamMemberApi = async (data: GetAllTeamMemberApiData) => {
  const response = await AxiosDefault({
    url: `/api/v1/team-member/get-all`,
    method: "POST",
    data: data,
    contentType: "application/json",
  });
  const responseData = response.data;
  return responseData;
};


// get team member profile
export const GetTeamMemberProfileApi = async (data: GetTeamMemberProfileApiData) => {
  const response = await AxiosDefault({
    url: `/api/v1/team-member/details/${data._id}`,
    method: "GET",
    data: data,
    contentType: "application/json",
  });
  const responseData = response.data;
  return responseData;
};

// get reafferal payment statistics
export const RefferalPaymentStatisticsApi = async () => {
  const response = await AxiosDefault({
    url: `/api/v1/payment/payment-scopes`,
    method: "GET",
    contentType: "application/json",
  });
  const responseData = response.data;
  return responseData;
};

// post reafferal payment api
export const RefferalPaymentApi = async (data: RefferalPaymentApiData) => {
  const response = await AxiosDefault({
    url: `/api/v1/payment/referral-payout`,
    method: "POST",
    data: data,
    contentType: "application/json",
  });
  const responseData = response.data;
  return responseData;
};
