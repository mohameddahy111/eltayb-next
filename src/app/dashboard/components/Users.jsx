"use client";

import { Store } from "@/app/context/DataStore";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import { Block } from "@mui/icons-material";
import Loading from "@/app/loading";
import { useSnackbar } from "notistack";

export default function Users() {
  const router = useRouter();
  const [users, setUser] = useState([]);
  const { basicUrl, userToken } = Store();
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const getUsers = async () => {
    await axios
      .get(`${basicUrl}/users`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        setLoading(false);
        setUser(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    getUsers();
  }, []);
  const tableHeader = [
    { title: "Name" },
    { title: "Email" },
    { title: "time & date" },
    { title: "Blocked" },
    { title: " Phone Number" },
    { title: "Active" },
    { title: "Ditels" },
  ];
  const setBlock = async (val, id) => {
    await axios
      .patch(
        `${basicUrl}/users/setting`,
        { id: id, _isBlocked: !val },
        { headers: { Authorization: `Bearer ${userToken}` } }
      )
      .then((res) => {
        if (res.status === 200) {
          getUsers();
          enqueueSnackbar(`${res.data.message}`, { variant: "success" });
        }
      })
      .catch((err) => {
        enqueueSnackbar(`${err.response.message}`, { variant: "error" });
      });
  };
  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Box p={3}>
            <TextField />
          </Box>
          <Box py={3}>
            <TableContainer>
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
                  {users?.map((x, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {" "}
                        <Typography
                          textTransform={"capitalize"}
                          fontWeight={600}
                          variant="h6"
                        >
                          {" "}
                          {x.name}
                        </Typography>{" "}
                      </TableCell>
                      <TableCell>
                        <Link href={`/dashboard/all_user/`}>
                          <Typography fontWeight={600} color={"#f0c000"}>
                            {x.email}
                          </Typography>
                        </Link>
                      </TableCell>
                      <TableCell>
                        {new Date(x.createdAt).toLocaleString()}{" "}
                      </TableCell>
                      <TableCell align="center">
                        <LoadingButton
                          onClick={() => setBlock(x._isBlocked, x._id)}
                          startIcon={<Block />}
                          variant="contained"
                          color={x._isBlocked ? "secondary" : "error"}
                        >
                          {!x._isBlocked ? "Blocked" : "Unblocked"}
                        </LoadingButton>
                      </TableCell>
                      <TableCell align="center">
                        <Typography>{x.phone} </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          fontWeight={600}
                          color={!x._isActive ? "red" : "green"}
                        >
                          {x._isActive ? "Active" : "Disabled"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            router.push(`/dashboard/users/${x._id}`);
                          }}
                          variant="contained"
                        >
                          ditels
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </>
      )}
    </Container>
  );
}
