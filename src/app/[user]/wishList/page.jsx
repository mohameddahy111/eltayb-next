"use client";

import MinCard from "@/app/components/MinCard";
import {Store} from "@/app/context/DataStore";
import {StoreFun} from "@/app/context/FunStore";
import Loading from "@/app/loading";
import {Box, Container, Grid, Typography} from "@mui/material";
import {useRouter} from "next/navigation";
import React, {useEffect} from "react";

export default function page() {
  const {wishList ,getWishList} = StoreFun();
  const {userInfo, userToken , } = Store();
  const router = useRouter();

  useEffect(() => {
    getWishList()
    if (!userToken) {
      router.push("/");
    }
  }, [userToken]);
  return (
    <Box py={3}>
      <Typography
        textTransform={"capitalize"}
        align="center"
        variant="h3"
        component={"h1"}
        color={"#f0c000"}
        fontWeight={700}
        py={3}
      >
        {userInfo?.name} Wish list
      </Typography>
      <Container>
        {wishList?.length === 0 ? (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"50vh"}
          >
            <Typography
              fontWeight={700}
              textTransform={"capitalize"}
              variant="h3"
              component={"h1"}
            >
              sorry , you don't have any Product in your list
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={1}>
            {!wishList ? (
              <Loading />
            ) : (
              wishList.map((ele, index) => (
                <MinCard x={ele.productId} key={index} />
              ))
            )}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
