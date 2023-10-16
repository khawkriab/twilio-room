import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Menu from './Menu/Menu'
import FlipCameraButton from './FlipCameraButton/FlipCameraButton'
import LocalAudioLevelIndicator from './DeviceSelector/LocalAudioLevelIndicator/LocalAudioLevelIndicator'
import { useAppState } from '../../state'
import useRoomState from '../../hooks/useRoomState/useRoomState'
import CircularProgress from '@material-ui/core/CircularProgress'
import useVideoContext from '../../hooks/useVideoContext/useVideoContext'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            backgroundColor: theme.palette.background.default
        },
        toolbar: {
            [theme.breakpoints.down('xs')]: {
                padding: 0
            }
        },
        rightButtonContainer: {
            display: 'flex',
            alignItems: 'center',
            marginLeft: 'auto',
            [theme.breakpoints.down('xs')]: {
                justifyContent: 'center'
            }
        },
        rightButton: {
            fontSize: '0.8rem',
            minWidth: '50px',
            padding: '0.25rem 1.2rem'
        },
        rightContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            padding: 0,
            [theme.breakpoints.down('xs')]: {
                justifyContent: 'center'
            }
        },
        phone: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            padding: 0,
            [theme.breakpoints.down('xs')]: {
                textAlign: 'center',
                justifyContent: 'center'
            }
        },
        rightContainerP: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '1rem'
        },
        form: {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            [theme.breakpoints.up('md')]: {
                marginLeft: '2.2em'
            }
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            maxWidth: 200
        },
        loadingSpinner: {
            marginLeft: '1em'
        },
        displayName: {
            margin: '1.1em 0.6em',
            minWidth: '200px',
            fontWeight: 600
        },
        joinButton: {
            margin: '1em'
        },
        roomName: {
            color: '#FFF',
            fontSize: '1rem',
            [theme.breakpoints.down('xs')]: {
                marginLeft: '1rem'
            }
        }
    })
)

export default function MenuBar(Props?: any) {
    const classes = useStyles()
    const { isFetching } = useAppState()
    const roomState = useRoomState()
    const { isConnecting } = useVideoContext()

    return (
        <AppBar className={classes.container} position='static'>
            <Toolbar className={classes.toolbar}>
                <Grid className='w-100'>
                    <Grid>
                        <>
                            {
                                roomState === 'disconnected' ||
                                    isConnecting ||
                                    (isFetching && <CircularProgress className={classes.loadingSpinner} />)
                                // : (
                                //     <div className={classes.roomName}>{Props?.roomName}</div>
                                // )
                            }
                        </>
                    </Grid>
                    <Grid className={classes.rightContainer}>
                        <FlipCameraButton />
                        <LocalAudioLevelIndicator />
                        <Menu />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
