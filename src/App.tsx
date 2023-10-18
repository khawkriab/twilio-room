import React from 'react'
import { styled, makeStyles } from '@mui/styles'
import Controls from './components/Controls/Controls'
import LocalVideoPreview from './components/LocalVideoPreview/LocalVideoPreview'
import MenuBar from './components/MenuBar/MenuBar'
import ReconnectingNotification from './components/ReconnectingNotification/ReconnectingNotification'
import Room from './components/Room/Room'
import theme from './theme'
import useRoomState from './hooks/useRoomState/useRoomState'
import useVideoContext from './hooks/useVideoContext/useVideoContext'
import { CircularProgress } from '@mui/material'

const useStyles = makeStyles({
    isPictureInPicture: {
        height: '100%',
        minHeight: '200px'
    },
    screen: {
        height: 'calc(100% - 64px)',
        [theme.breakpoints.down('xs')]: {
            height: 'calc(100% - 35px)'
        }
    },
    contentPip: {
        maxHeight: '40vh'
    },
    contentScreen: {
        height: '100%'
    },
    loadingSpinner: {
        marginLeft: '1em'
    }
})

const Container = styled('div')({
    // display: 'grid',
    // gridTemplateRows: '1fr auto',
    height: '100vh',
    maxHeight: '100%'
})

const Main = styled('main')(({ theme }) => ({
    overflow: 'hidden',
    backgroundColor: '#424242'
}))

export const App = () => {
    const classes = useStyles()
    const roomState = useRoomState()
    const { isConnecting } = useVideoContext()

    return (
        <Container>
            {isConnecting && <CircularProgress className={classes.loadingSpinner} />}

            {roomState === 'disconnected' ? (
                <LocalVideoPreview />
            ) : (
                <Main>
                    <MenuBar />
                    <Room />
                    <Controls />
                </Main>
            )}
            <ReconnectingNotification />
        </Container>
    )
}
