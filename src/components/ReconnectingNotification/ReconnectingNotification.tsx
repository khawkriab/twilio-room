import React from 'react'
import { makeStyles } from '@mui/styles'

import InfoIcon from '@mui/icons-material/Info'
import Snackbar from '@mui/material/Snackbar'
import { SnackbarContent } from '@mui/material'

import useRoomState from '../../hooks/useRoomState/useRoomState'

const useStyles = makeStyles({
    snackbar: {
        backgroundColor: '#6db1ff'
    },
    message: {
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        marginRight: '0.8em'
    }
})

export default function ReconnectingNotification() {
    const classes = useStyles()
    const roomState = useRoomState()

    return (
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={roomState === 'reconnecting'}>
            <SnackbarContent
                className={classes.snackbar}
                message={
                    <span className={classes.message}>
                        <InfoIcon className={classes.icon} />
                        Reconnecting&hellip;
                    </span>
                }
            />
        </Snackbar>
    )
}
