import * as React from 'react'
import ReactDOM from 'react-dom'
import { CssBaseline, MuiThemeProvider } from '@material-ui/core'

import AppStateProvider, { useAppState } from './state'
import { VideoProvider } from './components/VideoProvider'
import useConnectionOptions from './utils/useConnectionOptions/useConnectionOptions'
import theme from './theme'
import { App, AppProps } from './App'

const VideoApp = ({ token }: AppProps) => {
    const connectionOptions = useConnectionOptions()
    const { error, setError } = useAppState()

    React.useEffect(() => {
        if (error) console.error('VideoApp error:', error)
    }, [error, setError])

    return (
        <VideoProvider options={connectionOptions} onError={setError}>
            <App token={token} />
        </VideoProvider>
    )
}
export const TwilioRoom = ({ token }: AppProps) => {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <AppStateProvider>
                <VideoApp token={token} />
            </AppStateProvider>
        </MuiThemeProvider>
    )
}

// const t =
//     'eyJjdHkiOiJ0d2lsaW8tZnBhO3Y9MSIsInR5cCI6IkpXVCIsImFsZyI6IkhTMjU2In0.eyJpc3MiOiJTSzhmMTY0ZTRiYTQ1MDIwYWM5NWNhYjg4MzA5ZDFjZjNhIiwiZXhwIjoxNjk3NTE4NDYwLCJncmFudHMiOnsiaWRlbnRpdHkiOiJzcyIsInZpZGVvIjp7InJvb20iOiJQSEFSTTAzMjMxMDE3LTAwMDAxIn19LCJqdGkiOiJTSzhmMTY0ZTRiYTQ1MDIwYWM5NWNhYjg4MzA5ZDFjZjNhLTE2OTc1MTQ4ODAiLCJzdWIiOiJBQ2U3MWY5ZjgyMmZiNzQxNTE3ZGJiNGFjMzBjMzU0YWYwIn0.-qWnnprZ7Gd0heKNgjhpZZztxHGh7TauTz0DRb8gPcU'
// ReactDOM.render(<TwilioRoom token={t} />, document.getElementById('root'))
