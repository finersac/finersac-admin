import React, { FC, memo, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import { IAlert } from "../../models/alert";
import { setAlertAction as typeSetAlertAction } from "../../store/actions/alert.action";
import { WithTranslation, withTranslation } from "react-i18next";

interface AlertComponentProps extends WithTranslation {
  children?: JSX.Element;
  alert: IAlert;
  setAlertAction: typeof typeSetAlertAction;
}

const AlertComponent: FC<AlertComponentProps> = ({
  children,
  alert,
  setAlertAction,
  t,
}) => {
  const [openModal, setOpenModal] = React.useState(false);

  useEffect(() => {
    setOpenModal(alert.visible);
  }, [alert.visible]);

  const handleClose = () => {
    setAlertAction({ visible: false });
  };
  return (
    <>
      <Snackbar
        open={openModal}
        anchorOrigin={alert.position}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={alert.type}
          sx={{ width: "100%" }}
        >
          {alert.description ? t(alert.description) : ""}
        </Alert>
      </Snackbar>
      {children}
    </>
  );
};

export default memo(withTranslation()(AlertComponent));
