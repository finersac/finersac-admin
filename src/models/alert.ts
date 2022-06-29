import { SnackbarOrigin } from "@mui/material";

export type AlertType = "success" | "info" | "warning" | "error";

export type AlertPosition = "left" | "right" | "bottom" | "top" | "center";

export interface IAlertPosition {
  vertical: AlertPosition;
  horizontal: AlertPosition;
}

export interface IAlert {
  visible: boolean;
  title?: string;
  subTitle?: string;
  description?: string;
  type?: AlertType;
  position?: SnackbarOrigin;
}
