/*
  User Reducer, is used to manage user data and persist them.
 */
  import { IUser } from "../../models/user";
  import {
    SET_COACHES,
    REMOVE_COACHES,
    REMOVE_ALL,
  } from "../../utils/constants/reducers";
  
  const INITIAL_STATE: IUser[] = [];
  
  /**
   * @return {Array | Array}
   */
  
  function coachesReducer(state = INITIAL_STATE, action: any) {
    switch (action.type) {
      case SET_COACHES:
        return [...action.payload];
      case REMOVE_COACHES:
        return INITIAL_STATE;
      case REMOVE_ALL:
        return INITIAL_STATE;
      default:
        return state;
    }
  }
  
  export default coachesReducer;
  