import React, { useEffect } from "react";
import { useRouter } from "next/router";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { handlerActiveItem, useGetMenuMaster } from "@/api/menu";
import { MenuItem } from "@/menu-items";
import { useDrawer } from "@/store/index";

interface NavItemProps {
  item: MenuItem;
  level: number;
}

const NavItem: React.FC<NavItemProps> = ({ item, level }) => {
  const { closeDrawer } = useDrawer();
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened || false;
  const router = useRouter();

  const itemTarget = item.target || "_self";
  const isSelected = router.pathname === item.url;

  useEffect(() => {
    if (isSelected) handlerActiveItem(item.id);
  }, [isSelected, item.id]);

  const handleClick = () => {
    handlerActiveItem(item.id);
    if (item.url) {
      if (item.external) {
        window.open(item.url, itemTarget);
      } else {
        router.push(item.url);
      }
    }
    closeDrawer(); 
  };

  return (
    <ListItemButton
      onClick={handleClick}
      disabled={item.disabled}
      selected={isSelected}
      sx={{
        pl: drawerOpen ? `${level * 28}px` : 1.5,
        "&.Mui-selected": {
          color: "primary.main",
          bgcolor: drawerOpen ? "primary.lighter" : undefined,
        },
      }}
    >
      {item.icon && (
        <ListItemIcon>
          <item.icon />
        </ListItemIcon>
      )}
      <ListItemText
        primary={
          <Typography variant="h6">
            {item.title}
          </Typography>
        }
      />
    </ListItemButton>
  );
};

export default NavItem;
