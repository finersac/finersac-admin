// redux/actions.js
import { getRole, setStore } from "../../utils/functions";
import {
  REMOVE_ALL,
  REMOVE_USER,
  SET_USER,
} from "../../utils/constants/reducers";
import { AnyAction } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import API from "../../api/services";

import {
  logInService,
  forgotPassword,
  resetPassword,
} from "../../services/user-service";
import { setAlertAction } from "./alert.action";
import { IUser } from "../../models/user";

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

      let user: IUser = data.result.user;

      user.role = getRole(user.id_role || 1);

      dispatch(setStore(SET_USER, user));
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

export const logOutAction = (): ThunkAction<
  Promise<void>,
  {},
  {},
  AnyAction
> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      dispatch(setStore(REMOVE_ALL, false));
    } catch (e: any) {
      throw e;
    }
  };
};
