import { Store } from "@/app/context/DataStore";
import { dashboardMenu } from "@/app/utils/data";
import { Badge, Box, IconButton, List, ListItem, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import DashDrawer from "./DashDrawer";
import { useMediaQuery } from "@mui/material";
import { StoreFun } from "@/app/context/FunStore";


export default function DashMenu() {
  const router = useRouter();
  const { logout } = Store();
  const {allOrders}=StoreFun()
  const mobilDiv = useMediaQuery('(max-width:800px)')
  return (
    <Box>
      {!mobilDiv ? (
        <List className="center" dense >
          {dashboardMenu.map((ele, index) => (
            <React.Fragment key={index}>
              <Tooltip title={ele.title}>
                <ListItem>
                  {ele.title === "orders" ? (
                    <Badge
                      badgeContent={allOrders?.unaccepted?.length}
                      color="error"
                      overlap="circular"
                      anchorOrigin={{ horizontal: "left", vertical: "top" }}
                    >
                      <IconButton onClick={()=>router.push(`${ele.path}`)}  size='small'>{ele.icon}</IconButton>
                    </Badge>
                  ) : (
                    <IconButton size="small"
                      onClick={() => {
                       ele.path? router.push(`${ele.path}`) :logout();
                      }}
                    >
                      {ele.icon}
                    </IconButton>
                  )}
                </ListItem>
              </Tooltip>
            </React.Fragment>
          ))}
        </List>
      ) : (
        <DashDrawer />
      )}
    </Box>
  );
}
