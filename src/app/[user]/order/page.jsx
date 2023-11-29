"use client";
import DetailsOrderDetails from "@/app/components/DetailsOrderDetails";
import Pages from "@/app/components/Pages";
import {Store} from "@/app/context/DataStore";
import {StoreFun} from "@/app/context/FunStore";
import Loading from "@/app/loading";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import {useRouter} from "next/navigation";
import React, {useEffect, } from "react";

export default function page() {
  const {orders, getOrders} = StoreFun();
  const {userToken, userInfo} = Store();
  const router = useRouter();
  useEffect(() => {
    getOrders();
    if (!userToken) {
      router.push("/");
    }
  }, [userToken]);
  return (
    <Box>
      {!orders ? (
        <Loading />
      ) : (
        <Container>
          <Typography
            align="center"
            p={4}
            variant="4"
            component={"h2"}
            textTransform={"capitalize"}
            color={"#f0c000"}
          >
            {userInfo?.name} Oredrs
          </Typography>
          {orders?.orders?.length === 0 ? (
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
                sorry , you don't have any orders
              </Typography>
            </Box>
          ) : (
            <TableContainer sx={{py: "20px"}}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{fontWeight: 700, fontSize: "20px"}}>
                      Order No:
                    </TableCell>
                    <TableCell sx={{fontWeight: 700, fontSize: "20px"}}>
                      Time & Date
                    </TableCell>
                    <TableCell sx={{fontWeight: 700, fontSize: "20px"}}>
                      Total
                    </TableCell>
                    <TableCell sx={{fontWeight: 700, fontSize: "20px"}}>
                      Details
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders?.orders?.map((ele, index) => (
                    <TableRow key={index}>
                      <TableCell>{ele._id} </TableCell>
                      <TableCell>
                        {new Date(ele.createdAt).toLocaleString()}{" "}
                      </TableCell>
                      <TableCell> {ele.totlaPrice} &nbsp; LE </TableCell>
                      <TableCell>
                        <DetailsOrderDetails data={ele} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Box py={1}>
                <Pages data={orders.page} fundo={getOrders} />
              </Box>
            </TableContainer>
          )}
        </Container>
      )}
    </Box>
  );
}
