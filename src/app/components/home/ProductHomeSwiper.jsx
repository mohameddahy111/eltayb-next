"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../../css/homeSwiper.css";

import { Pagination, Autoplay } from "swiper/modules";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Link,
  List,
  ListItem,
  ListItemText,
  Rating,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { ShoppingCart } from "@mui/icons-material";
import { Store } from "@/app/context/DataStore";
import AddToCard from "../shop/AddToCard";

export default function ProductHomeSwiper({ list, text }) {
  const { mobilDiv } = Store();
  return (
    <Box>
      <Box py={3}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDirection={mobilDiv ? "column" : "row"}
        >
          <Typography
            py={3}
            component={"h2"}
            variant="h3"
            color={"#f0c000"}
            fontWeight={700}
            textTransform={"capitalize"}
          >
            {text}
          </Typography>
          <Button fullWidth={mobilDiv && true} variant="contained">
            more
          </Button>
        </Box>
      </Box>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        // slidesPerView={}
        spaceBetween={10}
        breakpoints={{
          400: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          600: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1000: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {list.map((x, index) => (
          <SwiperSlide key={index}>
            <Card sx={{ width: "100%" }}>
              <CardMedia
                component={"img"}
                src={x.img.scr}
                alt={x.title}
                height={400}
              />
              <CardContent>
                <List>
                  <ListItemText>
                    <Typography
                      component={"h6"}
                      variant="body1"
                      color={"#f0c000"}
                      fontWeight={600}
                      textTransform={"capitalize"}
                    >
                      {x.title}
                    </Typography>
                  </ListItemText>
                  <ListItem>
                    <Typography>Rating :</Typography>
                    <Rating value={x.rating} precision={0.5} readOnly />
                  </ListItem>
                  <ListItem>
                    <AddToCard data={x}/>
                  </ListItem>
                  <ListItem sx={{textAlign :'end'}}>
                    <NextLink href={`${x.more}`} passHref style={{width:'100%'}} >
                      <Typography color={'#208080'} align='right' className="hvr-float-shadow" >
                      More...
                      </Typography>
                    </NextLink>

                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
