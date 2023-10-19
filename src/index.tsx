import * as React from 'react'
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
    showOnlyMainParticipant?: boolean
}

export const TwilioRoom = ({
    token,
    onConnected,
    onClickEndcall,
    onDisconnected,
    onHandleError,
    eventHandlers,
    showOnlyMainParticipant
}: VideoAppProps) => {
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
            showOnlyMainParticipant={showOnlyMainParticipant}
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
