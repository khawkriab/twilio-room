import React, { useCallback, useRef } from 'react';

import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Fab, Tooltip } from '@material-ui/core';
import Videocam from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';

import useDevices from '../../../hooks/useDevices/useDevices';
import useLocalVideoToggle from '../../../hooks/useLocalVideoToggle/useLocalVideoToggle';

const useStyles = makeStyles(() =>
  createStyles({
    fab: {
      color: '#000000de',
      background: '#e0e0e0',
      '&:hover': {
        background: '#ffffff',
      },
    },
  })
);

export default function ToggleVideoButton(props: { disabled?: boolean; className?: string }) {
  const classes = useStyles();
  const [isVideoEnabled, toggleVideoEnabled] = useLocalVideoToggle();
  const lastClickTimeRef = useRef(0);
  const { hasVideoInputDevices } = useDevices();

  const toggleVideo = useCallback(() => {
    if (Date.now() - lastClickTimeRef.current > 500) {
      lastClickTimeRef.current = Date.now();
      toggleVideoEnabled();
    }
  }, [toggleVideoEnabled]);

  return (
    <Fab className={classes.fab} onClick={toggleVideo} disabled={!hasVideoInputDevices || props.disabled}>
      <Tooltip
        title={isVideoEnabled ? 'Mute Video' : 'Unmute Video'}
        placement="top"
        PopperProps={{ disablePortal: true }}
      >
        {isVideoEnabled ? <Videocam /> : <VideocamOff />}
      </Tooltip>
    </Fab>
  );
}
