"use client";

import { Edit } from "@mui/icons-material";
import {
  Button,
  Pagination,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckeStatue from "./CheckeStatue";
import { useRouter } from "next/navigation";

export default function CreateTable({ data }) {
  const router = useRouter();
  const tableHeader = [
    { title: "Name" },
    { title: "Status" },
    { title: "time & date" },
    { title: "Stock" },
    { title: "Quantity" },
    { title: "Edit" },
  ];
  return (
    <>
      <TableContainer sx={{ py: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeader.map((ele, index) => (
                <TableCell align="center" key={index}>
                  <Typography fontWeight={700} variant="h6">
                    {ele.title}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data?.map((ele, index) => (
              <TableRow key={index}>
                <TableCell align="center">
                  <Typography fontWeight={600} variant="h6">
                    {ele.title}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <CheckeStatue val={ele.statue} id={ele._id} />
                </TableCell>
                <TableCell align="center">
                  {new Date(ele.createdAt).toLocaleString()}{" "}
                </TableCell>
                <TableCell align="center">
                  <Typography>{ele.stock}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography>{ele.quantity}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => {
                      router.push(`/dashboard/products/${ele.slug}`);
                    }}
                    variant="contained"
                    startIcon={<Edit />}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
