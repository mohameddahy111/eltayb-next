import { Store } from "@/app/context/DataStore";
import { dashboardMenu } from "@/app/utils/data";
import { Close, Logout, Menu } from "@mui/icons-material";
import {
  Badge,
  Box,
  Button,
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

export default function DashDrawer() {
  const [open, setOpen] = useState(false);
  const {logout}=Store()
  const router = useRouter();
  const closeHandler = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <IconButton
        onClick={() => {
          setOpen(true);
        }}
      >
        <Menu sx={{ color: "#fff" }} />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={closeHandler}>
        <Box width={"70vw"} maxWidth={300} bgcolor={"#203040"} height={"100%"}>
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
              variant="h5"
            >
              El@tayb
            </Typography>
            <IconButton onClick={closeHandler}>
              <Close sx={{ color: "#fff" }} />
            </IconButton>
          </Box>
          <Divider sx={{ borderColor: "#f0c000" }} />
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            height={"85%"}
            pt={2}
          >
            <List>
              {dashboardMenu.map((ele, index) => (
                <React.Fragment key={index}>
                  <ListItemButton
                    onClick={() => {
                      ele.path
                        ? router.push(`${ele.path}`, closeHandler())
                        : console.log("jjj");
                    }}
                    sx={{ color: "#fff" }}
                  >
                    {ele.title === "orders" ? (
                      <Badge
                        badgeContent={1}
                        color="error"
                        overlap="circular"
                        anchorOrigin={{ horizontal: "left", vertical: "top" }}
                      >
                        <ListItemIcon>{ele.icon}</ListItemIcon>
                      </Badge>
                    ) : (
                      <ListItemIcon
                        onClick={() => {
                          router.push(`${ele.path}`);
                        }}
                      >
                        {ele.icon}
                      </ListItemIcon>
                    )}
                    {ele.title}
                  </ListItemButton>
                </React.Fragment>
              ))}
            </List>
            <Box className="center" sx={{ px: 2 }}>
              <Button onClick={logout} endIcon={<Logout />} fullWidth variant="contained">
                log out
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}
