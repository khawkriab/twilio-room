import React, { useEffect, useState } from 'react'
import ParticipantStrip from '../ParticipantStrip/ParticipantStrip'
import { styled, createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import MainParticipant from '../MainParticipant/MainParticipant'
// import styled from 'styled-components'
import useParticipants from '../../hooks/useParticipants/useParticipants'
import { LocalVideoTrack, LocalAudioTrack } from 'twilio-video'
import useVideoContext from '../../hooks/useVideoContext/useVideoContext'
import useIsTrackEnabled from '../../hooks/useIsTrackEnabled/useIsTrackEnabled'
import useRoomState from '../../hooks/useRoomState/useRoomState'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        pictureInPicture: {
            gridTemplateAreas: '"participantList" "."',
            gridTemplateColumns: `auto`,
            gridTemplateRows: '100%',
            gridGap: '6px'
        },
        screen: {
            gridTemplateColumns: `${theme.sidebarWidth}px 1fr`,
            gridTemplateAreas: '". participantList"',
            gridTemplateRows: '100%',
            [theme.breakpoints.down('xs')]: {
                gridTemplateAreas: '"participantList" "."',
                gridTemplateColumns: `auto`,
                gridTemplateRows: `calc(100% - ${theme.sidebarMobileHeight + 12}px) ${theme.sidebarMobileHeight + 6}px`,
                gridGap: '6px'
            }
        }
    })
)

const Container = styled('div')({
    position: 'relative',
    height: '100%',
    display: 'grid'
})

const Icon = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: '1rem',
    right: '12px',
    zIndex: 9999
}))

export default function Room(Props: any) {
    const classes = useStyles()
    const roomState = useRoomState()
    const participants = useParticipants()
    const { localTracks } = useVideoContext()
    const videoTrack = localTracks.find((track) => track.name.includes('camera')) as LocalVideoTrack
    const audioTrack = localTracks.find((track) => track.kind === 'audio') as LocalAudioTrack
    const isTrackEnabled = useIsTrackEnabled(audioTrack as LocalAudioTrack)

    useEffect(() => {
        if (roomState === 'connected') {
            // Props.handleAccessAllowDevice({
            //     videoType: 'TWILIO',
            //     streamsStatus: null,
            //     publishStatus: participants ? 'true' : 'false',
            //     videoStatus: videoTrack ? 'true' : 'false',
            //     audioStatus: isTrackEnabled ? 'true' : 'false'
            // })
        }
    }, [roomState])

    return (
        <Container className={Props.isPictureInPicture ? classes.pictureInPicture : classes.screen}>
            {/* {!Props?.pictureInPicture && <ParticipantStrip />} */}
            {/* <Icon>
                <i className={`fab fa-chromecast ${participants ? 'text-success' : 'text-danger'} mr-2`}></i>
                <i className={`fas fa-video ${videoTrack ? 'text-success' : 'text-danger'} mr-2 text-success`}></i>
                <i className={`fas fa-volume-up ${isTrackEnabled ? 'text-success' : 'text-danger'} mr-2 text-success`}></i>
            </Icon> */}
            <ParticipantStrip />
            <MainParticipant />
        </Container>
    )
}
