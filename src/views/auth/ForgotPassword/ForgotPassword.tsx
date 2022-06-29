import React, { ChangeEvent, FC, ReactElement, useState } from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import Button from "../../../components/Button/Button";
import CardMessage from "../../../components/CardMessage";

import { forgotPasswordAction as typeForgotPasswordAction } from "../../../store/actions/user.action";

interface ForgotPasswordProps extends WithTranslation {
  children?: JSX.Element;
  forgotPasswordAction: typeof typeForgotPasswordAction;
}

const Login: FC<ForgotPasswordProps> = ({
  forgotPasswordAction,
  t,
}): ReactElement => {
  const [email, setEmail] = useState<string>("egarcia@finersac.com");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailSend, setEmailSend] = useState<boolean>(false);

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmitForgotPassword = async (
    event: ChangeEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!email) {
      return;
    }
    setIsLoading(true);
    try {
      await forgotPasswordAction(email);
      setIsLoading(false);
      setEmailSend(true);
    } catch (e) {
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
              {!emailSend ? (
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form onSubmit={handleSubmitForgotPassword}>
                    <div className="relative w-full mb-3 mt-10">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        {t("common.email")}
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder={t("common.email")}
                        value={email}
                        onChange={onChangeEmail}
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
                  type="success"
                  navigateTo="/auth"
                  buttonText={t("common.goToLogin")}
                  message={t("success.emailSend")}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withTranslation()(Login);
