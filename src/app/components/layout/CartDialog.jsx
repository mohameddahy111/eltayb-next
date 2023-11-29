"use client";
import {Store} from "@/app/context/DataStore";
import {StoreFun} from "@/app/context/FunStore";
import {Close, Delete, Remove, ShoppingCart} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";
import {
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  ListItemButton
} from "@mui/material";
import axios from "axios";
import {useSnackbar} from "notistack";
import React, {useEffect, useState} from "react";
import ChekoutDailog from "../shop/ChekoutDailog";

export default function CartDialog() {
  const {cartItems, getCart, cart, removeItem, correctCartItems} = StoreFun();
  const [open, setOpen] = useState(false);
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const {userToken, basicUrl, userInfo} = Store();

  const handelClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    // getCart();
    // correctCartItems();
  }, []);
  return (
    <React.Fragment>
      {userInfo ? (
        <Box position={"fixed"} top={"50%"} right={"20px"} zIndex={999}>
          {cartItems.length > 0 && (
            <Badge
              badgeContent={cartItems.length}
              overlap="circular"
              color="secondary"
              anchorOrigin={{horizontal: "left", vertical: "top"}}
            >
              <IconButton onClick={() => setOpen(!open)} color="primary">
                <ShoppingCart sx={{fontSize: "2rem"}} />
              </IconButton>
            </Badge>
          )}
          <Drawer
            open={open}
            anchor="right"
            variant="temporary"
            onClose={handelClose}
          >
            <Box width={"80vw"} maxWidth={"400px"} className="cart_drawer">
              <Box
                p={3}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                width={"100%"}
              >
                <Typography
                  color={"#f0c000"}
                  variant="h5"
                  textTransform={"capitalize"}
                  fontWeight={700}
                >
                  Cart Items
                </Typography>
                <IconButton onClick={handelClose}>
                  <Close />
                </IconButton>
              </Box>
              <Divider />
              <Box>
                <Grid container spacing={1}>
                  <Grid item md={12}>
                    <List>
                      <ListItem>
                        <Grid item xs={12}>
                          Items
                        </Grid>
                        <Grid item xs={12}>
                          ({cartItems.length}) items
                        </Grid>
                      </ListItem>
                      <ListItem>
                        <Grid item xs={12}>
                          Total
                        </Grid>
                        <Grid item xs={12}>
                          {cart.TAD} LE
                        </Grid>
                      </ListItem>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Name</TableCell>
                              <TableCell>Size</TableCell>
                              <TableCell>Price</TableCell>
                              <TableCell>Quaintity</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {cartItems?.map((ele, index) => (
                              <TableRow className="table_row" key={index}>
                                <TableCell>
                                  {" "}
                                  <Typography fontWeight={700}>
                                    {ele.productId?.title}
                                  </Typography>
                                </TableCell>
                                <TableCell> {ele.size} </TableCell>
                                {ele.price !== ele.final_price ? (
                                  <TableCell>
                                    <Typography>
                                      <span className="discont">
                                        {" "}
                                        {ele.price}
                                      </span>
                                      {ele.final_price}
                                      {""} LE
                                    </Typography>
                                  </TableCell>
                                ) : (
                                  <TableCell>{ele.price} LE </TableCell>
                                )}
                                <TableCell align="center">
                                  {" "}
                                  {ele.quantity}
                                </TableCell>
                                <TableCell
                                  sx={{
                                    position: "absolute",
                                    right: "30px",
                                    border: "none"
                                  }}
                                >
                                  <LoadingButton
                                    className="table-icon"
                                    onClick={() => removeItem(ele._id)}
                                  >
                                    <Delete color="error" />
                                  </LoadingButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <ListItemButton >
                        <ChekoutDailog fundo={handelClose} />

                      </ListItemButton>
                    </List>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Drawer>
        </Box>
      ) : (
        <Box />
      )}
    </React.Fragment>
  );
}
