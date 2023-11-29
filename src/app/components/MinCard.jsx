"use client";

import { Favorite, Sell } from "@mui/icons-material";
import '../css/minCard.css'
import {
  Box,
  Card,
  IconButton,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  List,
  ListItem,
  Tooltip,
  Typography,
  ListItemText
} from "@mui/material";
import React, { useState } from "react";
import AddToCard from "./shop/AddToCard";
import { Store } from "../context/DataStore";
import { useSnackbar } from "notistack";
import axios from "axios";
import { StoreFun } from "../context/FunStore";

export default function MinCard({x}) {
    const [wish, setWish] = useState(false);
    const { basicUrl, userToken } = Store()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const {wishList , getWishList}=StoreFun()


  const addWishList = async () => {
    if (!userToken) {
      enqueueSnackbar("Must Log in First to add to Wish list", {
        variant: "warning"
      });
      return;
    }

    await axios
      .post(
        `${basicUrl}/wishlist/`,
        {productId: x._id},
        {headers: {Authorization: `Bearer ${userToken}`}}
      )
      .then((res) => {
        setWish(!wish);
        enqueueSnackbar(`${res.data.message}`, {variant: "success"});
      })
      .catch((err) => {
        enqueueSnackbar(`${err.response.data}`, {variant: "error"});
      })
      .finally(() => {
        getWishList();
      });
  };
  const findWishList = wishList?.find((ele) => ele.productId?._id === x?._id);

  return (
    <Grid item md={3} xs={12} sm={6} position={'relative'}>
      <Card className="min_card">
        <CardMedia
          component={"img"}
          alt={x.title}
          src={x.img.scr}
          height={400}
        />
        {x.offer && (
          <Chip
            label={"Offer"}
            sx={{
              p: "10px",
              position: "absolute",
              right: "10px",
              transform: "translateY( -50%)",
              bgcolor: "#208080",
              color: "#f0c000",
              fontWeight: 700
            }}
            icon={<Sell color="primary" />}
          />
        )}
        <List>
          <ListItem>
            <Typography color={"#f0c000"} variant="body1" fontWeight={700}>
              {x.title}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="caption">{x.sub_title}</Typography>
          </ListItem>
          <ListItem></ListItem>
        </List>
        <Card className="move_card" data-offer="Offers">
          <CardContent
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%"
            }}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              position={"absolute"}
              top={10}
              right={10}
              zIndex={2}
            >
              <Tooltip title="Favorite">
                <IconButton onClick={()=>{addWishList()}}>
                  <Favorite sx={{color :findWishList?"red" :null}} />
                </IconButton>
              </Tooltip>
              {/* <AddToCard  data={x} /> */}
            </Box>
            <Box>
              <List>
                <ListItemText>
                  <Typography>{x.descrption}</Typography>
                </ListItemText>
              </List>
            </Box>
            <AddToCard color={"#203030"} data={x} />
          </CardContent>
        </Card>
      </Card>
    </Grid>
  );
}
