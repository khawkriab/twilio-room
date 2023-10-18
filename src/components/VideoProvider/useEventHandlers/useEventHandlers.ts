import { RemoteParticipant, Room, TwilioError } from 'twilio-video'
import { useEffect } from 'react'

export type TEventHandlers = {
    disconnected?: (room: Room, error: TwilioError) => void
    dominantSpeakerChanged?: (dominantSpeaker: RemoteParticipant) => void
    participantConnected?: (participant: RemoteParticipant) => void
    participantDisconnected?: () => void
    participantReconnected?: () => void
    participantReconnecting?: () => void
    reconnected?: () => void
    reconnecting?: () => void
    recordingStarted?: () => void
    recordingStopped?: () => void
    trackDimensionsChanged?: () => void
    trackDisabled?: () => void
    trackEnabled?: () => void
    trackMessage?: () => void
    trackPublished?: () => void
    trackPublishPriorityChanged?: () => void
    trackStarted?: () => void
    trackSubscribed?: () => void
    trackSubscriptionFailed?: () => void
    trackSwitchedOff?: () => void
    trackSwitchedOn?: () => void
    trackUnpublished?: () => void
    trackUnsubscribed?: () => void
    trackWarning?: () => void
    trackWarningsCleared?: () => void
}

export default function useEventHandlers(room: Room | null, eventHandlers?: TEventHandlers) {
    useEffect(() => {
        if (room && eventHandlers) {
            console.log('%c>> eventHandlers:', 'background: #00f; color: #fff', eventHandlers)
            // if (eventHandlers!.disconnected!) room.on('disconnected', eventHandlers!.disconnected)
            // if (eventHandlers!.dominantSpeakerChanged!) room.on('dominantSpeakerChanged', eventHandlers!.dominantSpeakerChanged)
            // if (eventHandlers!.participantConnected!) room.on('participantConnected', eventHandlers!.participantConnected)
            // if (eventHandlers!.participantDisconnected!) room.on('participantDisconnected', eventHandlers!.participantDisconnected)
            // if (eventHandlers!.participantReconnected!) room.on('participantReconnected', eventHandlers!.participantReconnected)
            // if (eventHandlers!.participantReconnecting!) room.on('participantReconnecting', eventHandlers!.participantReconnecting)
            // if (eventHandlers!.reconnected!) room.on('reconnected', eventHandlers!.reconnected)
            // if (eventHandlers!.reconnecting!) room.on('reconnecting', eventHandlers!.reconnecting)
            // if (eventHandlers!.recordingStarted!) room.on('recordingStarted', eventHandlers!.recordingStarted)
            // if (eventHandlers!.recordingStopped!) room.on('recordingStopped', eventHandlers!.recordingStopped)
            // if (eventHandlers!.trackDimensionsChanged!) room.on('trackDimensionsChanged', eventHandlers!.trackDimensionsChanged)
            // if (eventHandlers!.trackDisabled!) room.on('trackDisabled', eventHandlers!.trackDisabled)
            // if (eventHandlers!.trackEnabled!) room.on('trackEnabled', eventHandlers!.trackEnabled)
            // if (eventHandlers!.trackMessage!) room.on('trackMessage', eventHandlers!.trackMessage)
            // if (eventHandlers!.trackPublished!) room.on('trackPublished', eventHandlers!.trackPublished)
            // if (eventHandlers!.trackPublishPriorityChanged!)
            //     room.on('trackPublishPriorityChanged', eventHandlers!.trackPublishPriorityChanged)
            // if (eventHandlers!.trackStarted!) room.on('trackStarted', eventHandlers!.trackStarted)
            // if (eventHandlers!.trackSubscribed!) room.on('trackSubscribed', eventHandlers!.trackSubscribed)
            // if (eventHandlers!.trackSubscriptionFailed!) room.on('trackSubscriptionFailed', eventHandlers!.trackSubscriptionFailed)
            // if (eventHandlers!.trackSwitchedOff!) room.on('trackSwitchedOff', eventHandlers!.trackSwitchedOff)
            // if (eventHandlers!.trackSwitchedOn!) room.on('trackSwitchedOn', eventHandlers!.trackSwitchedOn)
            // if (eventHandlers!.trackUnpublished!) room.on('trackUnpublished', eventHandlers!.trackUnpublished)
            // if (eventHandlers!.trackUnsubscribed!) room.on('trackUnsubscribed', eventHandlers!.trackUnsubscribed)
            // if (eventHandlers!.trackWarning!) room.on('trackWarning', eventHandlers!.trackWarning)
            // if (eventHandlers!.trackWarningsCleared!) room.on('trackWarningsCleared', eventHandlers!.trackWarningsCleared)
        }
    }, [room, eventHandlers])
}
