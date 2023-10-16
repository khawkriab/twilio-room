import React, { createContext, useContext, useState, useEffect } from 'react'
import { Participant, Room } from 'twilio-video'

type selectedParticipantContextType = [Participant | null, (participant: Participant) => void]

export const selectedParticipantContext = createContext<selectedParticipantContextType>(null!)

export default function useSelectedParticipant() {
    const [selectedParticipant, setSelectedParticipant] = useContext(selectedParticipantContext)
    return [selectedParticipant, setSelectedParticipant] as const
}

type SelectedParticipantProviderProps = {
    room: Room
    children?: React.ReactNode
}

export function SelectedParticipantProvider({ room, children }: SelectedParticipantProviderProps) {
    const [selectedParticipant, _setSelectedParticipant] = useState<Participant | null>(null)
    const setSelectedParticipant = (participant: Participant) =>
        _setSelectedParticipant((prevParticipant) => (prevParticipant === participant ? null : participant))

    useEffect(() => {
        const onDisconnect = () => _setSelectedParticipant(null)
        room.on('disconnected', onDisconnect)

        return () => {
            room.on('disconnected', onDisconnect)
        }
    }, [room])

    const values: selectedParticipantContextType = React.useMemo(() => {
        return [selectedParticipant, setSelectedParticipant]
    }, [selectedParticipant, setSelectedParticipant])

    return <selectedParticipantContext.Provider value={values}>{children}</selectedParticipantContext.Provider>
}
