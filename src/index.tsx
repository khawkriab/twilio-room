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
//     'eyJjdHkiOiJ0d2lsaW8tZnBhO3Y9MSIsInR5cCI6IkpXVCIsImFsZyI6IkhTMjU2In0.eyJpc3MiOiJTSzhmMTY0ZTRiYTQ1MDIwYWM5NWNhYjg4MzA5ZDFjZjNhIiwiZXhwIjoxNjk3NDY5ODE3LCJncmFudHMiOnsiaWRlbnRpdHkiOiJhYSIsInZpZGVvIjp7InJvb20iOiJQSEFSTTAzMjMxMDE2LTAwMDAxIn19LCJqdGkiOiJTSzhmMTY0ZTRiYTQ1MDIwYWM5NWNhYjg4MzA5ZDFjZjNhLTE2OTc0NjYxMTIiLCJzdWIiOiJBQ2U3MWY5ZjgyMmZiNzQxNTE3ZGJiNGFjMzBjMzU0YWYwIn0.4_0Y7nfvV7PC7heZAEH7tOowWf9xgJplDgHYNN-WEI4'
// ReactDOM.render(<TwilioRoom token={t} />, document.getElementById('root'))
