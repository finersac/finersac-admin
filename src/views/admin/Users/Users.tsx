import { IDataTable } from "../../../models/dataTable";
import { FC, useEffect, useMemo } from "react";

// components

import DataTable from "../../../components/Table/DataTable";
import { generateColumnTable } from "../../../utils/functions";
import { panelUsersAction as typePanelUsersAction } from "../../../store/actions/panel.action";
import { IUser } from "../../../models/user";

interface UsersProps {
  panelUsersAction: typeof typePanelUsersAction;
  panelUsers: IUser[];
}

const userFields = [
  "first_name",
  "last_name",
  "email",
  "weight",
  "height",
  "country",
  "role",
];

const Users: FC<UsersProps> = ({ panelUsers, panelUsersAction }) => {
  const columnTable = useMemo(
    (): IDataTable[] => generateColumnTable(userFields),
    []
  );

  useEffect(() => {
    panelUsersAction();
  }, []);

  return (
    <>
      <div className="relative min-h-screen py-10 bg-white">
        <div className="w-full px-12">
          <DataTable list={panelUsers} columnTable={columnTable} />
        </div>
      </div>
    </>
  );
};

export default Users;
