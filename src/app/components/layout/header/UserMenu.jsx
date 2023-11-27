"use client"

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import {Dashboard, Favorite, Inventory2} from "@mui/icons-material";
import {useRouter} from "next/navigation";
import {Store} from "@/app/context/DataStore";
import { StoreFun } from "@/app/context/FunStore";
import { Typography } from "@mui/material";

export default function UserMenu() {
  const { userInfo, logout } = Store();
  // const {userInfo}=StoreFun()
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment >
      {userInfo && (
        <React.Fragment>
      <Box  sx={{display: "flex", alignItems: "center", textAlign: "center"}}>
        <Tooltip title="">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ml: 2}}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Typography variant="h6" color={'#208080'}>
              {userInfo.name}
            </Typography>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{horizontal: "right", vertical: "top"}}
        anchorOrigin={{horizontal: "right", vertical: "bottom"}}
      >
        {userInfo._isAdmin === "admin" ? (
          <MenuItem onClick={() => router.push(`/dashboard`)}>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            Dash board
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() =>
              handleClose(router.push(`/${userInfo.name}/profile/`))
            }
          >
            <ListItemIcon>
              <Avatar />
            </ListItemIcon>
            Profile
          </MenuItem>
        )}
        <MenuItem
          onClick={() =>
            handleClose(router.push(`/${userInfo.name}/wishList/`))
          }
        >
          <ListItemIcon>
            <Favorite />
          </ListItemIcon>
          My wish List
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => handleClose(router.push(`/${userInfo.name}/order/`))}
        >
          <ListItemIcon>
            <Inventory2 fontSize="small" />
          </ListItemIcon>
          My orders
        </MenuItem>
        <MenuItem
          onClick={() => {
            logout();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

        </React.Fragment>
      ) }
    </React.Fragment>
  );
}
