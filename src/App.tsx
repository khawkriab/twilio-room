import React from 'react'
import { styled, makeStyles } from '@mui/styles'
import Controls from './components/Controls/Controls'
import LocalVideoPreview from './components/LocalVideoPreview/LocalVideoPreview'
import MenuBar from './components/MenuBar/MenuBar'
import ReconnectingNotification from './components/ReconnectingNotification/ReconnectingNotification'
import Room from './components/Room/Room'
import useRoomState from './hooks/useRoomState/useRoomState'
import useVideoContext from './hooks/useVideoContext/useVideoContext'
import { CircularProgress, Theme } from '@mui/material'

const useStyles = makeStyles({
    loadingSpinner: {
        marginLeft: '1em'
    }
})

const Container = styled('div')({
    position: 'relative',
    height: '100vh',
    maxHeight: '100%'
})

const Main = styled('main')(({ theme }: { theme: Theme }) => ({
    height: '100%',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.default
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
