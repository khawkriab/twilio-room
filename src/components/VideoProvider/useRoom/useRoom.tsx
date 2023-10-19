import { Callback } from '../../../../types'
import EventEmitter from 'events'
import { isMobile } from '../../../utils'
import Video, { ConnectOptions, LocalTrack, Room } from 'twilio-video'
import { useCallback, useEffect, useRef, useState } from 'react'

// @ts-ignore
window.TwilioVideo = Video

export default function useRoom(localTracks: LocalTrack[], onError: Callback, options?: ConnectOptions) {
    const [room, setRoom] = useState<Room | null>(null)
    const [isConnecting, setIsConnecting] = useState(false)
    const localTracksRef = useRef<LocalTrack[]>([])
    const optionsRef = useRef(options)

    useEffect(() => {
        // It can take a moment for Video.connect to connect to a room. During this time, the user may have enabled or disabled their
        // local audio or video tracks. If this happens, we store the localTracks in this ref, so that they are correctly published
        // once the user is connected to the room.
        localTracksRef.current = localTracks
    }, [localTracks])

    useEffect(() => {
        // This allows the connect function to always access the most recent version of the options object. This allows us to
        // reliably use the connect function at any time.
        optionsRef.current = options
    }, [options])

    const connect = useCallback(
        (token: any, onConected?: Callback) => {
            setIsConnecting(true)
            return Video.connect(token, { ...optionsRef.current, tracks: [] }).then(
                (newRoom) => {
                    setRoom(newRoom)
                    const disconnect = () => newRoom.disconnect()

                    // This app can add up to 16 'participantDisconnected' listeners to the room object, which can trigger
                    // a warning from the EventEmitter object. Here we increase the max listeners to suppress the warning.
                    newRoom.setMaxListeners(16)

                    newRoom.once('disconnected', () => {
                        // Reset the room only after all other `disconnected` listeners have been called.
                        setTimeout(() => setRoom(new EventEmitter() as Room))
                        window.removeEventListener('beforeunload', disconnect)

                        if (isMobile) {
                            window.removeEventListener('pagehide', disconnect)
                        }
                    })

                    // @ts-ignore
                    window.twilioRoom = newRoom

                    // Tracks can be supplied as arguments to the Video.connect() function and they will automatically be published.
                    // However, tracks must be published manually in order to set the priority on them.
                    // All video tracks are published with 'low' priority. This works because the video
                    // track that is displayed in the 'MainParticipant' component will have it's priority
                    // set to 'high' via track.setPriority()
                    localTracksRef.current.forEach((track) =>
                        newRoom.localParticipant.publishTrack(track, { priority: track.kind === 'video' ? 'standard' : 'high' })
                    )

                    setIsConnecting(false)
                    if (onConected) onConected(newRoom)

                    // Add a listener to disconnect from the room when a user closes their browser
                    window.addEventListener('beforeunload', disconnect)

                    if (isMobile) {
                        // Add a listener to disconnect from the room when a mobile user closes their browser
                        window.addEventListener('pagehide', disconnect)
                    }
                },
                (error) => {
                    onError(error)
                    setIsConnecting(false)
                }
            )
        },
        [onError]
    )

    return { room, isConnecting, connect }
}
