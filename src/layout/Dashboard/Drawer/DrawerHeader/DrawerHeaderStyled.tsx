// Material-UI
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

// Define props interface for the styled component
interface DrawerHeaderStyledProps {
  open: boolean;
}

// Styled component definition
const DrawerHeaderStyled = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open', // Prevent forwarding `open` to the DOM
})<DrawerHeaderStyledProps>(({ theme, open }) => ({
  ...theme.mixins.toolbar, // Use theme's default toolbar mixin
  display: 'flex',
  alignItems: 'center',
  justifyContent: open ? 'flex-start' : 'center',
  paddingLeft: open ? theme.spacing(3) : theme.spacing(0),
}));

export default DrawerHeaderStyled;
