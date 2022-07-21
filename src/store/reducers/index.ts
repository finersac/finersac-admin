import { combineReducers } from "redux";

import user from "./user";
import alert from "./alert";

import panelUsers from "./panel-users";
import panelVerifiedExercises from "./panel-verified-exercises";
import panelUnverifiedExercises from "./panel-unverified-exercises";
import coaches from "./coaches";

const root = combineReducers({
  user,
  alert,
  panelUsers,
  panelVerifiedExercises,
  panelUnverifiedExercises,
  coaches,
});

export type ReduceName =
  | "user"
  | "alert"
  | "panelUsers"
  | "panelVerifiedExercises"
  | "panelUnverifiedExercises"
  | "coaches";

export type ReduceProp = ReturnType<typeof root>;

export default root;
