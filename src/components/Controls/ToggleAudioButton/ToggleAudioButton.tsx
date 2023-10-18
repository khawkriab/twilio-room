import React from 'react'
import { createStyles, makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'
import Fab from '@mui/material/Fab'
import Mic from '@mui/icons-material/Mic'
import MicOff from '@mui/icons-material/MicOff'
import Tooltip from '@mui/material/Tooltip'

import useLocalAudioToggle from '../../../hooks/useLocalAudioToggle/useLocalAudioToggle'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            margin: theme.spacing(1)
        }
    })
)

export default function ToggleAudioButton(props: { disabled?: boolean }) {
    const classes = useStyles()
    const [isAudioEnabled, toggleAudioEnabled] = useLocalAudioToggle()

    return (
        <Tooltip title={isAudioEnabled ? 'Mute Audio' : 'Unmute Audio'} placement='top' PopperProps={{ disablePortal: true }}>
            <Fab className={classes.fab} onClick={toggleAudioEnabled} disabled={props.disabled} data-cy-audio-toggle>
                {isAudioEnabled ? <Mic /> : <MicOff />}
            </Fab>
        </Tooltip>
    )
}
