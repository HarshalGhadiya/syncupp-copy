import AxiosDefault from "@/services/AxiosDefault";


// login
type LoginState = {
    email: string,
    password: string
}

export const LoginApi = async (data: LoginState) => {
    const response = await AxiosDefault({
        url: "/api/v1/affiliate/login",
        method: "POST",
        data: data,
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};

type SignupState = {
    email: string,
    password: string,
    company_name: string,
    name: string
}


export const SignupApi = async (data: SignupState) => {
    const response = await AxiosDefault({
        url: "/api/v1/affiliate/signup",
        method: "POST",
        data: data,
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};


type forgotPasswordState = {
    email: string,
}


export const ForgotPasswordApi = async (data: forgotPasswordState) => {
    const response = await AxiosDefault({
        url: "/api/v1/affiliate/forgot-password",
        method: "POST",
        data: data,
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};


type resetPassowrdState = {
    email: string,
    token: string,
    new_password: string
}


export const ResetPasswordApi = async (data: resetPassowrdState) => {
    const response = await AxiosDefault({
        url: "/api/v1/affiliate/reset-password",
        method: "POST",
        data: data,
        contentType: "application/json",
    });
    const responseData = response.data;
    return responseData;
};
