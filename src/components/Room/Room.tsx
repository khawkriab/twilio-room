import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import MainParticipant from '../MainParticipant/MainParticipant';
import { makeStyles, Theme } from '@material-ui/core';
import { Participant, Room as IRoom } from 'twilio-video';
import ParticipantList from '../ParticipantList/ParticipantList';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import { ParticipantAudioTracks } from '../ParticipantAudioTracks/ParticipantAudioTracks';

const useStyles = makeStyles((theme: Theme) => {
  const totalMobileSidebarHeight = `${
    theme.sidebarMobileHeight + theme.sidebarMobilePadding * 2 + theme.participantBorderWidth
  }px`;
  return {
    container: {
      position: 'relative',
      display: 'grid',
      gridTemplateAreas: '". mainparticipant"',
      gridTemplateColumns: `${theme.sidebarWidth}px 1fr`,
      gridTemplateRows: '100%',
      height: '100vh',
      maxHeight: '100%',
      '&.pinMainParticipant': {
        gridTemplateAreas: '"mainparticipant"',
        gridTemplateColumns: `auto`,
        gridTemplateRows: '100%',
        gridGap: 0,
      },
      [theme.breakpoints.down('md')]: {
        gridTemplateAreas: '"mainparticipant" "."',
        gridTemplateColumns: `auto`,
        gridTemplateRows: `calc(100% - ${totalMobileSidebarHeight}) ${totalMobileSidebarHeight}`,
        gridGap: '6px',
      },
    },
  };
});

/**
 * This hook turns on speaker view when screensharing is active, regardless of if the
 * user was already using speaker view or gallery view. Once screensharing has ended, the user's
 * view will return to whatever they were using prior to screenshare starting.
 */

export function useSetSpeakerViewOnScreenShare(
  screenShareParticipant: Participant | undefined,
  room: IRoom | null,
  setIsGalleryViewActive: React.Dispatch<React.SetStateAction<boolean>>,
  isGalleryViewActive: boolean
) {
  const isGalleryViewActiveRef = useRef(isGalleryViewActive);

  // Save the user's view setting whenever they change to speaker view or gallery view:
  useEffect(() => {
    isGalleryViewActiveRef.current = isGalleryViewActive;
  }, [isGalleryViewActive]);

  useEffect(() => {
    if (screenShareParticipant && screenShareParticipant !== room!.localParticipant) {
      // When screensharing starts, save the user's previous view setting (speaker or gallery):
      const prevIsGalleryViewActive = isGalleryViewActiveRef.current;
      // Turn off gallery view so that the user can see the screen that is being shared:
      setIsGalleryViewActive(false);
      return () => {
        // If the user was using gallery view prior to screensharing, turn gallery view back on
        // once screensharing stops:
        if (prevIsGalleryViewActive) {
          setIsGalleryViewActive(prevIsGalleryViewActive);
        }
      };
    }
  }, [screenShareParticipant, setIsGalleryViewActive, room]);
}

export default function Room() {
  const classes = useStyles();
  const { pinMainParticipant } = useVideoContext();

  return (
    <div
      data-cy-room
      className={clsx(classes.container, {
        pinMainParticipant,
      })}
    >
      {/* 
        This ParticipantAudioTracks component will render the audio track for all participants in the room.
        It is in a separate component so that the audio tracks will always be rendered, and that they will never be 
        unnecessarily unmounted/mounted as the user switches between Gallery View and speaker View.
      */}
      <ParticipantAudioTracks />
      <ParticipantList />
      <MainParticipant />
      {/* <ChatWindow /> */}
      {/* <BackgroundSelectionDialog /> */}
    </div>
  );
}
