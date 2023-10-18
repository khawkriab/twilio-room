import React from 'react'
import { createStyles } from '@mui/styles'
import { makeStyles } from '@mui/styles'
import CallEnd from '@mui/icons-material/CallEnd'
import Fab from '@mui/material/Fab'
import Tooltip from '@mui/material/Tooltip'

import useVideoContext from '../../../hooks/useVideoContext/useVideoContext'
import { Theme } from '@mui/material/styles'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            margin: theme.spacing(1)
        }
    })
)

export default function EndCallButton() {
    const classes = useStyles()
    const { clickEndcall } = useVideoContext()

    return (
        <Tooltip aria-controls='end-call' title={'End Call'} onClick={clickEndcall} placement='top' PopperProps={{ disablePortal: true }}>
            <Fab className={classes.fab} color='primary'>
                <CallEnd />
            </Fab>
        </Tooltip>
    )
}
