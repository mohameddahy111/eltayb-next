"use client";
import {  Favorite, Sell } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Suspense, useEffect } from "react";
import "../css/minCard.css";
import AddToCard from "../components/shop/AddToCard";
import Loading from "../loading";
import { StoreFun } from "../context/FunStore";

export default function page() {
  const {getProducts , products}=StoreFun()
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Suspense fallback={<Loading/>}>
        <Container sx={{ py: "20px" }}>
          <Grid container spacing={1}>
            {products?.data?.map((x, index) => (
              <Grid item key={index} md={3} xs={12} sm={6}>
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
                        fontWeight: 700,
                      }}
                      icon={<Sell color="primary" />}
                    />
                  )}
                  <List>
                    <ListItem>
                      <Typography
                        color={"#f0c000"}
                        variant="body1"
                        fontWeight={700}
                      >
                        {x.title}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Typography variant='caption'>{x.sub_title}</Typography>
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
                        height: "100%",
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
                          <IconButton>
                            <Favorite />
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
            ))}
          </Grid>
        </Container>
    </Suspense>
  );
}
