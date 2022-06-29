import { Theme, ThemeOptions, createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface ThemeMUI extends Theme {
    white: {
      main: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptionsMUI extends ThemeOptions {
    white?: {
      main?: string;
    };
  }
  export function createTheme(options?: ThemeOptionsMUI): ThemeMUI;
}

export default createTheme({
  palette: {
    primary: {
      main: "#0971f1",
    },
    secondary: {
      main: "#64748B",
    },
  },
  white: {
    main: "white",
  },
});
