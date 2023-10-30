import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Fab, Tooltip } from '@material-ui/core';
import CallEnd from '@material-ui/icons/CallEnd';

import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      background: theme.brand,
      color: 'white',
      '&:hover': {
        background: '#600101',
      },
    },
  })
);

export default function EndCallButton() {
  const classes = useStyles();
  const { clickEndcall } = useVideoContext();

  return (
    <Fab className={classes.fab} onClick={clickEndcall} data-cy-disconnect>
      <Tooltip title={'End Call'} placement="top">
        <CallEnd />
      </Tooltip>
    </Fab>
  );
}
