import React from 'react'
import ParticipantInfo from '../ParticipantInfo/ParticipantInfo'
import ParticipantTracks from '../ParticipantTracks/ParticipantTracks'
import { Participant as IParticipant } from 'twilio-video'

interface ParticipantProps {
    participant: IParticipant
    disableAudio?: boolean
    onClick: () => void
    isSelected: boolean
}

export default function Participant({ participant, disableAudio, onClick, isSelected }: ParticipantProps) {
    return (
        <ParticipantInfo participant={participant} onClick={onClick} isSelected={isSelected}>
            <ParticipantTracks participant={participant} disableAudio={disableAudio} />
        </ParticipantInfo>
    )
}
