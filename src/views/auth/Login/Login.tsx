import React, {
  ChangeEvent,
  FC,
  ReactElement,
  useState,
} from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "../../../components/Button/Button";

import { logInAction as typeLogInAction } from "../../../store/actions/user.action";

interface LoginProps extends WithTranslation {
  children?: JSX.Element;
  logInAction: typeof typeLogInAction;
}

const Login: FC<LoginProps> = ({ logInAction, t }): ReactElement => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmitLogin = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      return;
    }
    setIsLoading(true);
    try {
      await logInAction(email, password);
      setIsLoading(false);
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
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmitLogin}>
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

                  <div className="relative w-full mb-3">
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
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        {t("common.rememberMe")}
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <Button loading={isLoading} text={t("common.signIn")} />
                  </div>
                </form>
              </div>
            </div>

            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <Link to="/auth/forgot-password" className="text-blueGray-200">
                  <small>{t("common.forgotPassword")}</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withTranslation()(Login);
