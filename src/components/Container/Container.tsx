import React, { FC } from "react";
import { Snackbar } from "@mui/material";
import AlertProvider from "../Alert";

interface ContainerProps {
  children?: JSX.Element;
  alert?: any;
}

const Container: FC<ContainerProps> = ({ children }) => {
  const [openModal, setOpenModal] = React.useState(true);
  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <AlertProvider>
      <div className="h-full">{children}</div>
    </AlertProvider>
  );
};

export default Container;
