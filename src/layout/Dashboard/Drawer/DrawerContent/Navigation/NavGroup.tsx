import React from "react";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import NavItem from "./NavItem";
import { MenuItem } from "@/menu-items";

interface NavGroupProps {
  item: MenuItem;
}

export default function NavGroup({ item }: NavGroupProps) {
  const navCollapse = item.children?.map((menuItem: MenuItem) => {
    if (menuItem.type === "item") {
      return <NavItem key={menuItem.id} item={menuItem} level={1} />;
    }

    return (
      <Typography key={menuItem.id} variant="h6" color="error" align="center">
        Unsupported menu type: {menuItem.type}
      </Typography>
    );
  });

  return (
    <List
      subheader={
        item.title && (
          <Box sx={{ pl: 3, mb: 1.5 }}>
            <Typography variant="subtitle2" color="textSecondary">
              {item.title}
            </Typography>
          </Box>
        )
      }
      sx={{ mb: 1.5, py: 0 }}
    >
      {navCollapse}
    </List>
  );
}
