import React, { useState } from 'react'
import { TwilioRoomWrapper, TwilioRoom } from 'twilio-room'

const t =
    'eyJjdHkiOiJ0d2lsaW8tZnBhO3Y9MSIsInR5cCI6IkpXVCIsImFsZyI6IkhTMjU2In0.eyJpc3MiOiJTSzhmMTY0ZTRiYTQ1MDIwYWM5NWNhYjg4MzA5ZDFjZjNhIiwiZXhwIjoxNjk3NzA4OTg5LCJncmFudHMiOnsiaWRlbnRpdHkiOiJPTyIsInZpZGVvIjp7InJvb20iOiJQSEFSTTAzMjMxMDE5LTAwMDAxIn19LCJqdGkiOiJTSzhmMTY0ZTRiYTQ1MDIwYWM5NWNhYjg4MzA5ZDFjZjNhLTE2OTc3MDUzNDQiLCJzdWIiOiJBQ2U3MWY5ZjgyMmZiNzQxNTE3ZGJiNGFjMzBjMzU0YWYwIn0.oFloSH3Q4DuqCz3mGjyjVyPkhq66__G4uwgbbxMs3SU'

export const App = () => {
    const [isPnP, setIsPnP] = useState<boolean>(false)
    const eventHandles = {
        dominantSpeakerChanged: (e: any) => {
            console.log('%c>> e:', 'background: #00f; color: #fff', e)
        }
    }

    return (
        <div style={{ height: '80vh', border: '4px solid #00f' }}>
            <div>
                <button onClick={() => setIsPnP(!isPnP)}>pnp</button>
            </div>
            <div style={{ height: '60vh', border: '4px solid #f00' }}>
                <TwilioRoomWrapper>
                    <TwilioRoom token={t} showOnlyMainParticipant={isPnP} eventHandlers={eventHandles} />
                </TwilioRoomWrapper>
            </div>
        </div>
    )
}
