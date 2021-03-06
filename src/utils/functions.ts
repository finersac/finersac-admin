import { UserRole } from "../models/user";
import { IDataTable } from "../models/dataTable";
import i18n from "../i18n";
import _ from "lodash";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { REMOVE_USER } from "./constants/reducers";
import { setAlertAction } from "../store/actions/alert.action";

export const setStore = (Action: string, data: any) => {
  return { type: Action, payload: data };
};

const roleBodyTemplate = (rowData: any) => {
  return _.capitalize(i18n.t(`role.${getRole(rowData.id_role)}`));
};

export const generateColumnTable = (keys: string[]): IDataTable[] => {
  return keys.map((key: string): IDataTable => {
    return {
      style: { minWidth: key === "email" ? "15rem" : "8rem" },
      body: key === "role" ? roleBodyTemplate : null,
      field: key === "role" ? "id_role" : key,
      header: `dataTable.${key}`,
      sortable: true,
    };
  });
};

export const getRole = (idRole: number): UserRole => {
  switch (idRole) {
    case 1:
      return "superadmin";
    case 2:
      return "admin";
    case 3:
      return "coach";
    default:
      return "athlete";
  }
};

export const normalizeCatchActions = (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  codeError?: string
) => {
  codeError === "token_expired" && dispatch(setStore(REMOVE_USER, false));

  const translateError = `error.${codeError || "generic"}`;
  dispatch(
    setAlertAction({
      visible: true,
      type: "error",
      description: translateError,
    })
  );
};
