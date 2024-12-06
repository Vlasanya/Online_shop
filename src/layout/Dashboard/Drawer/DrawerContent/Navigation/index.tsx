import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import NavGroup from "./NavGroup";
import { menuItems, MenuItem } from "@/menu-items";
import { useAppState } from "@/store";

export default function Navigation() {
  const { isAuthenticated } = useAppState();

  const filteredMenuItems = menuItems.items
    .map((item: MenuItem) => {
      if (item.children) {
        const filteredChildren = item.children.filter((child) => {
          if (child.requireAuth === true && !isAuthenticated) return false;
          if (child.requireAuth === false && isAuthenticated) return false;
          return true;
        });

        if (filteredChildren.length === 0) {
          return null;
        }

        return {
          ...item,
          children: filteredChildren,
        };
      }

      if (item.requireAuth === true && !isAuthenticated) return null;
      if (item.requireAuth === false && isAuthenticated) return null;

      return item;
    })
    .filter((item): item is MenuItem => item !== null);

  const navGroups = filteredMenuItems.map((item: MenuItem) => {
    if (item.type === "group") {
      return <NavGroup key={item.id} item={item} />;
    }
    return (
      <Typography key={item.id} variant="h6" color="error" align="center">
        Fix - Navigation Group
      </Typography>
    );
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
}
