"use client";
import {
  Container,
  Grid,
} from "@mui/material";
import React, { Suspense, useEffect } from "react";
import "../css/minCard.css";
import Loading from "../loading";
import { StoreFun } from "../context/FunStore";
import Pages from "../components/Pages";
import MinCard from "../components/MinCard";

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
            <MinCard key={index} x={x} />
            ))}
        </Grid>
        <Pages data={products.page} fundo={getProducts} />
        </Container>
    </Suspense>
  );
}
