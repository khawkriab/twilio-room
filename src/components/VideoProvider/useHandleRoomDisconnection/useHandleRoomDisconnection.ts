import { Room, TwilioError } from 'twilio-video';
import { useEffect } from 'react';

import { Callback } from '../../../types';

export default function useHandleRoomDisconnection(
  room: Room | null,
  onError: Callback,
  removeLocalAudioTrack: () => void,
  removeLocalVideoTrack: () => void,
  onDisconnectedCallback?: () => void
) {
  useEffect(() => {
    if (room) {
      const onDisconnected = (_: Room, error: TwilioError) => {
        if (error) {
          onError(error);
        }

        removeLocalAudioTrack();
        removeLocalVideoTrack();
        if (onDisconnectedCallback) {
          onDisconnectedCallback();
        }
      };

      room.on('disconnected', onDisconnected);
      return () => {
        room.off('disconnected', onDisconnected);
      };
    }
  }, [room, onError, removeLocalAudioTrack, removeLocalVideoTrack]);
}
