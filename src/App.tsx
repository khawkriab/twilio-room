import React from 'react';
import { styled, Theme } from '@material-ui/core/styles';

import MenuBar from './components/MenuBar/MenuBar';
import ReconnectingNotification from './components/ReconnectingNotification/ReconnectingNotification';
import Room from './components/Room/Room';

import useHeight from './hooks/useHeight/useHeight';
import useRoomState from './hooks/useRoomState/useRoomState';
import Controls from './components/Controls/Controls';
import LocalVideoPreview from './components/LocalVideoPreview/LocalVideoPreview';
import useVideoContext from './hooks/useVideoContext/useVideoContext';

const Container = styled('div')({
  position: 'relative',
  height: '100vh',
  maxHeight: '100%',
  backgroundColor: '#000',
});

const Main = styled('main')(({ theme }: { theme: Theme }) => ({
  height: '100%',
  overflow: 'hidden',
  background: 'black',
}));

export default function App() {
  const roomState = useRoomState();
  const { audioAndVideoTracksStatus } = useVideoContext();

  // Here we would like the height of the main container to be the height of the viewport.
  // On some mobile browsers, 'height: 100vh' sets the height equal to that of the screen,
  // not the viewport. This looks bad when the mobile browsers location bar is open.
  // We will dynamically set the height with 'window.innerHeight', which means that this
  // will look good on mobile browsers even after the location bar opens or closes.

  return (
    <Container>
      {audioAndVideoTracksStatus === 'finished' && <MenuBar />}

      {roomState === 'disconnected' ? (
        <LocalVideoPreview identity={'Preview Camera'} />
      ) : (
        <Main>
          <ReconnectingNotification />
          <Room />
          <Controls />
        </Main>
      )}
    </Container>
  );
}

export function AppRoom() {
  const roomState = useRoomState();
  const { audioAndVideoTracksStatus } = useVideoContext();

  // Here we would like the height of the main container to be the height of the viewport.
  // On some mobile browsers, 'height: 100vh' sets the height equal to that of the screen,
  // not the viewport. This looks bad when the mobile browsers location bar is open.
  // We will dynamically set the height with 'window.innerHeight', which means that this
  // will look good on mobile browsers even after the location bar opens or closes.
  const height = useHeight();

  return (
    <Container>
      {audioAndVideoTracksStatus === 'finished' && <MenuBar />}

      {roomState === 'disconnected' ? (
        <LocalVideoPreview identity={'Preview Camera'} />
      ) : (
        <Main>
          <ReconnectingNotification />
          <Room />
          <Controls />
        </Main>
      )}
    </Container>
  );
}
