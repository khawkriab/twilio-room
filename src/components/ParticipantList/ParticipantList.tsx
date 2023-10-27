import React from 'react';
import clsx from 'clsx';
import Participant from '../Participant/Participant';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import useParticipantsContext from '../../hooks/useParticipantsContext/useParticipantsContext';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import useSelectedParticipant from '../VideoProvider/useSelectedParticipant/useSelectedParticipant';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      overflowY: 'auto',
      background: 'rgb(79, 83, 85)',
      // gridArea: '1 / 2 / 1 / 3',
      zIndex: 5,
      [theme.breakpoints.down('sm')]: {
        // gridArea: '2 / 1 / 3 / 3',
        overflowY: 'initial',
        overflowX: 'auto',
        display: 'flex',
      },
    },
    pinMainParticipant: {
      display: 'none',
    },
    transparentBackground: {
      background: 'transparent',
    },
    scrollContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    innerScrollContainer: {
      width: `calc(${theme.sidebarWidth}px - 3em)`,
      padding: '1.5em 0',
      [theme.breakpoints.down('sm')]: {
        width: 'auto',
        padding: `${theme.sidebarMobilePadding}px`,
        display: 'flex',
      },
    },
  })
);

export default function ParticipantList() {
  const classes = useStyles();
  const { room, pinMainParticipant } = useVideoContext();
  const localParticipant = room!.localParticipant;
  const { speakerViewParticipants } = useParticipantsContext();
  const [selectedParticipant, setSelectedParticipant] = useSelectedParticipant();

  if (speakerViewParticipants.length === 0 && !localParticipant) return null; // Don't render this component if there are no remote participants.

  return (
    <aside
      data-cy-participant-list
      className={clsx(classes.container, classes.transparentBackground, {
        [classes.pinMainParticipant]: pinMainParticipant,
      })}
    >
      <div className={classes.scrollContainer}>
        <div className={classes.innerScrollContainer}>
          <Participant participant={localParticipant} isLocalParticipant={true} />
          {speakerViewParticipants.map((participant) => {
            return (
              <Participant
                key={participant.sid}
                participant={participant}
                isSelected={participant === selectedParticipant}
                onClick={() => setSelectedParticipant(participant)}
                // hideParticipant={hideParticipant}
              />
            );
          })}
        </div>
      </div>
    </aside>
  );
}
