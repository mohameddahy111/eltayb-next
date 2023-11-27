import { Store } from "@/app/context/DataStore";
import { list } from "@/app/utils/data";
import {
  Close,
  Dashboard,
  Favorite,
  Inventory2,
  Logout,
  Menu,
  Person,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function MobilDrawer() {
  const { userInfo, setOpenLoginDailog, logout  , } = Store();
  const [oppenDrawer, setOppenDrawer] = useState(false);
  const router = useRouter();
  const closeHandler = () => {
    setOppenDrawer(false);
  };
  const goPath = (path) => {
    router.push(path);
    closeHandler();
  };
  const userList = [
    { title: "Profile", path: `/${userInfo.name}/profile`, icon: <Person /> },
    { title: "My Wish List ", path: `/${userInfo.name}/wishList`, icon: <Favorite /> },
    { title: "My orders", path: `/${userInfo.name}/order`, icon: <Inventory2 /> },
    {
      title: "Log out",
      icon: <Logout />,
      do: () => logout(),
    },
  ];
  const allList = userInfo ? list.concat(userList) : list;
  return (
    <React.Fragment>
      <IconButton onClick={() => setOppenDrawer(true)}>
        <Menu sx={{ color: "#fff" }} />
      </IconButton>

      <Drawer
        open={oppenDrawer}
        anchor="left"
        onClose={closeHandler}
        variant="temporary"
      >
        <Box width={"250px"}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            p={"10px"}
          >
            <Typography
              px={"10px"}
              color={"#f0c000"}
              textTransform={"capitalize"}
              fontWeight={700}
            >
              El@tayb
            </Typography>
            <IconButton onClick={closeHandler}>
              <Close />
            </IconButton>
          </Box>
          <Divider />
          <List>
            {allList.map((x, index) => (
              <React.Fragment key={index}>
                {userInfo && x.title === "Login" ? null : userInfo &&
                  x.title === "Profile" ? (
                  <>
                    {userInfo._isAdmin === "admin" ? (
                      <ListItemButton
                        onClick={
                          x.path
                            ? () => goPath(`/dashboard`)
                            : x.do
                            ? x.do
                            : () => setOpenLoginDailog(true, closeHandler())
                        }
                      >
                        <ListItemIcon>
                          {" "}
                          <Dashboard />{" "}
                        </ListItemIcon>
                        Dashboard
                      </ListItemButton>
                    ) : (
                      <ListItemButton
                        onClick={
                          x.path
                            ? () => goPath(x.path)
                            : x.do
                            ? x.do
                            : () => setOpenLoginDailog(true, closeHandler())
                        }
                      >
                        <ListItemIcon>{x.icon} </ListItemIcon>
                        {x.title}
                      </ListItemButton>
                    )}{" "}
                  </>
                ) : (
                  <ListItemButton
                    onClick={
                      x.path
                        ? () => goPath(x.path)
                        : x.do
                        ? x.do
                        : () => setOpenLoginDailog(true, closeHandler())
                    }
                  >
                    <ListItemIcon>{x.icon} </ListItemIcon>
                    {x.title}
                  </ListItemButton>
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}
