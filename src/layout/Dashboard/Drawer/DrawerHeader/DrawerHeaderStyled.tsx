import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

interface DrawerHeaderStyledProps {
  open: boolean;
}

const DrawerHeaderStyled = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open',
})<DrawerHeaderStyledProps>(({ theme, open }) => ({
  ...theme.mixins.toolbar,
  display: 'flex',
  alignItems: 'center',
  justifyContent: open ? 'flex-start' : 'center',
  paddingLeft: open ? theme.spacing(3) : theme.spacing(0),
}));

export default DrawerHeaderStyled;
