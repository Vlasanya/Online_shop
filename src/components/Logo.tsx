import React from "react";
import { Box } from "@mui/material";
import { useAppState } from "@/store";
import Image from "next/image";
import { useRouter } from "next/router";
import logoDark from "../assets/logos/logo-dark.png";
import logoLight from "../assets/logos/logo-light.png";

const Logo = () => {
  const { theme } = useAppState();
  const router = useRouter();
  const logoSrc = theme === "dark" ? logoDark : logoLight;

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      onClick={handleLogoClick}
    >
      <Image
        src={logoSrc}
        alt="Logo"
        width={100}
        height={100}
        priority
      />
    </Box>
  );
};

export default Logo;
