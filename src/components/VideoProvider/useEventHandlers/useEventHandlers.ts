import {
  LocalParticipant,
  LocalTrackPublication,
  RemoteDataTrack,
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  RemoteVideoTrack,
  Room,
  Track,
  TwilioError,
} from 'twilio-video';
import { useRef, useEffect } from 'react';

export type TEventHandlers = {
  disconnected?: (room: Room, error: TwilioError) => void;
  dominantSpeakerChanged?: (dominantSpeaker: RemoteParticipant) => void;
  participantConnected?: (participant: RemoteParticipant) => void;
  participantDisconnected?: (participant: RemoteParticipant) => void;
  participantReconnected?: (participant: RemoteParticipant) => void;
  participantReconnecting?: (participant: RemoteParticipant) => void;
  reconnected?: () => void;
  reconnecting?: (error: TwilioError) => void;
  recordingStarted?: () => void;
  recordingStopped?: () => void;
  dimensionsChanged?: (track: RemoteVideoTrack, participant: RemoteParticipant) => void;
  disabled?: (publication: RemoteTrackPublication, participant: RemoteParticipant) => void;
  enabled?: (publication: RemoteTrackPublication, participant: RemoteParticipant) => void;
  message?: (data: string | ArrayBuffer, track: RemoteDataTrack, participant: RemoteParticipant) => void;
  published?: (publication: RemoteTrackPublication, participant: RemoteParticipant) => void;
  publishPriorityChanged?: (
    priority: Track.Priority,
    publication: RemoteTrackPublication,
    participant: RemoteParticipant
  ) => void;
  started?: (track: RemoteTrack, participant: RemoteParticipant) => void;
  subscribed?: (track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) => void;
  subscriptionFailed?: (
    error: TwilioError,
    publication: RemoteTrackPublication,
    participant: RemoteParticipant
  ) => void;
  switchedOff?: (track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) => void;
  switchedOn?: (track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) => void;
  unpublished?: (publication: RemoteTrackPublication, participant: RemoteParticipant) => void;
  unsubscribed?: (track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) => void;
  warning?: (name: string, publication: LocalTrackPublication, participant: LocalParticipant) => void;
  warningsCleared?: (publication: LocalTrackPublication, participant: LocalParticipant) => void;
};

export default function useEventHandlers(room: Room | null, eventHandlers?: TEventHandlers) {
  useEffect(() => {
    if (room && eventHandlers) {
      console.log('eventHandlers:', eventHandlers);
      console.log('room:', room);
      if (eventHandlers?.disconnected) room.on('disconnected', eventHandlers.disconnected);
      if (eventHandlers?.dominantSpeakerChanged)
        room.on('dominantSpeakerChanged', eventHandlers.dominantSpeakerChanged);
      if (eventHandlers?.participantConnected) room.on('participantConnected', eventHandlers.participantConnected);
      if (eventHandlers?.participantDisconnected)
        room.on('participantDisconnected', eventHandlers.participantDisconnected);
      if (eventHandlers?.participantReconnected)
        room.on('participantReconnected', eventHandlers.participantReconnected);
      if (eventHandlers?.participantReconnecting)
        room.on('participantReconnecting', eventHandlers.participantReconnecting);
      if (eventHandlers?.reconnected) room.on('reconnected', eventHandlers.reconnected);
      if (eventHandlers?.reconnecting) room.on('reconnecting', eventHandlers.reconnecting);
      if (eventHandlers?.recordingStarted) room.on('recordingStarted', eventHandlers.recordingStarted);
      if (eventHandlers?.recordingStopped) room.on('recordingStopped', eventHandlers.recordingStopped);
      if (eventHandlers?.dimensionsChanged) room.on('trackDimensionsChanged', eventHandlers.dimensionsChanged);
      if (eventHandlers?.disabled) room.on('trackDisabled', eventHandlers.disabled);
      if (eventHandlers?.enabled) room.on('trackEnabled', eventHandlers.enabled);
      if (eventHandlers?.message) room.on('trackMessage', eventHandlers.message);
      if (eventHandlers?.published) room.on('trackPublished', eventHandlers.published);
      if (eventHandlers?.publishPriorityChanged)
        room.on('trackPublishPriorityChanged', eventHandlers.publishPriorityChanged);
      if (eventHandlers?.started) room.on('trackStarted', eventHandlers.started);
      if (eventHandlers?.subscribed) room.on('trackSubscribed', eventHandlers.subscribed);
      if (eventHandlers?.subscriptionFailed) room.on('trackSubscriptionFailed', eventHandlers.subscriptionFailed);
      if (eventHandlers?.switchedOff) room.on('trackSwitchedOff', eventHandlers.switchedOff);
      if (eventHandlers?.switchedOn) room.on('trackSwitchedOn', eventHandlers.switchedOn);
      if (eventHandlers?.unpublished) room.on('trackUnpublished', eventHandlers.unpublished);
      if (eventHandlers?.unsubscribed) room.on('trackUnsubscribed', eventHandlers.unsubscribed);
      if (eventHandlers?.warning) room.on('trackWarning', eventHandlers.warning);
      if (eventHandlers?.warningsCleared) room.on('trackWarningsCleared', eventHandlers.warningsCleared);
    }
  }, [room, eventHandlers]);
}
