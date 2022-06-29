import React, {
  FC,
  ReactElement,
  ButtonHTMLAttributes,
  ChangeEvent,
} from "react";
import { CircularProgress } from "@mui/material";

interface ButtonProps {
  children?: JSX.Element;
  className?: string;
  type?: "submit" | "button" | "reset" | undefined;
  loading?: boolean;
  text: string;
  onPress?: (evt: ChangeEvent<HTMLButtonElement>) => void;
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  type = "submit",
  text,
  loading,
  onPress,
}): ReactElement => {
  return (
    <>
      <button
        className={`bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150 ${className}`}
        type={type}
        onSubmit={onPress}
      >
        {loading ? (
          <div className="text-center">
            <CircularProgress color="primary" size={15} />
          </div>
        ) : (
          text
        )}
      </button>
    </>
  );
};

export default Button;
