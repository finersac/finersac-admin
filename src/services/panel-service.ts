import API, { VERSION } from "../api/services";

export const getPanelUsersServices = async () => {
  return API.get(`/${VERSION}/panel/users`);
};

//CREATE PANEL USER
export const createPanelUserServices = async (data: any) => {
  return API.post(`/${VERSION}/panel/create-user`, data);
};

//UPDATE PANEL USER
export const updatePanelUserServices = async (data: any) => {
  return API.post(`/${VERSION}/panel/update-user`, data);
};

//GET COACHES
export const getCoachesServices = async () => {
  return API.get(`/${VERSION}/panel/coaches`);
};
