import API, { VERSION } from "../api/services";

export const logInService = (data: any) => {
  return API.post(`/public/${VERSION}/sign-in`, data);
};

export const forgotPassword = async (data: any) => {
  return API.post(`/public/${VERSION}/forgot-password`, data);
};

export const resetPassword = async (data: any) => {
  return API.post(`/${VERSION}/reset-password`, data);
};
