import PropTypes from "prop-types";

import { styled } from "@mui/material/styles";
import AppBar, { AppBarProps }  from "@mui/material/AppBar";

import { drawerWidth } from "@/config";

interface AppBarStyledProps extends AppBarProps {
  open?: boolean;
}

// ==============================|| HEADER - APP BAR STYLED ||============================== //

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarStyledProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  left: 0,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(!open && {
    width: `calc(100%)`,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

AppBarStyled.propTypes = {
  open: PropTypes.bool,
};

export default AppBarStyled;
