import React, { ChangeEvent, FC, ReactElement, useState, useMemo } from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import { ICardMessage } from "../../../models/card";

import { resetPasswordAction as typeResetPasswordAction } from "../../../store/actions/user.action";
import { setAlertAction as typeSetAlertAction } from "../../../store/actions/alert.action";

import Button from "../../../components/Button/Button";
import CardMessage from "../../../components/CardMessage";

import API from "../../../api/services";

interface ForgotPasswordProps extends WithTranslation {
  children?: JSX.Element;
  resetPasswordAction: typeof typeResetPasswordAction;
  setAlertAction: typeof typeSetAlertAction;
}

const ResetPassword: FC<ForgotPasswordProps> = ({
  resetPasswordAction,
  setAlertAction,
  t,
}): ReactElement => {
  const location = useLocation();

  const [cardMessageProps, setCardMessageProps] = useState<ICardMessage | null>(
    null
  );

  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const token = useMemo(() => {
    const query = new URLSearchParams(location.search);
    return query.get("token");
  }, [location]);

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeRePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setRePassword(event.target.value);
  };

  const handleSubmitForgotPassword = async (
    event: ChangeEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!password) {
      setAlertAction({
        visible: true,
        description: "error.password_required",
        type: "error",
      });
      return;
    }
    if (!rePassword) {
      setAlertAction({
        visible: true,
        description: "error.repassword_required",
        type: "error",
      });
      return;
    }
    if (rePassword !== password) {
      setAlertAction({
        visible: true,
        description: "error.password_not_match",
        type: "error",
      });
      return;
    }
    API.setAuthorization(token || "");
    setIsLoading(true);
    try {
      await resetPasswordAction(password);
      setCardMessageProps({
        type: "success",
        message: t("success.passwordChanged"),
      });
      setIsLoading(false);
    } catch (e) {
      setCardMessageProps({
        type: "error",
        message: t("error.passwordExpired"),
      });
      console.error(e);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              {!cardMessageProps ? (
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form onSubmit={handleSubmitForgotPassword}>
                    <div className="relative w-full mb-3 mt-10">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        {t("common.password")}
                      </label>
                      <input
                        type="password"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder={t("common.password")}
                        value={password}
                        onChange={onChangePassword}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        {t("common.rePassword")}
                      </label>
                      <input
                        type="password"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder={t("common.rePassword")}
                        value={rePassword}
                        onChange={onChangeRePassword}
                      />
                    </div>
                    <div className="text-center mt-6">
                      <Button
                        loading={isLoading}
                        text={t("common.recoverPassword")}
                      />
                    </div>
                  </form>
                </div>
              ) : (
                <CardMessage
                  {...cardMessageProps}
                  navigateTo="/auth"
                  buttonText={t("common.goToLogin")}
                />
              )}
            </div>
            {!cardMessageProps && (
              <div className="flex flex-wrap mt-6 relative">
                <Link to="/auth" className="text-blueGray-200">
                  <small>{t("common.goToLogin")}</small>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default withTranslation()(ResetPassword);
