import { createTheme } from "@material-ui/core";


declare module '@material-ui/core/styles/createTheme' {
  interface Theme {
    sidebarWidth: number;
    sidebarMobileHeight: number;
  }

  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    sidebarWidth?: number;
    sidebarMobileHeight?: number;
  }
}


export default createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#F22F46',
    },
  },
  sidebarWidth: 260,
  sidebarMobileHeight: 90,
});
