import { IDataTable } from "../models/dataTable";

export const setStore = (ACCION: string, data: any) => {
  return { type: ACCION, payload: data };
};

export const generateColumnTable = (keys: string[]): IDataTable[] => {
  return keys.map((key: string): IDataTable => {
    return {
      field: key,
      header: `dataTable.${key}`,
      sortable: true,
    };
  });
};
