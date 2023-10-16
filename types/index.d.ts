import { LocalVideoTrack, RemoteVideoTrack, TwilioError } from 'twilio-video';

declare module 'twilio-video' {

  interface VideoCodecSettings {
    simulcast?: boolean;
  }

  interface LocalVideoTrack {
    isSwitchedOff: undefined;
    setPriority: undefined;
  }

  interface VideoBandwidthProfileOptions {
    trackSwitchOffMode?: 'predicted' | 'detected' | 'disabled';
  }
}

declare module "@material-ui/core" {
  interface ThemeProviderProps {
    children?: React.ReactNode;
  }
}
 

declare global {
  namespace  Window {
    interface visualViewport {
      scale: number;
    }
  }

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

  // interface FunctionComponent<P = {}> {
  //   (props: PropsWithChildren<P>, context?: any): ReactElement | null;
  //   propTypes?: WeakValidationMap<P>;
  //   contextTypes?: ValidationMap<any>;
  //   defaultProps?: Partial<P>;
  //   displayName?: string;
  // }
}

export type Callback = (...args: any[]) => void;

export type ErrorCallback = (error: TwilioError) => void;

export type IVideoTrack = LocalVideoTrack | RemoteVideoTrack;

export type RoomType = 'group' | 'group-small' | 'peer-to-peer' | 'go';
