import React from 'react';
import Fab from '@material-ui/core/Fab';
import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import Tooltip from '@material-ui/core/Tooltip';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import useLocalAudioToggle from '../../../hooks/useLocalAudioToggle/useLocalAudioToggle';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

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

export default function ToggleAudioButton(props: { disabled?: boolean; className?: string }) {
  const classes = useStyles();
  const [isAudioEnabled, toggleAudioEnabled] = useLocalAudioToggle();
  const { localTracks } = useVideoContext();
  const hasAudioTrack = localTracks.some((track) => track.kind === 'audio');

  return (
    <Fab
      className={classes.fab}
      data-cy-audio-toggle
      onClick={toggleAudioEnabled}
      disabled={!hasAudioTrack || props.disabled}
    >
      <Tooltip
        title={isAudioEnabled ? 'Mute Audio' : 'Unmute Audio'}
        placement="top"
        PopperProps={{ disablePortal: true }}
      >
        {isAudioEnabled ? <Mic /> : <MicOff />}
      </Tooltip>
    </Fab>
  );
}
