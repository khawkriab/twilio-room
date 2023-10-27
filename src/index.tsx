import React from 'react';
import ReactDOM from 'react-dom';
import { Room, TwilioError } from 'twilio-video';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';

import App from './App';
import AppStateProvider, { useAppState } from './state';
import theme from './theme';
import './types';
import { ParticipantProvider } from './components/ParticipantProvider';
import { VideoProvider } from './components/VideoProvider';
import useConnectionOptions from './utils/useConnectionOptions/useConnectionOptions';
import UnsupportedBrowserWarning from './components/UnsupportedBrowserWarning/UnsupportedBrowserWarning';
import { Callback } from './types';
import { TEventHandlers } from './components/VideoProvider/useEventHandlers/useEventHandlers';

export interface VideoAppProps {
  token?: string;
  onConnected?: Callback;
  onClickEndcall?: (disconnect: Room) => void;
  onDisconnected?: () => void;
  onHandleError?: (error: Error | TwilioError | null, dismiss: Function) => void;
  eventHandlers?: TEventHandlers;
  showOnlyMainParticipant?: boolean;
}

const VideoApp = ({ onHandleError, ...props }: VideoAppProps) => {
  const { error, setError } = useAppState();
  const connectionOptions = useConnectionOptions();

  React.useEffect(() => {
    if (onHandleError) onHandleError(error, () => setError(null));
  }, [error]);

  return (
    <VideoProvider options={connectionOptions} onError={setError} {...props}>
      <ParticipantProvider>
        <App />
      </ParticipantProvider>
    </VideoProvider>
  );
};

const TwilioRoom = (props: VideoAppProps) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <UnsupportedBrowserWarning>
      <AppStateProvider>
        <VideoApp {...props} />
      </AppStateProvider>
    </UnsupportedBrowserWarning>
  </MuiThemeProvider>
);

export default TwilioRoom;

// ReactDOM.render(<TwilioRoom />, document.getElementById('root'));
