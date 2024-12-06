import React from "react";
import { useAppState, useAppDispatch } from "../store";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const ThemeToggle = () => {
  const { theme } = useAppState();
  const dispatch = useAppDispatch();

  return (
    <IconButton
      color="primary"
      onClick={() => dispatch({ type: "TOGGLE_THEME" })}
      aria-label="Toggle Theme"
    >
      {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
};

export default ThemeToggle;
