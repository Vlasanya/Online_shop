import React, { useEffect } from "react";
import { useAppState, useAppDispatch } from "../../store";
import { IconButton, Tooltip } from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import GridViewIcon from "@mui/icons-material/GridView";

const DisplayModeToggle = () => {
  const { displayMode, theme } = useAppState();
  const dispatch = useAppDispatch();

  const handleModeChange = (mode: "list" | "mediumTile" | "largeTile") => {
    dispatch({ type: "SET_DISPLAY_MODE", payload: mode });
  };

  useEffect(() => {
    document.body.style.setProperty(
      "--background",
      theme === "dark" ? "#0a0a0a" : "#ffffff"
    );
    document.body.style.setProperty(
      "--foreground",
      theme === "dark" ? "#ededed" : "#171717"
    );
  }, [theme]);

  return (
    <div>
      <div style={{ display: "flex", gap: "8px" }}>
        <Tooltip title="List View" arrow>
          <IconButton
            color={displayMode === "list" ? "primary" : "default"}
            onClick={() => handleModeChange("list")}
          >
            <ViewListIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Medium Tile View" arrow>
          <IconButton
            color={displayMode === "mediumTile" ? "primary" : "default"}
            onClick={() => handleModeChange("mediumTile")}
          >
            <ViewModuleIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Large Tile View" arrow>
          <IconButton
            color={displayMode === "largeTile" ? "primary" : "default"}
            onClick={() => handleModeChange("largeTile")}
          >
            <GridViewIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default DisplayModeToggle;
