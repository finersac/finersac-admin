/*
  Exercise Reducer, is used to manage exercise data and persist them.
 */
import { IExercise } from "../../models/exercise";
import {
  SET_PANEL_UNVERIFIED_EXERCISES,
  REMOVE_PANEL_EXERCISES,
  REMOVE_ALL,
} from "../../utils/constants/reducers";

const INITIAL_STATE: IExercise[] = [];

/**
 * @return {Object | Object}
 */

function panelUnverifiedExercisesReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case SET_PANEL_UNVERIFIED_EXERCISES:
      return [...action.payload];
    case REMOVE_PANEL_EXERCISES:
      return INITIAL_STATE;
    case REMOVE_ALL:
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default panelUnverifiedExercisesReducer;
