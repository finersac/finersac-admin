import API, { VERSION } from "../api/services";

export const getPanelUsersServices = async () => {
  return API.get(`/${VERSION}/panel/users`);
};
