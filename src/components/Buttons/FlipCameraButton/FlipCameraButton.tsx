import React from 'react';
import FlipCameraIosIcon from '@material-ui/icons/FlipCameraIos';

import { Button } from '@material-ui/core';
import useFlipCameraToggle from '../../../hooks/useFlipCameraToggle/useFlipCameraToggle';

export default function FlipCameraButton(props: { buttonClassName?: string }) {
  const { flipCameraDisabled, toggleFacingMode, flipCameraSupported } = useFlipCameraToggle();

  return flipCameraSupported ? (
    <Button
      disabled={flipCameraDisabled}
      onClick={toggleFacingMode}
      className={props.buttonClassName}
      data-cy-flip-camera
    >
      <FlipCameraIosIcon fontSize="medium" color="secondary" />
    </Button>
  ) : null;
}
