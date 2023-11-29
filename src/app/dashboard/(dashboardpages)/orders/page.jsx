'use client'

import { StoreFun } from '@/app/context/FunStore'
import React, { useEffect } from 'react'
import {
    Box,
    Button,
    Container,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography,
  } from "@mui/material";
import Pages from '@/app/components/Pages';
import styles from "../../../css/table_order.module.css";
import Link from 'next/link';
import CheckOrdersDetails from '../../components/CheckOrdersDetails';

  

export default function page() {
    const { allOrders, getAllOrders } = StoreFun()
    useEffect(()=>{getAllOrders()},[])
  return (
    <Box>
      <Container sx={{ py: "20px" }}>
        <TextField
          label={"Search by Id"}
          inputProps={{ type: "text" }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography
                    textTransform={"capitalize"}
                    fontWeight={700}
                    variant="h6"
                  >
                    Order ID
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    textTransform={"capitalize"}
                    fontWeight={700}
                    variant="h6"
                  >
                    client name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    textTransform={"capitalize"}
                    fontWeight={700}
                    variant="h6"
                  >
                    time & date
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    textTransform={"capitalize"}
                    fontWeight={700}
                    variant="h6"
                  >
                    order status
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    textTransform={"capitalize"}
                    fontWeight={700}
                    variant="h6"
                  >
                    payment status
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    textTransform={"capitalize"}
                    fontWeight={700}
                    variant="h6"
                  >
                    amount payment
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    textTransform={"capitalize"}
                    fontWeight={700}
                    variant="h6"
                  >
                    ditels
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allOrders?.orders?.map((x, index) => (
                <TableRow
                  key={x._id}
                  className={!x._isAccept ? `${styles.row}` : ""}
                >
                  <TableCell>{x._id} </TableCell>
                  <TableCell>
                    <Link href={`/dashboard/users/${x.userId._id}`} passHref>
                      <Typography fontWeight={600} color={"#f0c000"}>
                        {x.userId.name}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell>
                    {new Date(x.createdAt).toLocaleString()}{" "}
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      className={
                        x.order_state === "prepar"
                          ? styles.prepar
                          : styles.ready
                      }
                    >
                      {x.order_state}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      className={
                        x.pay_state === false ? styles.notPay : styles.pay
                      }
                    >
                      {x.pay_state === false ? "not payment" : "payment"}{" "}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={600} color={"red"}>
                      {x.totlaPrice}&nbsp; LE
                    </Typography>
                  </TableCell>
                      <TableCell>
                          <CheckOrdersDetails data={ x} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
                  </Table>
                  <Pages fundo={getAllOrders} data={allOrders.page}/>
        </TableContainer>
      </Container>
    </Box>
  )
}
