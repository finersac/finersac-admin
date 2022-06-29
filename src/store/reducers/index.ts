import { combineReducers } from "redux";

import user from "./user";
import alert from "./alert";

import panelUsers from "./panel-users";

const root = combineReducers({
  user,
  alert,
  panelUsers,
});

export type ReduceProp = ReturnType<typeof root>;

export default root;
