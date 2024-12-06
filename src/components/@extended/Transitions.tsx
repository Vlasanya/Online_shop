import React, { ReactNode, forwardRef } from 'react';
import PropTypes from 'prop-types';

import Collapse, { CollapseProps } from '@mui/material/Collapse';
import Fade, { FadeProps } from '@mui/material/Fade';
import Grow, { GrowProps } from '@mui/material/Grow';
import Slide, { SlideProps } from '@mui/material/Slide';
import Zoom, { ZoomProps } from '@mui/material/Zoom';
import Box from '@mui/material/Box';

type TransitionType = 'grow' | 'collapse' | 'fade' | 'slide' | 'zoom';
type TransitionPosition =
  | 'top-left'
  | 'top-right'
  | 'top'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom';

interface TransitionsProps {
  children: ReactNode;
  position?: TransitionPosition;
  type?: TransitionType;
  direction?: 'up' | 'right' | 'left' | 'down';
  timeout?: number;
}

const transitions = forwardRef<HTMLDivElement, TransitionsProps>(
  ({ children, position = 'top-left', type = 'grow', direction = 'up', ...others }, ref) => {
    let positionSX: Record<string, string> = {
      transformOrigin: '0 0 0',
    };

    switch (position) {
      case 'top-right':
        positionSX = { transformOrigin: 'top right' };
        break;
      case 'top':
        positionSX = { transformOrigin: 'top' };
        break;
      case 'bottom-left':
        positionSX = { transformOrigin: 'bottom left' };
        break;
      case 'bottom-right':
        positionSX = { transformOrigin: 'bottom right' };
        break;
      case 'bottom':
        positionSX = { transformOrigin: 'bottom' };
        break;
      case 'top-left':
      default:
        positionSX = { transformOrigin: '0 0 0' };
        break;
    }

    return (
      <Box ref={ref}>
        {type === 'grow' && (
          <Grow
            {...(others as GrowProps)}
            timeout={{
              appear: 0,
              enter: 150,
              exit: 150,
            }}
          >
            <Box sx={positionSX}>{children}</Box>
          </Grow>
        )}
        {type === 'collapse' && (
          <Collapse {...(others as CollapseProps)} sx={positionSX}>
            {children}
          </Collapse>
        )}
        {type === 'fade' && (
          <Fade
            {...(others as FadeProps)}
            timeout={{
              appear: 0,
              enter: 300,
              exit: 150,
            }}
          >
            <Box sx={positionSX}>{children}</Box>
          </Fade>
        )}
        {type === 'slide' && (
          <Slide
            {...(others as SlideProps)}
            timeout={{
              appear: 0,
              enter: 150,
              exit: 150,
            }}
            direction={direction}
          >
            <Box sx={positionSX}>{children}</Box>
          </Slide>
        )}
        {type === 'zoom' && (
          <Zoom {...(others as ZoomProps)}>
            <Box sx={positionSX}>{children}</Box>
          </Zoom>
        )}
      </Box>
    );
  }
);

transitions.displayName = 'Transitions';

export default transitions;

export const PopupTransition = forwardRef<HTMLDivElement, FadeProps>((props, ref) => (
  <Zoom ref={ref} timeout={200} {...props} />
));

PopupTransition.displayName = 'PopupTransition';

transitions.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf([
    'top-left',
    'top-right',
    'top',
    'bottom-left',
    'bottom-right',
    'bottom',
  ]),
  type: PropTypes.oneOf(['grow', 'collapse', 'fade', 'slide', 'zoom']),
  direction: PropTypes.oneOf(['up', 'right', 'left', 'down']),
  timeout: PropTypes.number,
};
