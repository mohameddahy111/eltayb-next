import { Store } from "@/app/context/DataStore";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import MobilDrawer from "../MobilDrawer";
import { list } from "@/app/utils/data";
import UserMenu from "./UserMenu";
import { useRouter } from "next/navigation";
import { LightMode, Nightlight } from "@mui/icons-material";

export default function MinList({ mode, setMode }) {
  const router = useRouter();
  const { mobilDiv, userInfo, setOpenLoginDailog } = Store();
  return (
    <Box>
      {mobilDiv ? (
        <MobilDrawer />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Tooltip title={mode? 'Ligth Mode':'Dark Mode'}>

          <Switch
            onChange={() => setMode(!mode)}
            icon={<Nightlight />}
            checkedIcon={<LightMode />}
            />
            </Tooltip>

          <List
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {list.map((x, index) => (
              <React.Fragment key={index}>
                {userInfo && x.title === "Login" ? (
                  <UserMenu />
                ) : (
                  <Tooltip title={x.title}>
                    <ListItemButton 
                      onClick={
                        !x.path
                          ? () => {
                              setOpenLoginDailog(true);
                            }
                          : () => router.push(`${x.path}`)
                      }
                      sx={{ color: "#ffffff" }}
                    >
                      <Typography className="hvr-float-shadow">

                      {x.title}
                      </Typography>
                    </ListItemButton>
                  </Tooltip>
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}
