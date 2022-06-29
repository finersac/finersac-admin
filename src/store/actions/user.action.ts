// redux/actions.js
import { setStore } from "../../utils/functions";
import { REMOVE_USER, SET_USER } from "../../utils/constants/reducers";
import { AnyAction } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import API from "../../api/services";

import {
  logInService,
  forgotPassword,
  resetPassword,
} from "../../services/user-service";
import { setAlertAction } from "./alert.action";

export const logInAction = (
  email: string,
  password: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      const data = await logInService({
        password,
        email,
      });
      if (!data?.result?.user) {
        throw data;
      }
      API.setAuthorization(data.token);

      dispatch(setStore(SET_USER, data.result.user));
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

export const forgotPasswordAction = (
  email: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      await forgotPassword({
        email,
      });

      dispatch(setStore(REMOVE_USER, false));
      dispatch(
        setAlertAction({
          visible: true,
          type: "success",
          description: "success.emailSend",
        })
      );
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

export const resetPasswordAction = (
  password: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      await resetPassword({
        password,
      });
      dispatch(setStore(REMOVE_USER, false));
    } catch (e: any) {
      throw e;
    }
  };
};
