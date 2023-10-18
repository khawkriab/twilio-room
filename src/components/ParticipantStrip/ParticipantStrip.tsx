import React from 'react'
import Participant from '../Participant/Participant'
import { styled, createStyles, makeStyles } from '@mui/styles'
import useParticipants from '../../hooks/useParticipants/useParticipants'
import useVideoContext from '../../hooks/useVideoContext/useVideoContext'
import useSelectedParticipant from '../VideoProvider/useSelectedParticipant/useSelectedParticipant'
import { Theme } from '@mui/material'

const Container = styled('aside')({})

const ScrollContainer = styled('div')(({ theme }: { theme: Theme }) => ({
    [theme.breakpoints.down('xs')]: {
        display: 'flex'
    }
}))

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        pictureInPicture: {
            overflowY: 'initial',
            overflowX: 'auto',
            padding: 0,
            display: 'flex'
        },
        screen: {
            padding: '0.5em',
            overflowY: 'auto',
            [theme.breakpoints.down('xs')]: {
                overflowY: 'initial',
                overflowX: 'auto',
                padding: 0,
                display: 'flex'
            }
        },
        scrollContainerPP: {
            display: 'grid',
            gridTemplateColumns: 'auto auto auto',
            gridGap: '6px'
        },
        scrollContainerScreen: {
            [theme.breakpoints.down('xs')]: {
                display: 'flex'
            }
        }
    })
)

export default function ParticipantStrip() {
    const {
        room: { localParticipant }
    } = useVideoContext()
    const classes = useStyles()
    const participants = useParticipants()
    const [selectedParticipant, setSelectedParticipant] = useSelectedParticipant()

    return (
        <Container className={classes.screen}>
            <ScrollContainer className={classes.scrollContainerScreen}>
                <Participant
                    participant={localParticipant}
                    isSelected={selectedParticipant === localParticipant}
                    onClick={() => setSelectedParticipant(localParticipant)}
                />
                {participants.map((participant) => (
                    <Participant
                        key={participant.sid}
                        participant={participant}
                        isSelected={selectedParticipant === participant}
                        onClick={() => setSelectedParticipant(participant)}
                    />
                ))}
            </ScrollContainer>
        </Container>
    )
}
