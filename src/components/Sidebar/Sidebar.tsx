/*eslint-disable*/
import React, { ChangeEvent, FC, memo, useEffect } from "react";
import { Link, useLocation, useNavigate, useRoutes } from "react-router-dom";
import { WithTranslation, withTranslation } from "react-i18next";

import { logOutAction as typeLogOutAction } from "../../store/actions/user.action";

import NotificationDropdown from "../../components/Dropdowns/NotificationDropdown";
import UserDropdown from "../../components/Dropdowns/UserDropdown";
import { IUser } from "../../models/user";

interface SidebarProps extends WithTranslation {
  logOutAction: typeof typeLogOutAction;
  user: IUser;
}

interface ButtonSideBarProps {
  navigateTo: string;
  label: string;
  iconName: string;
}

const Sidebar: FC<SidebarProps> = ({ t, logOutAction, user }) => {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const [tabSelected, setTabSelected] =
    React.useState<string>("/admin/dashboard");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setTabSelected(location.pathname);
  }, [location]);

  const ButtonSideBar: FC<ButtonSideBarProps> = ({
    label,
    navigateTo,
    iconName,
  }) => {
    const onPress = async (event: any) => {
      event?.preventDefault();

      navigateTo === "/auth" && (await logOutAction());
      navigate(navigateTo);
    };
    return (
      <li className="items-center">
        <button
          className={`text-sm uppercase py-3 font-bold block 
            ${
              tabSelected === navigateTo
                ? "text-lightBlue-500 hover:text-lightBlue-600"
                : "text-blueGray-700 hover:text-blueGray-500}"
            }`}
          onClick={onPress}
        >
          <i
            className={
              `fas ${iconName} mr-2 text-lg ` +
              (tabSelected === navigateTo ? "opacity-75" : "text-blueGray-400")
            }
          ></i>
          {label}
        </button>
      </li>
    );
  };

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link className="md:block flex" to="/">
            <img
              src={require("../../assets/img/logo.png")}
              alt="..."
              className="w-auto h-auto"
            ></img>
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    Finersac
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="md:min-w-full" />

            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <ButtonSideBar
                iconName="fa-house"
                navigateTo="/admin/dashboard"
                label={t("sideBar.dashboard")}
              />
              <ButtonSideBar
                iconName="fa-users"
                navigateTo="/admin/users"
                label={t(
                  `sideBar.${user.role === "coach" ? "myAthletes" : "users"}`
                )}
              />
              <ButtonSideBar
                iconName="fa-ruler"
                navigateTo="/admin/planning"
                label={t("sideBar.planning")}
              />
              <ButtonSideBar
                iconName="fa-copy"
                navigateTo="/admin/templates"
                label={t("sideBar.templates")}
              />
              <ButtonSideBar
                iconName="fa-dumbbell"
                navigateTo="/admin/exercises"
                label={t("sideBar.exercises")}
              />
            </ul>

            {/* Divider */}
            <hr className="mt-2 mb-3  md:min-w-full" />
            {/* Heading */}
            <span className="md:min-w-full text-blueGray-400 text-xs uppercase font-bold block pt-1 no-underline">
              {t("sideBar.account")}
            </span>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <ButtonSideBar
                iconName="fa-gear"
                navigateTo="/admin/settings"
                label={t("sideBar.settings")}
              />
              <ButtonSideBar
                iconName="fa-right-from-bracket"
                navigateTo="/auth"
                label={t("sideBar.logOut")}
              />
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default memo(withTranslation()(Sidebar));
