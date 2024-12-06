import React from "react";
import DrawerHeaderStyled from "./DrawerHeaderStyled";
import Logo from "@/components/Logo";

// ==============================|| DRAWER HEADER ||============================== //

interface DrawerHeaderProps {
  open: boolean;
}

export default function DrawerHeader({ open }: DrawerHeaderProps) {
  return (
    <DrawerHeaderStyled open={open}>
      <Logo />
    </DrawerHeaderStyled>
  );
}
