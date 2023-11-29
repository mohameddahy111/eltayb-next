"use client";

import "./globals.css";
import { DataStoreProvider, Store } from "./context/DataStore";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import MinList from "./components/layout/header/MinList";
import Link from "next/link";
import LoginDailog from "./components/login/LoginDailog";
import Footer from "./components/footer/Footer";
import logo from "../../public/img/logo1.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import CartDialog from "./components/layout/CartDialog";
import { SnackbarProvider } from "notistack";
import { FunStoreProvider} from "./context/FunStore";

export default function RootLayout({ children }) {
  const [mode, setMode] = useState(true);
  const [newMode, setNewMode] = useState("dark");
  const pathName = usePathname();
  const theme = createTheme({
    typography: {
      fontFamily: "Exo 2",
    },
    palette: {
      mode: newMode,
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });
  const changeMode = (mode) => {
    if (mode === true) {
      setNewMode("dark");
    } else {
      setNewMode("light");
    }
  };
  useEffect(() => {
    changeMode(mode);
  }, [mode]);

  return (
    <html lang="en">
      <head>
        <link href="/hover-min.css" rel="stylesheet" media="all" />
      </head>
      <body>
        <SnackbarProvider
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <DataStoreProvider>
            <FunStoreProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                {!pathName.includes("dashboard") && (
                  <header>
                    <AppBar
                      elevation={4}
                      position={pathName !== "/" ? "static" : "fixed"}
                      sx={{
                        bgcolor: pathName == "/" ? "#00000050" : "#203040",
                      }}
                    >
                      <Toolbar>
                        <Container
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
                            <Image
                              src={logo}
                              width={"80"}
                              height={80}
                              alt="logo"
                            />
                            <Link href={"/"} passHref>
                              <Typography
                                variant="h4"
                                component={"h1"}
                                color={"#f0c000"}
                                textTransform={"capitalize"}
                                fontWeight={700}
                              >
                                El@tayb
                              </Typography>
                            </Link>
                          </Box>
                          <Box display={"flex"} alignItems={"center"}>
                            <MinList mode={mode} setMode={setMode} />
                          </Box>
                        </Container>
                      </Toolbar>
                    </AppBar>
                  </header>
                )}
                <main>{children}</main>
                <footer>
                  <Footer mode={mode} />
                </footer>
                <LoginDailog />
                {!pathName.includes("dashboard") &&  <CartDialog/>}
              </ThemeProvider>
            </FunStoreProvider>
          </DataStoreProvider>
        </SnackbarProvider>
      </body>
    </html>
  );
}
