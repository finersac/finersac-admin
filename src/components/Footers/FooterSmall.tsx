import React, { FC, ReactElement } from "react";
import { withTranslation, WithTranslation } from "react-i18next";

interface FooterSmallProps extends WithTranslation {
  children?: JSX.Element;
  absolute?: boolean;
}

const FooterSmall: FC<FooterSmallProps> = ({ absolute, t }): ReactElement => {
  return (
    <>
      <footer
        className={
          (absolute ? "absolute w-full bottom-0 bg-blueGray-800" : "relative") +
          " pb-6"
        }
      >
        <div className="container mx-auto px-4">
          <hr className="mb-6 border-b-1 border-blueGray-600" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4">
              <div className="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left">
                {t("common.copyright")}
                <a
                  href="https://www.finersac.com"
                  className="text-white hover:text-blueGray-300 text-sm font-semibold ml-1"
                >
                  Finersac
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default withTranslation()(FooterSmall);
