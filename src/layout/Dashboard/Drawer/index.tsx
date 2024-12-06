import { useMemo } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import DrawerHeader from "./DrawerHeader";
import DrawerContent from "./DrawerContent";
import MiniDrawerStyled from "./MiniDrawerStyled";
import { drawerWidth } from "@/config";
import { handlerDrawerOpen, useGetMenuMaster } from "@/api/menu";

interface MainDrawerProps {
  window?: () => Window;
}

export default function MainDrawer({ window }: MainDrawerProps) {
  const { menuMaster } = useGetMenuMaster();
  const theme = useTheme();

  const downXL = useMediaQuery(theme.breakpoints.down("xl"));
  const betweenLGAndXL = useMediaQuery(
    `(min-width:${theme.breakpoints.values.lg}px) and (max-width:${theme.breakpoints.values.xl - 1}px)`
  );

  const isPermanentDrawer = !downXL || betweenLGAndXL;
  const drawerOpen = isPermanentDrawer || !!menuMaster?.isDashboardDrawerOpened;

  const container = window ? window().document.body : undefined;

  const handleItemClick = () => {
    handlerDrawerOpen(false);
  };
  const drawerContent = useMemo(
    () => <DrawerContent onItemClick={handleItemClick} />,
    []
  );
  const drawerHeader = useMemo(
    () => <DrawerHeader open={drawerOpen} />,
    [drawerOpen]
  );

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, zIndex: 1200 }}
      aria-label="navigation menu"
    >
      {isPermanentDrawer ? (
        <MiniDrawerStyled variant="permanent" open={drawerOpen}>
          {drawerHeader}
          {drawerContent}
        </MiniDrawerStyled>
      ) : (
        <Drawer
          container={container}
          variant="temporary"
          open={drawerOpen}
          onClose={() => handlerDrawerOpen(!drawerOpen)}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "1px solid",
              borderRightColor: "divider",
              backgroundImage: "none",
              transform: drawerOpen ? "translateX(0)" : "translateX(-260px)",
            },
          }}
        >
          {drawerHeader}
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
}
