import React, { createContext, useState } from 'react'
import { CreateLocalTrackOptions, ConnectOptions, LocalAudioTrack, LocalVideoTrack, Room, TwilioError } from 'twilio-video'
import { Callback, ErrorCallback } from '../../../types'
import { SelectedParticipantProvider } from './useSelectedParticipant/useSelectedParticipant'

import AttachVisibilityHandler from './AttachVisibilityHandler/AttachVisibilityHandler'
import useHandleRoomDisconnectionErrors from './useHandleRoomDisconnectionErrors/useHandleRoomDisconnectionErrors'
import useHandleTrackPublicationFailed from './useHandleTrackPublicationFailed/useHandleTrackPublicationFailed'
import useLocalTracks from './useLocalTracks/useLocalTracks'
import useRoom from './useRoom/useRoom'
import useHandleRoomDisconnection from './useHandleRoomDisconnection/useHandleRoomDisconnection'
import useEventHandlers, { TEventHandlers } from './useEventHandlers/useEventHandlers'
import useEventError from './useEventError/useEventError'

/*
 *  The hooks used by the VideoProvider component are different than the hooks found in the 'hooks/' directory. The hooks
 *  in the 'hooks/' directory can be used anywhere in a video application, and they can be used any number of times.
 *  the hooks in the 'VideoProvider/' directory are intended to be used by the VideoProvider component only. Using these hooks
 *  elsewhere in the application may cause problems as these hooks should not be used more than once in an application.
 */

export interface IVideoContext {
    room: Room
    localTracks: (LocalAudioTrack | LocalVideoTrack)[]
    isConnecting: boolean
    connect: (token: string, onConnected: Callback) => Promise<void>
    onError: ErrorCallback
    getLocalVideoTrack: (newOptions?: CreateLocalTrackOptions) => Promise<LocalVideoTrack>
    getLocalAudioTrack: (deviceId?: string) => Promise<LocalAudioTrack>
    isAcquiringLocalTracks: boolean
    removeLocalVideoTrack: () => void
    clickEndcall: () => void
}

export const VideoContext = createContext<IVideoContext>(null!)

interface VideoProviderProps {
    token?: String
    options?: ConnectOptions
    onConnected?: Callback
    onClickEndcall?: (disconnect: Room) => void
    onDisconnected?: () => void
    onHandleError?: (error: TwilioError | null) => void
    eventHandlers?: TEventHandlers
    children?: React.ReactNode
}

export function VideoProvider({
    token,
    options,
    onConnected,
    onHandleError,
    onClickEndcall,
    onDisconnected,
    eventHandlers,
    children
}: VideoProviderProps) {
    const [error, setError] = useState<TwilioError | null>(null)

    const onErrorCallback = (error: TwilioError) => {
        console.log(`ERROR: ${error.message}`, error)
        setError(error)
    }
    const { localTracks, getLocalVideoTrack, getLocalAudioTrack, isAcquiringLocalTracks, removeLocalVideoTrack, removeLocalAudioTrack } =
        useLocalTracks()
    const { room, isConnecting, connect } = useRoom(localTracks, onErrorCallback, options)

    const onDisconnect = () => {
        if (onClickEndcall!) {
            onClickEndcall(room!.disconnect())
        } else {
            room!.disconnect()
        }
    }

    // Register onError and onDisconnect callback functions.
    useHandleRoomDisconnection(room, setError, removeLocalAudioTrack, removeLocalVideoTrack, onDisconnected)
    useHandleRoomDisconnectionErrors(room, setError)
    useHandleTrackPublicationFailed(room, setError)
    useEventHandlers(room, eventHandlers)
    useEventError(error, onHandleError!)

    React.useEffect(() => {
        if (token) connect(token, onConnected)
    }, [token])

    return (
        <VideoContext.Provider
            value={{
                room,
                localTracks,
                isConnecting,
                onError: onErrorCallback,
                getLocalVideoTrack,
                getLocalAudioTrack,
                connect,
                isAcquiringLocalTracks,
                removeLocalVideoTrack,
                clickEndcall: onDisconnect
            }}
        >
            <SelectedParticipantProvider room={room}>{children}</SelectedParticipantProvider>
            {/* 
        The AttachVisibilityHandler component is using the useLocalVideoToggle hook
        which must be used within the VideoContext Provider.
      */}
            <AttachVisibilityHandler />
        </VideoContext.Provider>
    )
}
