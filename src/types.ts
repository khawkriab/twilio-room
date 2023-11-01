import {
  LocalParticipant,
  LocalTrackPublication,
  LocalVideoTrack,
  RemoteDataTrack,
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  RemoteVideoTrack,
  Room,
  Track,
  TwilioError,
} from 'twilio-video';

declare module 'twilio-video' {
  // These help to create union types between Local and Remote VideoTracks
  interface LocalVideoTrack {
    isSwitchedOff: undefined;
    setPriority: undefined;
  }
}

declare global {
  interface MediaDevices {
    getDisplayMedia(constraints: MediaStreamConstraints): Promise<MediaStream>;
  }

  interface HTMLMediaElement {
    setSinkId?(sinkId: string): Promise<undefined>;
  }

  // Helps create a union type with TwilioError
  interface Error {
    code: undefined;
  }
}

export type TrackPublication = LocalTrackPublication | RemoteTrackPublication;

export type TrackProperty = {
  tracks: TrackPublication[];
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
};

export type Callback = (...args: any[]) => void;

export type ErrorCallback = (error: TwilioError | Error) => void;

export type IVideoTrack = LocalVideoTrack | RemoteVideoTrack;

export type RoomType = 'group' | 'group-small' | 'peer-to-peer' | 'go';

export type RecordingRule = {
  type: 'include' | 'exclude';
  all?: boolean;
  kind?: 'audio' | 'video';
  publisher?: string;
};

export type RecordingRules = RecordingRule[];

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
