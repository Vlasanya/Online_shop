import React, { useState } from "react";
import { useAppDispatch, useAppState } from "@/store";
import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ProfileTab from "./ProfileTab";

const Profile: React.FC = () => {
  const { isAuthenticated, users, token } = useAppState();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleNavigate = () => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    router.push("/");
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorEl && anchorEl.contains(event.target as Node)) {
      return;
    }
    setAnchorEl(null);
  };
  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const loggedInUser = Array.isArray(users)
    ? users.find((user) => user.username === token)
    : null;

  const userName = loggedInUser?.name?.firstname || "Guest";
  const open = Boolean(anchorEl);

  return (
    <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
      <ButtonBase
        onClick={handleAvatarClick}
        sx={{ p: 0.5, borderRadius: "50%" }}
      >
        <Avatar alt="User Avatar" />
      </ButtonBase>
      {isAuthenticated && (
        <Box
          sx={{ display: "flex", alignItems: "center", position: "relative" }}
        >
          <Typography sx={{ ml: 1, textTransform: "capitalize" }}>
            {userName}
          </Typography>
          <Popper
            open={open}
            anchorEl={anchorEl}
            placement="bottom-end"
            transition
            disablePortal
            sx={{
              position: "fixed",
              right: "0px !important",
              top: "65px !important",
              width: "200px",
            }}
          >
            <ClickAwayListener onClickAway={handleClose}>
              <Paper sx={{ p: 2, boxShadow: 3, minWidth: 100 }}>
                <ProfileTab handleLogout={handleLogout} />
              </Paper>
            </ClickAwayListener>
          </Popper>
        </Box>
      )}
      {isAuthenticated ? (
        <Button
          onClick={handleLogout}
          variant="outlined"
          color="secondary"
          size="small"
          sx={{ ml: 2 }}
        >
          Logout
        </Button>
      ) : (
        <Button
          onClick={handleNavigate}
          variant="outlined"
          color="secondary"
          size="small"
          sx={{ ml: 2 }}
        >
          LogIn
        </Button>
      )}
    </Box>
  );
};

export default Profile;
