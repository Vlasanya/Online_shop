import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';

import { alpha, styled, SxProps, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import SimpleBar from 'simplebar-react';
import { BrowserView, MobileView } from 'react-device-detect';

const RootStyle = styled(BrowserView)({
  flexGrow: 1,
  height: '100%',
  overflow: 'hidden'
});

const SimpleBarStyle = styled(SimpleBar)(({ theme }) => ({
  maxHeight: '100%',
  '& .simplebar-scrollbar': {
    '&:before': {
      background: alpha(theme.palette.grey[500], 0.48)
    },
    '&.simplebar-visible:before': {
      opacity: 1
    }
  },
  '& .simplebar-track.simplebar-vertical': {
    width: 10
  },
  '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
    height: 6
  },
  '& .simplebar-mask': {
    zIndex: 'inherit'
  }
}));

interface SimpleBarScrollProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
  [key: string]: unknown;
}
// ==============================|| SIMPLE SCROLL BAR ||============================== //

export default function SimpleBarScroll({
  children,
  sx,
  ...other
}: SimpleBarScrollProps) {
  return (
    <>
      <RootStyle>
        <SimpleBarStyle clickOnTrack={false} sx={sx} {...other}>
          {children}
        </SimpleBarStyle>
      </RootStyle>
      <MobileView>
        <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
          {children}
        </Box>
      </MobileView>
    </>
  );
}

SimpleBarScroll.propTypes = { children: PropTypes.any, sx: PropTypes.any, other: PropTypes.any };
