import React from 'react';
import clsx from 'clsx';

import useIsUserActive from './useIsUserActive/useIsUserActive';
import useRoomState from '../../hooks/useRoomState/useRoomState';
import { Theme, createStyles, makeStyles } from '@material-ui/core';
import ToggleAudioButton from '../Buttons/ToggleAudioButton/ToggleAudioButton';
import ToggleVideoButton from '../Buttons/ToggleVideoButton/ToggleVideoButton';
import EndCallButton from '../Buttons/EndCallButton/EndCallButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      position: 'absolute',
      right: '50%',
      transform: 'translate(50%, 30px)',
      bottom: '50px',
      zIndex: 6,
      transition: 'opacity 1.2s, transform 1.2s, visibility 0s 1.2s',
      opacity: 0,
      visibility: 'hidden',
      maxWidth: 'min-content',
      '&.showControls, &:hover': {
        transition: 'opacity 0.6s, transform 0.6s, visibility 0s',
        opacity: 1,
        visibility: 'visible',
        transform: 'translate(50%, 0px)',
      },
      [theme.breakpoints.down('md')]: {
        bottom: `${theme.sidebarMobileHeight + 12}px`,
      },
    },
    item: {
      marginLeft: '12px',
      marginRight: '12px',
    },
  })
);
function Controls() {
  const classes = useStyles();
  const roomState = useRoomState();
  const isReconnecting = roomState === 'reconnecting';
  const isUserActive = useIsUserActive();
  const showControls = isUserActive || roomState === 'disconnected';

  return (
    <div className={clsx(classes.container, { showControls })}>
      <div className={classes.item}>
        <ToggleAudioButton disabled={isReconnecting} />
      </div>
      <div className={classes.item}>
        <ToggleVideoButton disabled={isReconnecting} />
      </div>
      {roomState === 'connected' && (
        <div className={classes.item}>
          <EndCallButton />
        </div>
      )}
    </div>
  );
}
export default Controls;
