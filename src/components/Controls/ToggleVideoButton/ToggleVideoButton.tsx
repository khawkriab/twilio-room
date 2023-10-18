import React, { useCallback, useRef } from 'react'
import { createStyles, makeStyles } from '@mui/styles'

import Fab from '@mui/material/Fab'
import Tooltip from '@mui/material/Tooltip'
import Videocam from '@mui/icons-material/Videocam'
import VideocamOff from '@mui/icons-material/VideocamOff'

import useLocalVideoToggle from '../../../hooks/useLocalVideoToggle/useLocalVideoToggle'
import { Theme } from '@mui/material'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            margin: theme.spacing(1)
        }
    })
)

export default function ToggleVideoButton(props: { disabled?: boolean }) {
    const classes = useStyles()
    const [isVideoEnabled, toggleVideoEnabled] = useLocalVideoToggle()
    const lastClickTimeRef = useRef(0)

    const toggleVideo = useCallback(() => {
        if (Date.now() - lastClickTimeRef.current > 200) {
            lastClickTimeRef.current = Date.now()
            toggleVideoEnabled()
        }
    }, [toggleVideoEnabled])

    return (
        <Tooltip title={isVideoEnabled ? 'Mute Video' : 'Unmute Video'} placement='top' PopperProps={{ disablePortal: true }}>
            <Fab className={classes.fab} onClick={toggleVideo} disabled={props.disabled}>
                {isVideoEnabled ? <Videocam /> : <VideocamOff />}
            </Fab>
        </Tooltip>
    )
}
