// redux/actions.js
import { setStore } from "../../utils/functions";
import { SET_COACHES, SET_PANEL_USERS } from "../../utils/constants/reducers";
import { AnyAction } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import API from "../../api/services";
import { IUser } from "../../models/user";

import {
  getPanelUsersServices,
  createPanelUserServices,
  updatePanelUserServices,
  getCoachesServices,
} from "../../services/panel-service";
import { setAlertAction } from "./alert.action";
import { ReduceProp } from "../../store/reducers";
import _ from "lodash";

export const panelUsersAction =
  (): ThunkAction<void, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
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

//CREATE USERS
export const createPanelUserAction = (
  newUser: IUser
): ThunkAction<Promise<void>, any, {}, AnyAction> => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => ReduceProp
  ): Promise<void> => {
    try {
      const panelUsers = getState().panelUsers;
      const response = await createPanelUserServices(newUser);

      dispatch(setStore(SET_PANEL_USERS, [...panelUsers, response.result]));
      dispatch(
        setAlertAction({
          visible: true,
          type: "success",
          description: "success.user_created",
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

//UPDATE USER
export const updatePanelUserAction = (
  newUser: IUser,
  idUser: IUser["id"]
): ThunkAction<Promise<void>, any, {}, AnyAction> => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => ReduceProp
  ): Promise<void> => {
    try {
      const panelUsers = getState().panelUsers;
      await updatePanelUserServices({ ...newUser, id: idUser });

      const index = panelUsers.findIndex((user) => user.id === idUser);

      if (index < 0) {
        dispatch(getPanelUsersServices);
      }

      panelUsers[index] = { ...panelUsers[index], ...newUser };

      // const oldUser = { ...panelUsers[index] };
      // panelUsers.splice(index, 1);
      // panelUsers.unshift(oldUser);

      dispatch(setStore(SET_PANEL_USERS, panelUsers));
      dispatch(
        setAlertAction({
          visible: true,
          type: "success",
          description: "success.user_updated",
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

//DELETED USER
export const deletePanelUserAction = (
  idUser: IUser["id"]
): ThunkAction<Promise<void>, any, {}, AnyAction> => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => ReduceProp
  ): Promise<void> => {
    try {
      const panelUsers = getState().panelUsers;
      await updatePanelUserServices({ id: idUser, deleted: true });

      const index = panelUsers.findIndex((user) => user.id === idUser);

      if (index < 0) {
        dispatch(getPanelUsersServices);
      }

      panelUsers.splice(index, 1);

      dispatch(setStore(SET_PANEL_USERS, panelUsers));
      dispatch(
        setAlertAction({
          visible: true,
          type: "success",
          description: "success.user_deleted",
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

//BLOCK/UNBLOCK USER
export const blockUnlockPanelUserAction = (
  idUser: IUser["id"],
  unlock: boolean
): ThunkAction<Promise<void>, any, {}, AnyAction> => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => ReduceProp
  ): Promise<void> => {
    try {
      const panelUsers = getState().panelUsers;
      await updatePanelUserServices({ id: idUser, blocked: 1 });

      const index = panelUsers.findIndex((user) => user.id === idUser);

      if (index < 0) {
        dispatch(getPanelUsersServices);
      }

      panelUsers[index] = { ...panelUsers[index], blocked: unlock ? 0 : 1 };

      dispatch(setStore(SET_PANEL_USERS, panelUsers));
      dispatch(
        setAlertAction({
          visible: true,
          type: "success",
          description: unlock
            ? "success.user_unblocked"
            : "success.user_blocked",
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

//GET COACHES
export const coachesAction = (): ThunkAction<
  Promise<void>,
  any,
  {},
  AnyAction
> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      const data = await getCoachesServices();
      dispatch(setStore(SET_COACHES, data.result));
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
