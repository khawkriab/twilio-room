import * as React from 'react'
import { styled, makeStyles } from '@material-ui/core/styles'
import Controls from './components/Controls/Controls'
import LocalVideoPreview from './components/LocalVideoPreview/LocalVideoPreview'
import MenuBar from './components/MenuBar/MenuBar'
import ReconnectingNotification from './components/ReconnectingNotification/ReconnectingNotification'
import Room from './components/Room/Room'
import theme from './theme'
import useRoomState from './hooks/useRoomState/useRoomState'
import useVideoContext from './hooks/useVideoContext/useVideoContext'

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
    }
})

const Container = styled('div')({
    display: 'grid',
    gridTemplateRows: 'auto 1fr'
})

const Main = styled('main')(({ theme }) => ({
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#424242'
}))

export interface AppProps {
    token?: string
}

export const App = ({ token }: AppProps) => {
    const roomState = useRoomState()
    const { connect } = useVideoContext()

    React.useEffect(() => {
        if (token) {
            const createRoom = async () => {
                await connect(token)
            }
            createRoom()
        }
    }, [token])

    return (
        <Container>
            <MenuBar />
            <Main>
                {roomState === 'disconnected' ? <LocalVideoPreview /> : <Room />}
                <Controls />
            </Main>
            <ReconnectingNotification />
        </Container>
    )
}
