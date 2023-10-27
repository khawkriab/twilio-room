import React from 'react';
import Menu from './Menu/Menu';
import { styled } from '@material-ui/core';
import FlipCameraButton from '../Buttons/FlipCameraButton/FlipCameraButton';

const Container = styled('div')({
  position: 'absolute',
  top: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  zIndex: 10,
  background: 'rgba(0, 0, 0, 0.5)',
});

export default function MenuBar() {
  return (
    <Container>
      <FlipCameraButton />
      <Menu />
    </Container>
  );
}
