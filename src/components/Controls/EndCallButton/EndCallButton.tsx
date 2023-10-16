import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import CallEnd from '@material-ui/icons/CallEnd';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
    },
  })
);

export default function EndCallButton(props: any) {
  const classes = useStyles();
  const { room } = useVideoContext();

  const disconnect = () => {
    // room.disconnect()
    console.log(props.endCall());
  }

  return (
    <Tooltip aria-controls="end-call" title={'End Call'} onClick={disconnect} placement="top" PopperProps={{ disablePortal: true }}>
      <Fab className={classes.fab} color="primary">
        <CallEnd />
      </Fab>
    </Tooltip>
  );
}
