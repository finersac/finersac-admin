/*
  User Reducer, is used to manage user data and persist them.
 */
import { IUser } from "../../models/user";
import {
  SET_PANEL_USERS,
  REMOVE_PANEL_USERS,
  REMOVE_ALL,
} from "../../utils/constants/reducers";

const INITIAL_STATE: IUser[] = [];

/**
 * @return {Array | Array}
 */

function panelUsersReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case SET_PANEL_USERS:
      return [...action.payload];
    case REMOVE_PANEL_USERS:
      return INITIAL_STATE;
    case REMOVE_ALL:
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default panelUsersReducer;
