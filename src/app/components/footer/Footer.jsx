import {
  Box,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { Suspense } from "react";
import logo from "../../../../public/img/logo1.png";
import NextLink from "next/link";
import {
  Copyright,
  Facebook,
  Instagram,
  PhoneForwarded,
  WhatsApp,
} from "@mui/icons-material";
import Loading from "@/app/loading";

export default function Footer({ mode }) {
  const linksList = [
    { title: "Home", path: "/" },
    { title: "Shop", path: "/shop" },
    { title: "Offers", path: "/offers" },
    { title: "About us", path: "/about" },
    { title: " privacy policy", path: "/privacy_policy" },
  ];
  const mediaList = [
    {
      media: "facebook",
      path: "/",
      icon: <Facebook sx={{ color: mode ? "#208080" : "#f0c000" }} />,
    },
    {
      media: "WhatsApp",
      path: "/",
      icon: <WhatsApp sx={{ color: mode ? "#208080" : "#f0c000" }} />,
    },
    {
      media: "Tel : 01092516161",
      path: "/",
      icon: <PhoneForwarded sx={{ color: mode ? "#208080" : "#f0c000" }} />,
    },
    {
      media: "Instagram",
      path: "/",
      icon: <Instagram sx={{ color: mode ? "#208080" : "#f0c000" }} />,
    },
  ];
  return (

    <Box width={"100%"} bgcolor={!mode && "#203040"} color={"#fff"}>
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Box>
            <Image
              quality={100}
              src={logo}
              width={200}
              height={200}
              alt="shjs"
            />
          </Box>
        </Grid>
        <Grid item md={2} xs={6}>
          <List>
            {linksList.map((x, index) => (
              <ListItem key={index}>
                <NextLink href={`${x.path}`} passHref>
                  <Link
                    component={"button"}
                    underline="hover"
                    sx={{ textTransform: "capitalize" }}
                    color={mode ? "#208080" : "#f0c000"}
                  >
                    {x.title}
                  </Link>
                </NextLink>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item md={3} xs={6}>
          <List>
            {mediaList.map((x, index) => (
              <ListItem key={index}>
                <ListItemIcon>{x.icon}</ListItemIcon>
                <ListItemText>
                  <NextLink href={`${x.path}`} passHref>
                    <Link
                      component={"button"}
                      underline="hover"
                      sx={{ textTransform: "capitalize" }}
                      color={mode ? "#208080" : "#f0c000"}
                    >
                      {x.media}
                    </Link>
                  </NextLink>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item md={4} xs={12}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3410.833761884479!2d29.979744824772403!3d31.253024974337496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5daca60f13b3b%3A0x6fab856e90a8ea8a!2zNSDYtNin2LHYuSDYrtin2YTYryDYqNmGINin2YTZiNmE2YrYr9iMINin2YTYs9mK2YjZgSDYqNit2LHZitiMINmC2LPZhSDYo9mI2YQg2KfZhNmF2YbYqtiy2KnYjCDZhdit2KfZgdi42Kkg2KfZhNil2LPZg9mG2K_YsdmK2KkgNTUxNzA0NA!5e0!3m2!1sar!2seg!4v1699990461288!5m2!1sar!2seg"
            width="100%"
            height="230"
            className="map"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Grid>
      </Grid>
      <Typography
        align="center"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        p={2}
        color={"#09c"}
        maxWidth={'100%'}
      >
        Copy Rigth by mohamed_dahy, 2023
        <Copyright />
      </Typography>
    </Box>

  );
}
