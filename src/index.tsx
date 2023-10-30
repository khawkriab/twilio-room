import React from 'react';
import ReactDOM from 'react-dom';
import { Room, TwilioError } from 'twilio-video';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';

import App, { AppRoom } from './App';
import AppStateProvider, { useAppState } from './state';
import theme from './theme';
import { Callback } from './types';
import { ParticipantProvider } from './components/ParticipantProvider';
import { VideoProvider } from './components/VideoProvider';
import useConnectionOptions from './utils/useConnectionOptions/useConnectionOptions';
import UnsupportedBrowserWarning from './components/UnsupportedBrowserWarning/UnsupportedBrowserWarning';
import { TEventHandlers } from './components/VideoProvider/useEventHandlers/useEventHandlers';

export interface VideoAppProps {
  token?: string;
  onConnected?: Callback;
  onClickEndcall?: (room: Room) => void;
  onDisconnected?: () => void;
  onHandleError?: (error: Error | TwilioError | null, dismiss: Function) => void;
  eventHandlers?: TEventHandlers;
  showOnlyMainParticipant?: boolean;
  children?: React.ReactNode;
}

const VideoApp = ({ onHandleError, children, ...props }: VideoAppProps) => {
  const { error, setError } = useAppState();
  const connectionOptions = useConnectionOptions();

  React.useEffect(() => {
    if (onHandleError) onHandleError(error, () => setError(null));
  }, [error]);

  return (
    <VideoProvider options={connectionOptions} onError={setError} {...props}>
      <ParticipantProvider>{children}</ParticipantProvider>
    </VideoProvider>
  );
};

const TwilioRoom = (props: VideoAppProps) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <UnsupportedBrowserWarning>
      <AppStateProvider>
        <VideoApp {...props}>
          <App />
        </VideoApp>
      </AppStateProvider>
    </UnsupportedBrowserWarning>
  </MuiThemeProvider>
);

const TwilioRoomWrapper = ({ children, ...props }: VideoAppProps) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <UnsupportedBrowserWarning>
        <AppStateProvider>
          <VideoApp {...props}>
            <AppRoom>{children}</AppRoom>
          </VideoApp>
        </AppStateProvider>
      </UnsupportedBrowserWarning>
    </MuiThemeProvider>
  );
};

export default TwilioRoom;
export { TwilioRoomWrapper };
export { default as MainParticipant } from './components/MainParticipant/MainParticipant';
export { MTPublisher, MTSubscriber } from './components/ParticipantList/ParticipantList';

// ReactDOM.render(<TwilioRoom />, document.getElementById('root'));
