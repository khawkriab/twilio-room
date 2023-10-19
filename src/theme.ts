import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
    interface Theme {
        sidebarWidth: number
        sidebarMobileHeight: number
    }

    // allow configuration using `createMuiTheme`
    interface ThemeOptions {
        sidebarWidth?: number
        sidebarMobileHeight?: number
    }
}

export default createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#F22F46'
        }
    },
    sidebarWidth: 260,
    sidebarMobileHeight: 90
})
