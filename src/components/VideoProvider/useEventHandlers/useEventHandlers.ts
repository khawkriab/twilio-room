import { Room } from 'twilio-video';
import { useEffect } from 'react';
import { TEventHandlers } from '../../../types';

export default function useEventHandlers(room: Room | null, eventHandlers?: TEventHandlers) {
  useEffect(() => {
    if (room && eventHandlers) {
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
