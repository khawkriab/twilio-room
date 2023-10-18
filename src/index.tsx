import * as React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

import AppStateProvider from './state'
import { VideoProvider } from './components/VideoProvider'
import useConnectionOptions from './utils/useConnectionOptions/useConnectionOptions'
import theme from './theme'
import { App } from './App'
import { Callback } from '../types'
import { Room, TwilioError } from 'twilio-video'
import { TEventHandlers } from './components/VideoProvider/useEventHandlers/useEventHandlers'

export interface VideoAppProps {
    token?: string
    onConnected?: Callback
    onClickEndcall?: (disconnect: Room) => void
    onDisconnected?: () => void
    onHandleError?: (error: TwilioError | null) => void
    eventHandlers?: TEventHandlers
}

export const TwilioRoom = ({ token, onConnected, onClickEndcall, onDisconnected, onHandleError, eventHandlers }: VideoAppProps) => {
    const connectionOptions = useConnectionOptions()

    return (
        <VideoProvider
            token={token}
            options={connectionOptions}
            onConnected={onConnected}
            onClickEndcall={onClickEndcall}
            onDisconnected={onDisconnected}
            onHandleError={onHandleError}
            eventHandlers={eventHandlers}
        >
            <App />
        </VideoProvider>
    )
}
export const TwilioRoomWrapper = (props: React.PropsWithChildren<{}>) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppStateProvider>{props.children}</AppStateProvider>
        </ThemeProvider>
    )
}

// const t =
//     'eyJjdHkiOiJ0d2lsaW8tZnBhO3Y9MSIsInR5cCI6IkpXVCIsImFsZyI6IkhTMjU2In0.eyJpc3MiOiJTSzhmMTY0ZTRiYTQ1MDIwYWM5NWNhYjg4MzA5ZDFjZjNhIiwiZXhwIjoxNjk3NjQxMTY0LCJncmFudHMiOnsiaWRlbnRpdHkiOiJhYSIsInZpZGVvIjp7InJvb20iOiJQSEFSTTAzMjMxMDE4LTAwMDAxIn19LCJqdGkiOiJTSzhmMTY0ZTRiYTQ1MDIwYWM5NWNhYjg4MzA5ZDFjZjNhLTE2OTc2Mzc2MzIiLCJzdWIiOiJBQ2U3MWY5ZjgyMmZiNzQxNTE3ZGJiNGFjMzBjMzU0YWYwIn0.I8wH8is6BPUbzTBZCBjeAEg-xXDwjMqraDJTB-a_q5s'

// const JoinRoom = () => {
//     return (
//         <TwilioRoomWrapper>
//             <TwilioRoom token={t} />
//         </TwilioRoomWrapper>
//     )
// }
// ReactDOM.render(<JoinRoom />, document.getElementById('root'))
