// redux/actions.js
import { setStore } from "../../utils/functions";
import { SET_ALERT } from "../../utils/constants/reducers";
import { AnyAction } from "@reduxjs/toolkit";
import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { IAlert } from "../../models/alert";

export const setAlertAction = (
  data: IAlert
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      dispatch(setStore(SET_ALERT, data));
    } catch (e) {}
  };
};
