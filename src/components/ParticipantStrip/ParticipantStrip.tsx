import React from 'react';
import Participant from '../Participant/Participant';
import { styled, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import useParticipants from '../../hooks/useParticipants/useParticipants';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import useSelectedParticipant from '../VideoProvider/useSelectedParticipant/useSelectedParticipant';

const Container = styled('aside')({});

const ScrollContainer = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('xs')]: {
    display: 'flex',
  },
}));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pictureInPicture: {
      overflowY: 'initial',
      overflowX: 'auto',
      padding: 0,
      display: 'flex',
    },
    screen: {
      padding: '0.5em',
      overflowY: 'auto',
      [theme.breakpoints.down('xs')]: {
        overflowY: 'initial',
        overflowX: 'auto',
        padding: 0,
        display: 'flex',
      },
    },
    scrollContainerPP: {
      display: 'grid',
      gridTemplateColumns: 'auto auto auto',
      gridGap: '6px',
    },
    scrollContainerScreen: {
      [theme.breakpoints.down('xs')]: {
        display: 'flex',
      },
    }
  })
);

export default function ParticipantStrip(Props: any) {
  const { room: { localParticipant } } = useVideoContext();
  const classes = useStyles();
  const participants = useParticipants();
  const [selectedParticipant, setSelectedParticipant] = useSelectedParticipant();

  return (
    <Container className={Props.pictureInPicture ? classes.pictureInPicture : classes.screen}>
      <ScrollContainer className={Props.pictureInPicture ? classes.scrollContainerPP : classes.scrollContainerScreen}>
        <Participant
          pictureInPicture={Props.pictureInPicture}
          participant={localParticipant}
          isSelected={selectedParticipant === localParticipant}
          onClick={() => setSelectedParticipant(localParticipant)}
        />
        {participants.map(participant => (
          <Participant
            pictureInPicture={Props.pictureInPicture}
            key={participant.sid}
            participant={participant}
            isSelected={selectedParticipant === participant}
            onClick={() => setSelectedParticipant(participant)}
          />
        ))}
      </ScrollContainer>
    </Container>
  );
}
