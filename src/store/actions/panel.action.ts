// redux/actions.js
import { setStore } from "../../utils/functions";
import { SET_PANEL_USERS } from "../../utils/constants/reducers";
import { AnyAction } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import API from "../../api/services";

import { getPanelUsersServices } from "../../services/panel-service";
import { setAlertAction } from "./alert.action";

export const panelUsersAction = (): ThunkAction<
  Promise<void>,
  {},
  {},
  AnyAction
> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      const data = await getPanelUsersServices();
      dispatch(setStore(SET_PANEL_USERS, data.result));
    } catch (e: any) {
      const codeError = `error.${e.response?.data?.codeError || "generic"}`;
      dispatch(
        setAlertAction({
          visible: true,
          type: "error",
          description: codeError,
        })
      );
      throw e;
    }
  };
};
