import React, { FC, memo, useMemo } from "react";
import Lottie from "lottie-react";
import { WithTranslation, withTranslation } from "react-i18next";
import { ICardMessage } from "../../models/card";

import Button from "../Button/Button";

import AnimationSuccess from "../../animation/success.json";
import AnimationError from "../../animation/error.json";
import AnimationInfo from "../../animation/info.json";
import { Link } from "react-router-dom";
import { InputText, InputTextProps } from "primereact/inputtext";
import { classNames } from "primereact/utils";

interface InputProps extends WithTranslation, InputTextProps {
  keyName: string;
  label: string;
  submitted?: boolean;
}

const Input: FC<InputProps> = (props) => {
  const { t, submitted, value, required, label, keyName } = useMemo(
    () => props,
    [props]
  );

  return (
    <>
      <div className="">
        <label htmlFor={keyName}>{label}</label>
        <InputText
          {...props}
          id={keyName}
          className={classNames({
            "p-invalid": submitted && required && !value,
          })}
        />
        {submitted && required && !value && (
          <small className="p-error">{t(`error.${keyName}_required`)}</small>
        )}
      </div>
    </>
  );
};

export default memo(withTranslation()(Input));
