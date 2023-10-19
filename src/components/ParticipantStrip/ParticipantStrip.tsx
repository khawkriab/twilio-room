import React from 'react'
import { Theme } from '@mui/material'
import clsx from 'clsx'
import { createStyles, makeStyles } from '@mui/styles'

import Participant from '../Participant/Participant'
import useParticipants from '../../hooks/useParticipants/useParticipants'
import useVideoContext from '../../hooks/useVideoContext/useVideoContext'
import useSelectedParticipant from '../VideoProvider/useSelectedParticipant/useSelectedParticipant'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: '0.5em',
            overflowY: 'auto',
            [theme.breakpoints.down('xs')]: {
                overflowY: 'initial',
                overflowX: 'auto',
                padding: 0,
                display: 'flex'
            }
        },
        onlyMainMonitor: {
            display: 'none'
        },
        scrollContainerScreen: {
            [theme.breakpoints.down('xs')]: {
                display: 'flex'
            }
        }
    })
)

export default function ParticipantStrip() {
    const { onlyMainMonitor, room } = useVideoContext()
    const classes = useStyles()
    const participants = useParticipants()
    const [selectedParticipant, setSelectedParticipant] = useSelectedParticipant()

    return (
        <aside className={clsx({ [classes.onlyMainMonitor]: onlyMainMonitor }, classes.container)}>
            <div className={classes.scrollContainerScreen}>
                {room && (
                    <Participant
                        participant={room.localParticipant}
                        isSelected={selectedParticipant === room.localParticipant}
                        onClick={() => setSelectedParticipant(room.localParticipant)}
                    />
                )}
                {participants.map((participant) => (
                    <Participant
                        key={participant.sid}
                        participant={participant}
                        isSelected={selectedParticipant === participant}
                        onClick={() => setSelectedParticipant(participant)}
                    />
                ))}
            </div>
        </aside>
    )
}
