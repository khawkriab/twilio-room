import { TwilioError } from 'twilio-video'
import { useEffect } from 'react'

export default function useEventError(error: TwilioError | null, errorCallback?: (error: TwilioError | null) => void) {
    useEffect(() => {
        if (error && errorCallback) {
            errorCallback(error)
        }
    }, [error, errorCallback])
}
