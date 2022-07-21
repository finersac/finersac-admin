import { ColumnProps } from "primereact/column";
import { ReduceName } from "../store/reducers";

export interface IDataTable extends ColumnProps {}

export interface ITabView {
  reduceName: ReduceName;
  title: string;
  callback: (key: string, data: any) => void;
}
