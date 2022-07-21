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

//GET PANEL EXERCISE
export const getPanelVerifiedExercisesServices = async () => {
  return API.get(`/${VERSION}/panel/verified-exercises`);
};

export const getPanelUnverifiedExercisesServices = async () => {
  return API.get(`/${VERSION}/panel/unverified-exercises`);
};

//CREATE PANEL EXERCISE
export const createPanelExerciseServices = async (data: any) => {
  return API.post(`/${VERSION}/panel/create-exercise`, data);
};

//UPDATE PANEL EXERCISE
export const updatePanelExerciseServices = async (data: any) => {
  return API.post(`/${VERSION}/panel/update-exercise`, data);
};

//UPLOAD PANEL EXERCISE
export const uploadPanelExerciseServices = async (data: any) => {
  return API.post(`/${VERSION}/panel/upload-exercises`, data);
};
