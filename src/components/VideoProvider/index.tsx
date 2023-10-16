import React, { createContext } from 'react'
import { CreateLocalTrackOptions, ConnectOptions, LocalAudioTrack, LocalVideoTrack, Room, TwilioError } from 'twilio-video'
import { ErrorCallback } from '../../../types'
import { SelectedParticipantProvider } from './useSelectedParticipant/useSelectedParticipant'

import AttachVisibilityHandler from './AttachVisibilityHandler/AttachVisibilityHandler'
import useHandleRoomDisconnectionErrors from './useHandleRoomDisconnectionErrors/useHandleRoomDisconnectionErrors'
import useHandleTrackPublicationFailed from './useHandleTrackPublicationFailed/useHandleTrackPublicationFailed'
import useLocalTracks from './useLocalTracks/useLocalTracks'
import useRoom from './useRoom/useRoom'
import useHandleRoomDisconnection from './useHandleRoomDisconnection/useHandleRoomDisconnection'

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
    connect: (token: string) => Promise<void>
    onError: ErrorCallback
    getLocalVideoTrack: (newOptions?: CreateLocalTrackOptions) => Promise<LocalVideoTrack>
    getLocalAudioTrack: (deviceId?: string) => Promise<LocalAudioTrack>
    isAcquiringLocalTracks: boolean
    removeLocalVideoTrack: () => void
}

export const VideoContext = createContext<IVideoContext>(null!)

interface VideoProviderProps {
    options?: ConnectOptions
    onError: ErrorCallback
    children?: React.ReactNode
}

export function VideoProvider({ options, children, onError }: VideoProviderProps) {
    const onErrorCallback = (error: TwilioError) => {
        console.log(`ERROR: ${error.message}`, error)
        onError(error)
    }

    const { localTracks, getLocalVideoTrack, getLocalAudioTrack, isAcquiringLocalTracks, removeLocalVideoTrack, removeLocalAudioTrack } =
        useLocalTracks()
    const { room, isConnecting, connect } = useRoom(localTracks, onErrorCallback, options)

    // Register onError and onDisconnect callback functions.
    useHandleRoomDisconnection(room, onError, removeLocalAudioTrack, removeLocalVideoTrack)
    useHandleRoomDisconnectionErrors(room, onError)
    useHandleTrackPublicationFailed(room, onError)

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
                removeLocalVideoTrack
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
