import { LocalVideoTrack, RemoteVideoTrack, TwilioError } from 'twilio-video'

declare module 'twilio-video' {
    interface VideoCodecSettings {
        simulcast?: boolean
    }

    interface LocalVideoTrack {
        isSwitchedOff: undefined
        setPriority: undefined
    }

    interface VideoBandwidthProfileOptions {
        trackSwitchOffMode?: 'predicted' | 'detected' | 'disabled'
    }
}

declare global {
    namespace Window {
        interface visualViewport {
            scale: number
        }
    }

    interface MediaDevices {
        getDisplayMedia(constraints: MediaStreamConstraints): Promise<MediaStream>
    }

    interface HTMLMediaElement {
        setSinkId?(sinkId: string): Promise<undefined>
    }

    // Helps create a union type with TwilioError
    interface Error {
        code: undefined
    }
}

export type Callback = (...args: any[]) => void

export type ErrorCallback = (error: TwilioError) => void

export type IVideoTrack = LocalVideoTrack | RemoteVideoTrack

export type RoomType = 'group' | 'group-small' | 'peer-to-peer' | 'go'
