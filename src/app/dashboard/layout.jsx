"use client";
import React, { useEffect } from "react";
import { Store } from "../context/DataStore";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import DashMenu from "./components/DashMenu";
import logo from "../../../public/img/logo1.png";
import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";


export default function layout({ children }) {
  const { userInfo ,  } = Store();
  const mobilDiv = useMediaQuery('(max-width:800px)')
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    closeSnackbar();
    if (!userInfo ||( userInfo && userInfo._isAdmin !=='admin')) {
      router.push("/");
      enqueueSnackbar("admins omly can enter her", { variant: "error" });
    }
  }, [userInfo]);

  return (
    <div>
      <Box>
        <AppBar position="static" sx={{bgcolor :'#203040'}}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Image src={logo} width={"80"} height={80} alt="logo" />
              <Box>
              <Link href={"/"} passHref>
                <Typography
                  variant={mobilDiv?"h6" :'h4'}
                  component={"h1"}
                  color={"#f0c000"}
                  textTransform={"capitalize"}
                  fontWeight={700}
                >
                  El@tayb ( Dashboard)
                </Typography>
              </Link>
              <Typography  textTransform={'capitalize'} color={'#09c'}>
                wellcome admin {userInfo?.name}
              </Typography>

              </Box>
            </Box>
            <Box>
              <DashMenu />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Box>{children}</Box>
    </div>
  );
}
