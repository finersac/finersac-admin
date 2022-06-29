import React, { FC, memo, useMemo } from "react";
import Lottie from "lottie-react";
import { WithTranslation, withTranslation } from "react-i18next";
import { ICardMessage } from "../../models/card";

import Button from "../Button/Button";

import AnimationSuccess from "../../animation/success.json";
import AnimationError from "../../animation/error.json";
import AnimationInfo from "../../animation/info.json";
import { Link } from "react-router-dom";

interface CardMessageProps extends WithTranslation, ICardMessage {
  children?: JSX.Element;
  buttonText: string;
  navigateTo: string;
}

const CardMessage: FC<CardMessageProps> = ({
  children,
  t,
  type,
  title,
  message,
  buttonText,
  navigateTo
}) => {
  const animationData = useMemo(() => {
    switch (type) {
      case "success":
        return AnimationSuccess;
      case "info":
        return AnimationInfo;
      case "error":
        return AnimationError;
    }
  }, [type]);

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center">
          <Lottie
            animationData={animationData}
            autoPlay
            loop={false}
            style={{ width: "50%", height: "50%" }}
          />
        </div>
        <div className="mb-8">
          <h6 className="text-blueGray-800 text-center text-l font-bold">
            {message}
          </h6>
        </div>
        <div className="text-center mb-6">
          <Link to={navigateTo}>
            <Button text={buttonText} className="bg-blueGray-70" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default memo(withTranslation()(CardMessage));
