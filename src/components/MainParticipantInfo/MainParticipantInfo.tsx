import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { LocalAudioTrack, LocalVideoTrack, Participant, RemoteAudioTrack, RemoteVideoTrack } from 'twilio-video';

import AudioLevelIndicator from '../AudioLevelIndicator/AudioLevelIndicator';
import AvatarIcon from '../../icons/AvatarIcon';
import NetworkQualityLevel from '../NetworkQualityLevel/NetworkQualityLevel';
import Typography from '@material-ui/core/Typography';

import useIsTrackSwitchedOff from '../../hooks/useIsTrackSwitchedOff/useIsTrackSwitchedOff';
import useParticipantIsReconnecting from '../../hooks/useParticipantIsReconnecting/useParticipantIsReconnecting';
import usePublications from '../../hooks/usePublications/usePublications';
import useTrack from '../../hooks/useTrack/useTrack';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import VideoIndicator from '../VideoIndicator/VideoIndicator';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gridArea: 'mainparticipant',
  },
  identity: {
    background: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    padding: '0.1em 0.3em 0.1em 0',
    display: 'inline-flex',
    '& svg': {
      marginRight: '0.3em',
    },
    '& path:not([fill="red"])': {
      fill: 'white',
    },
    marginRight: '0.4em',
    alignItems: 'center',
  },
  infoContainer: {
    position: 'absolute',
    zIndex: 2,
    height: '100%',
    width: '100%',
  },
  reconnectingContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(40, 42, 43, 0.75)',
    zIndex: 1,
  },
  fullWidth: {
    gridArea: '1 / 1 / 2 / 3',
    [theme.breakpoints.down('md')]: {
      gridArea: '1 / 1 / 3 / 3',
    },
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'black',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
    '& svg': {
      transform: 'scale(2)',
    },
  },
  recordingIndicator: {
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    padding: '0.1em 0.3em 0.1em 0',
    fontSize: '1.2rem',
    height: '28px',
    [theme.breakpoints.down('md')]: {
      bottom: 'auto',
      right: 0,
      top: 0,
    },
  },
  circle: {
    height: '12px',
    width: '12px',
    background: 'red',
    borderRadius: '100%',
    margin: '0 0.6em',
    animation: `1.25s $pulsate ease-out infinite`,
  },
  '@keyframes pulsate': {
    '0%': {
      background: `#A90000`,
    },
    '50%': {
      background: '#f00',
    },
    '100%': {
      background: '#A90000',
    },
  },
}));

interface MainParticipantInfoProps {
  participant: Participant;
  children: React.ReactNode;
}

export default function MainParticipantInfo({ participant, children }: MainParticipantInfoProps) {
  const classes = useStyles();
  const { room } = useVideoContext();
  const localParticipant = room!.localParticipant;
  const isLocal = localParticipant === participant;

  const publications = usePublications(participant);
  const videoPublication = publications.find((p) => !p.trackName.includes('screen') && p.kind === 'video');
  const screenSharePublication = publications.find((p) => p.trackName.includes('screen'));

  const videoTrack = useTrack(screenSharePublication || videoPublication);
  const isVideoEnabled = Boolean(videoTrack);

  const audioPublication = publications.find((p) => p.kind === 'audio');
  const audioTrack = useTrack(audioPublication) as LocalAudioTrack | RemoteAudioTrack | undefined;

  const isVideoSwitchedOff = useIsTrackSwitchedOff(videoTrack as LocalVideoTrack | RemoteVideoTrack);
  const isParticipantReconnecting = useParticipantIsReconnecting(participant);

  return (
    <div data-cy-main-participant data-cy-participant={participant.identity} className={classes.container}>
      {/* <div
      data-cy-main-participant
      data-cy-participant={participant.identity}
      className={clsx(classes.container, {
        [classes.fullWidth]: !isRemoteParticipantScreenSharing,
      })}
    > */}
      <div className={classes.infoContainer}>
        <div style={{ display: 'flex' }}>
          <div className={classes.identity}>
            <AudioLevelIndicator audioTrack={audioTrack} />
            <VideoIndicator isVideoEnabled={isVideoEnabled && !isVideoSwitchedOff} />
            <Typography variant="body1" color="inherit">
              {participant.identity}
              {isLocal && ' (You)'}
              {screenSharePublication && ' - Screen'}
            </Typography>
          </div>
          <NetworkQualityLevel participant={participant} />
        </div>
      </div>
      {(!isVideoEnabled || isVideoSwitchedOff) && (
        <div className={classes.avatarContainer}>
          <AvatarIcon />
        </div>
      )}
      {isParticipantReconnecting && (
        <div className={classes.reconnectingContainer}>
          <Typography variant="body1" style={{ color: 'white' }}>
            Reconnecting...
          </Typography>
        </div>
      )}
      {children}
    </div>
  );
}
