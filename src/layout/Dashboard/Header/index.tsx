import { useMemo } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

// project import
import AppBarStyled from "./AppBarStyled";
import HeaderContent from "./HeaderContent";

import { handlerDrawerOpen, useGetMenuMaster } from "@/api/menu";

// assets
import MenuFoldOutlined from "@ant-design/icons/MenuFoldOutlined";
import MenuUnfoldOutlined from "@ant-design/icons/MenuUnfoldOutlined";

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

export default function Header() {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down("lg"));

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = !downLG || menuMaster?.isDashboardDrawerOpened;

  const headerContent = useMemo(() => <HeaderContent />, []);

  const iconBackColor = "grey.100";
  const iconBackColorOpen = "grey.200";

 
  const mainHeader = (
    <Toolbar sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
       {downLG && (
        <IconButton
          disableRipple
          aria-label="open drawer"
          onClick={() => {
            handlerDrawerOpen(!drawerOpen);
          }}
          edge="start"
          color="secondary"
          sx={{
            color: "text.primary",
            bgcolor: drawerOpen ? iconBackColorOpen : iconBackColor,
            ml: { xs: 0, lg: -2 },
          }}
        >
          {!drawerOpen ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </IconButton>
      )}
      {headerContent}
    </Toolbar>
  );

  return (
    <>
      {!downLG ? (
        <AppBarStyled
          open={!!drawerOpen}
          position="fixed"
          color="inherit"
          elevation={0}
          sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
        >
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar
          position="fixed"
          color="transparent"
          elevation={0}
          sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
        >
          {mainHeader}
        </AppBar>
      )}
    </>
  );
}
