import React, { createContext, useCallback, useEffect } from 'react';
import { CreateLocalTrackOptions, ConnectOptions, LocalAudioTrack, LocalVideoTrack, Room } from 'twilio-video';
import { ErrorCallback, TEventHandlers, TrackProperty } from '../../types';
import { SelectedParticipantProvider } from './useSelectedParticipant/useSelectedParticipant';

import AttachVisibilityHandler from './AttachVisibilityHandler/AttachVisibilityHandler';
import useHandleRoomDisconnection from './useHandleRoomDisconnection/useHandleRoomDisconnection';
import useHandleTrackPublicationFailed from './useHandleTrackPublicationFailed/useHandleTrackPublicationFailed';
import useLocalTracks from './useLocalTracks/useLocalTracks';
import useRestartAudioTrackOnDeviceChange from './useRestartAudioTrackOnDeviceChange/useRestartAudioTrackOnDeviceChange';
import useRoom from './useRoom/useRoom';
import useEventHandlers from './useEventHandlers/useEventHandlers';

/*
 *  The hooks used by the VideoProvider component are different than the hooks found in the 'hooks/' directory. The hooks
 *  in the 'hooks/' directory can be used anywhere in a video application, and they can be used any number of times.
 *  the hooks in the 'VideoProvider/' directory are intended to be used by the VideoProvider component only. Using these hooks
 *  elsewhere in the application may cause problems as these hooks should not be used more than once in an application.
 */

export type TAudioAndVideoTracksStatus = 'wait' | 'searching' | 'finished';

export interface IVideoContext {
  room: Room | null;
  localTracks: (LocalAudioTrack | LocalVideoTrack)[];
  isConnecting: boolean;
  pinMainParticipant: boolean;
  audioAndVideoTracksStatus: TAudioAndVideoTracksStatus;
  connect: (token: string, onConnected?: (room: Room, trackProperty: TrackProperty) => void) => Promise<void>;
  onError: ErrorCallback;
  getLocalVideoTrack: (newOptions?: CreateLocalTrackOptions) => Promise<LocalVideoTrack>;
  isAcquiringLocalTracks: boolean;
  removeLocalVideoTrack: () => void;
  getAudioAndVideoTracks: () => Promise<void>;
  clickEndcall: () => void;
}

export const VideoContext = createContext<IVideoContext>(null!);

interface VideoProviderProps {
  token?: string;
  options?: ConnectOptions;
  showOnlyMainParticipant?: boolean;
  eventHandlers?: TEventHandlers;
  onConnected?: (room: Room, trackProperty: TrackProperty) => void;
  onClickEndcall?: (room: Room) => void;
  onDisconnected?: () => void;
  onError: ErrorCallback;
  children?: React.ReactNode;
}

export function VideoProvider({
  token,
  options,
  showOnlyMainParticipant = false,
  eventHandlers,
  onConnected,
  onError,
  onClickEndcall,
  onDisconnected,
  children,
}: VideoProviderProps) {
  const [pinMainParticipant, setPinMainParticipant] = React.useState<boolean>(false);
  const onErrorCallback: ErrorCallback = useCallback(
    (error) => {
      console.log(`ERROR: ${error.message}`, error);
      onError(error);
    },
    [onError]
  );

  const {
    audioAndVideoTracksStatus,
    localTracks,
    getLocalVideoTrack,
    isAcquiringLocalTracks,
    removeLocalAudioTrack,
    removeLocalVideoTrack,
    getAudioAndVideoTracks,
  } = useLocalTracks(onErrorCallback);

  const { room, isConnecting, connect } = useRoom(localTracks, onErrorCallback, options);

  const onDisconnect = () => {
    if (room) {
      if (onClickEndcall) {
        onClickEndcall(room);
      } else {
        room.disconnect();
      }
    }
  };

  // Register callback functions to be called on room disconnect.
  useHandleRoomDisconnection(room, onError, removeLocalAudioTrack, removeLocalVideoTrack, onDisconnected);
  useHandleTrackPublicationFailed(room, onError);
  useRestartAudioTrackOnDeviceChange(localTracks);
  useEventHandlers(room, eventHandlers);
  // extends
  useEffect(() => {
    getAudioAndVideoTracks();
    // getLocalVideoTrack();
  }, []);
  useEffect(() => {
    if (token && audioAndVideoTracksStatus === 'finished') {
      connect(token, onConnected);
    }
  }, [token, audioAndVideoTracksStatus]);
  useEffect(() => {
    setPinMainParticipant(showOnlyMainParticipant);
  }, [showOnlyMainParticipant]);

  return (
    <VideoContext.Provider
      value={{
        room,
        localTracks,
        isConnecting,
        pinMainParticipant,
        audioAndVideoTracksStatus,
        onError: onErrorCallback,
        getLocalVideoTrack,
        connect,
        isAcquiringLocalTracks,
        removeLocalVideoTrack,
        getAudioAndVideoTracks,
        clickEndcall: onDisconnect,
      }}
    >
      <SelectedParticipantProvider room={room}>{children}</SelectedParticipantProvider>
      {/* 
        The AttachVisibilityHandler component is using the useLocalVideoToggle hook
        which must be used within the VideoContext Provider.
      */}
      <AttachVisibilityHandler />
    </VideoContext.Provider>
  );
}
