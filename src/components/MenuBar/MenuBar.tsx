import React from 'react'
import Menu from './Menu/Menu'
import FlipCameraButton from './FlipCameraButton/FlipCameraButton'
import { styled } from '@mui/material/styles'

const Container = styled('div')({
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    zIndex: 10
})

export default function MenuBar() {
    return (
        <Container>
            <FlipCameraButton />
            <Menu />
        </Container>
    )
}
