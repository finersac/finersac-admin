import { IDataTable } from "../../../models/dataTable";
import { FC, useCallback, useEffect, useMemo, useState } from "react";

// components

import DataTable from "../../../components/Table/DataTable";
import { generateColumnTable } from "../../../utils/functions";
import {
  panelUsersAction as typePanelUsersAction,
  createPanelUserAction as typeCreatePanelUserAction,
  updatePanelUserAction as typeUpdatePanelUserAction,
  coachesAction as typeCoachesAction,
  blockUnlockPanelUserAction as typeBlockUnlockPanelUserAction,
  deletePanelUserAction as typeDeletePanelUserAction,
} from "../../../store/actions/panel.action";
import { IUser } from "../../../models/user";
import Input from "../../../components/Input";
import DropdownCoaches from "../../../components/DropdownCoaches";

import { withTranslation, WithTranslation } from "react-i18next";
import { RadioButton } from "primereact/radiobutton";

import _ from "lodash";

interface UsersProps extends WithTranslation {
  panelUsersAction: typeof typePanelUsersAction;
  createPanelUserAction: typeof typeCreatePanelUserAction;
  updatePanelUserAction: typeof typeUpdatePanelUserAction;
  blockUnlockPanelUserAction: typeof typeBlockUnlockPanelUserAction;
  deletePanelUserAction: typeof typeDeletePanelUserAction;
  coachesAction: typeof typeCoachesAction;
  panelUsers: IUser[];
  user: IUser;
}

const userFields = [
  "first_name",
  "last_name",
  "email",
  "weight",
  "height",
  //  "country",
  "role",
];

const Users: FC<UsersProps> = ({
  t,
  user,
  panelUsers,
  panelUsersAction,
  createPanelUserAction,
  updatePanelUserAction,
  blockUnlockPanelUserAction,
  deletePanelUserAction,
  coachesAction,
}) => {
  const columnTable = useMemo(
    (): IDataTable[] => generateColumnTable(userFields),
    []
  );

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formSuccess, setFormSuccess] = useState<boolean>(false);

  const getInitialData = useCallback(async () => {
    try {
      await panelUsersAction();
      await coachesAction();
    } catch (e) {
      console.error(e);
    }
  }, [coachesAction, panelUsersAction]);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  const handleOnSave = async (data: any, isUpdate?: boolean): Promise<void> => {
    setSubmitted(true);
    if (
      !data?.first_name ||
      !data?.last_name ||
      !data?.email ||
      (user.role !== "coach" && data?.id_role === 4 && !data?.id_coach)
    ) {
      return;
    }
    if (!data) {
      return;
    }
    const newData: IUser = _.pickBy(
      {
        first_name: data?.first_name,
        last_name: data?.last_name,
        email: data?.email,
        weight: data?.weight,
        height: data?.height,
        password: "123456",
        id_role: user.role === "coach" ? 4 : data?.id_role,
        id_coach:
          user.role === "coach"
            ? user.id
            : data?.id_role === 4
            ? data?.id_coach
            : null,
      },
      _.identity
    );

    try {
      await (isUpdate ? updatePanelUserAction : createPanelUserAction)(
        newData,
        data?.id
      );
      setFormSuccess(true);
    } catch (e) {
      setFormSuccess(false);
    }
  };

  const handleOnDelete = async (user: any) => {
    try {
      await deletePanelUserAction(user.id);
    } catch (e) {}
  };

  const component = ({
    item,
    onChangeItem,
  }: {
    item: any;
    onChangeItem: (key: string, value: any) => any;
  }): JSX.Element => {
    const onCategoryChange = (e: any) => {
      onChangeItem("id_role", e.value);
    };

    const onChangeInput = (key: string, value: any) => {
      onChangeItem(key, value);
      setSubmitted(false);
    };

    return (
      <>
        <div className="formgrid grid">
          <div className="field col-6">
            <Input
              keyName="first_name"
              label={t("dataTable.first_name")}
              required
              submitted={submitted}
              autoFocus
              value={item?.first_name}
              onChange={(e) => onChangeInput("first_name", e.target.value)}
            />
          </div>
          <div className="field col-6">
            <Input
              keyName="last_name"
              label={t("dataTable.last_name")}
              required
              submitted={submitted}
              value={item?.last_name}
              onChange={(e) => onChangeInput("last_name", e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <Input
            keyName="email"
            label={t("dataTable.email")}
            submitted={submitted}
            required
            value={item?.email}
            onChange={(e) => onChangeInput("email", e.target.value)}
          />
        </div>
        <div className="formgrid grid">
          <div className="field col-6">
            <Input
              keyName="weight"
              label={t("dataTable.weight")}
              value={item?.weight}
              onChange={(e) => onChangeInput("weight", e.target.value)}
            />
          </div>
          <div className="field col-6">
            <Input
              keyName="height"
              label={t("dataTable.height")}
              value={item?.height}
              onChange={(e) => onChangeInput("height", e.target.value)}
            />
          </div>
        </div>
        {item?.id_role === 4 && user.role !== "coach" && (
          <div>
            <label className="mb-3">{t("dataTable.coaches")}</label>
            <div className="formgrid grid">
              <div className="field col-12">
                <DropdownCoaches
                  keyName="coaches"
                  value={item?.id_coach}
                  submitted={submitted}
                  required
                  onChange={(value) => onChangeInput("id_coach", value)}
                />
              </div>
            </div>
          </div>
        )}
        {user.role !== "coach" && (
          <div className="field">
            <label className="mb-3">Role</label>
            <div className="formgrid grid">
              {user.role === "superadmin" && (
                <>
                  <div className="field-radiobutton col-6">
                    <RadioButton
                      inputId="category1"
                      name="category"
                      value={1}
                      onChange={onCategoryChange}
                      checked={item?.id_role === 1}
                    />
                    <label htmlFor="category1">Super Admin</label>
                  </div>

                  <div className="field-radiobutton col-6">
                    <RadioButton
                      inputId="category2"
                      name="category"
                      value={2}
                      onChange={onCategoryChange}
                      checked={item?.id_role === 2}
                    />
                    <label htmlFor="category2">Admin</label>
                  </div>
                </>
              )}
              {(user.role === "admin" || user.role === "superadmin") && (
                <div className="field-radiobutton col-6">
                  <RadioButton
                    inputId="category3"
                    name="category"
                    value={3}
                    onChange={onCategoryChange}
                    checked={item?.id_role === 3}
                  />
                  <label htmlFor="category3">{t("common.coach")}</label>
                </div>
              )}
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category4"
                  name="category"
                  value={4}
                  onChange={onCategoryChange}
                  checked={item?.id_role === 4}
                />
                <label htmlFor="category4">{t("common.athlete")}</label>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const onCloseModal = () => {
    setSubmitted(false);
  };

  return (
    <>
      <div className="h-full bg-blueGray-100">
        <div className="w-full px-12">
          <DataTable
            list={panelUsers}
            columnTable={columnTable}
            onSave={handleOnSave}
            onDelete={handleOnDelete}
            textButtonCreate={t("button.createUser")}
            AddOrEditComponent={component}
            formSuccess={formSuccess}
            onClose={onCloseModal}
          />
        </div>
      </div>
    </>
  );
};

export default withTranslation()(Users);
