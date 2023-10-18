import React from 'react'
import { styled } from '@mui/material/styles'

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

const BandwidthWarningContainer = styled('div')({
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
})

const Warning = styled('h3')({
    textAlign: 'center',
    margin: '0.6em 0'
})

export default function BandwidthWarning() {
    return (
        <BandwidthWarningContainer>
            <div>
                <ErrorOutlineIcon fontSize='large' />
            </div>
            <Warning>Insufficient Bandwidth</Warning>
        </BandwidthWarningContainer>
    )
}
