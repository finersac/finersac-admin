import { combineReducers } from "redux";

import user from "./user";
import alert from "./alert";

import panelUsers from "./panel-users";
import coaches from "./coaches";

const root = combineReducers({
  user,
  alert,
  panelUsers,
  coaches,
});

export type ReduceProp = ReturnType<typeof root>;

export default root;
