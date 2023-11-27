"use client";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import {
  Box,
  DialogActions,
  Button,
  DialogContent,
  List,
  ListItem,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Card,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid
} from "@mui/material";
import React, {useState} from "react";
import * as yup from "yup";
import {useFormik} from "formik";
import {LoadingButton} from "@mui/lab";
import axios from "axios";
import {StoreFun} from "@/app/context/FunStore";
import {Store} from "@/app/context/DataStore";
import {useSnackbar} from "notistack";
import {useRouter} from "next/navigation";

function CustomTabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}
export default function CheakeOut({closeHandler}) {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [delivery, setDelivery] = useState(10);
  const [payMent, setPayMent] = useState("cash");
  const {userInfo, userToken, basicUrl} = Store();
  const {cart, getCart, cartItems} = StoreFun();
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();

  const validationSchema = yup.object({
    city: yup.string().min(2).required(),
    street: yup.string().min(2).required()
  });
  const formik = useFormik({
    validationSchema,
    initialValues: {
      city: "",
      street: "",
      couponCode: ""
    },
    onSubmit: async (values) => {
      setDisabled(true);
      await axios
        .post(
          `${basicUrl}/cart/${cart._id}/order/${payMent}`,
          {
            shippingAddress: {
              city: values.city,
              street: values.street
            },
            couponCode: values.couponCode
          },
          {headers: {Authorization: `Bearer ${userToken}`}}
        )
        .then((res) => {
          if (res.status === 201) {
            console.log(res);
            enqueueSnackbar(`${res.data.message}`, {variant: "success"});
            if (res.data.order[0].payment_Mathed === "cash") {
              router.push(`/${userInfo.name}/order`);
              getCart();
              closeHandler()
            }
          }
        })
        .catch((err) => {
          setDisabled(false);
          enqueueSnackbar(`${err.response.data}`, {variant: "error"});
        });
    }
  });
  const placeOrder = (e) => {
    if (e.target.innerText === "NEXT") {
      if (value === 2) {
        setValue(2);
      } else {
        setValue(value + 1);
      }
    } else {
      if (value < 0) {
        setValue(0);
      } else {
        setValue(value - 1);
      }
    }
  };
  const totlaItems = cartItems.reduce((a, c) => a + c.quantity, 0);

  return (
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1} py={5} px={2}>
          <Grid item md={9} xs={12} component={"center"}>
            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
              <Tabs value={value} aria-label="basic tabs example">
                <Tab label="Addrees" {...a11yProps(0)} />
                <Tab label="Payment Way" {...a11yProps(1)} />
                <Tab label="Place Order" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <DialogContent>
              <CustomTabPanel value={value} index={0}>
                {/* Addrees */}
                <List>
                  <ListItem>
                    <TextField
                      label="City"
                      name="city"
                      inputProps={{type: "text"}}
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      error={formik.touched.city && Boolean(formik.errors.city)}
                      helperText={formik.touched.city && formik.errors.city}
                    />
                  </ListItem>
                  <ListItem>
                    <TextField
                      label="Street"
                      name="street"
                      inputProps={{type: "text"}}
                      onChange={formik.handleChange}
                      value={formik.values.street}
                      error={
                        formik.touched.street && Boolean(formik.errors.street)
                      }
                      helperText={formik.touched.street && formik.errors.street}
                    />
                  </ListItem>
                </List>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                {/* Payment Way */}
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    {" "}
                    select payment way{" "}
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={payMent}
                    onChange={(e) => {
                      setPayMent(e.target.value);
                    }}
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="cash"
                      control={<Radio />}
                      label="Cash"
                    />
                    <FormControlLabel
                      value="credit"
                      control={<Radio />}
                      label="Credit"
                    />
                  </RadioGroup>
                </FormControl>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                {/* Place Order */}
                <Typography
                  fontWeight={700}
                  py={5}
                  variant="h5"
                  color={"#f0c000"}
                >
                  User Informiton
                </Typography>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      value={userInfo?.name}
                      variant="standard"
                      label="Name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      value={userInfo?.email}
                      variant="standard"
                      label="Email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      value={userInfo?.phone}
                      variant="standard"
                      label="Phone"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      name="city"
                      value={formik.values.city}
                      variant="standard"
                      label="City"
                      onChange={formik.handleChange}
                      error={formik.touched.city && Boolean(formik.errors.city)}
                      helperText={formik.touched.city && formik.errors.city}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      name="street"
                      value={formik.values.street}
                      variant="standard"
                      label="Street"
                      onChange={formik.handleChange}
                      error={
                        formik.touched.street && Boolean(formik.errors.street)
                      }
                      helperText={formik.touched.street && formik.errors.street}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      value={payMent}
                      variant="standard"
                      label="Payment"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      value={formik.values.couponCode}
                      name="couponCode"
                      variant="standard"
                      label="Coupon Code"
                      onChange={formik.handleChange}
                      error={
                        formik.touched.couponCode &&
                        Boolean(formik.errors.couponCode)
                      }
                      helperText={
                        formik.touched.couponCode && formik.errors.couponCode
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Button color="secondary" variant="contained">
                      use coupon
                    </Button>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Typography
                      fontWeight={700}
                      py={5}
                      variant="h5"
                      color={"#f0c000"}
                    >
                      Order Informiton
                    </Typography>

                    <Card sx={{width:'100%'}}>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Name</TableCell>
                              <TableCell>Price</TableCell>
                              <TableCell>size</TableCell>
                              <TableCell>Quantity</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {cartItems.map((x, index) => (
                              <TableRow key={index}>
                                <TableCell>
                                  <Typography
                                    fontWeight={700}
                                    color={"#208080"}
                                    textTransform={"capitalize"}
                                  >
                                    {x.productId.title}{" "}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  {x.price !== x.final_price ? (
                                    <Typography>
                                      <span className="price_span">
                                        {x.price}{" "}
                                      </span>{" "}
                                      {x.final_price} LE{" "}
                                    </Typography>
                                  ) : (
                                    <Typography>{x.final_price} LE </Typography>
                                  )}
                                </TableCell>
                                <TableCell>
                                  <Typography>{x.size} </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography>{x.quantity} </Typography>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Card>
                  </Grid>
                </Grid>
              </CustomTabPanel>
            </DialogContent>
          </Grid>

          {value === 2 && (
            <Grid item md={3} xs={12}>
              <Card>
                <Typography
                  textAlign={"center"}
                  variant="h4"
                  fontWeight={700}
                  py={3}
                >
                  Receipts
                </Typography>
                <Divider />
                <List>
                  <ListItem>
                    <Grid item xs={12}>
                      <Typography fontWeight={600} color={"red"}>
                        Totla Items
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>{totlaItems} &nbsp; item(s)</Typography>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid item xs={12}>
                      <Typography fontWeight={600} color={"red"}>
                        Products Price
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      {cart.totalPrice !== cart.TAD ? (
                        <Typography>
                          <span className="price_span">{cart.totalPrice} </span>{" "}
                          {cart.TAD} LE{" "}
                        </Typography>
                      ) : (
                        <Typography>{cart.totalPrice} &nbsp; LE</Typography>
                      )}
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid item xs={12}>
                      <Typography fontWeight={600} color={"red"}>
                        Taxes
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        {parseFloat(cart.TAD * 0.14).toFixed(2)} &nbsp; LE
                      </Typography>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid item xs={12}>
                      <Typography fontWeight={600} color={"red"}>
                        Delivery
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>{delivery} &nbsp; LE</Typography>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid item xs={12}>
                      <Typography fontWeight={600} color={"red"}>
                        Discound
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography color="red">
                        {" "}
                        {cart.TAD - cart.totalPrice} &nbsp; LE
                      </Typography>
                    </Grid>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <Grid item xs={12}>
                      <Typography fontWeight={600} color={"red"}>
                        Tatal
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        {parseFloat(
                          cart.TAD + cart.TAD * 0.14 + delivery
                        ).toFixed(2)}{" "}
                        &nbsp; LE
                      </Typography>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <LoadingButton
                      variant="contained"
                      color="secondary"
                      fullWidth
                    type="submit"
                    loading={disabled}
                    >
                      Plase order
                    </LoadingButton>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          )}
          <Grid item xs={12}>
            <DialogActions>
              {value === 0 ? (
                <Button onClick={() => closeHandler()} color="primary">
                  Cancel
                </Button>
              ) : (
                <Button onClick={(e) => placeOrder(e)} color="primary">
                  back
                </Button>
              )}
                <Button sx={{display:value===2 ?'none' :'flex'}} variant="contained" onClick={(e) => placeOrder(e)}>
                  next
                </Button>
              {/* ) : (
                <LoadingButton
                  loading={disabled}
                  type="submit"
                  variant="contained"
                >
                  finsh
                </LoadingButton>
              )} */}
            </DialogActions>
          </Grid>
        </Grid>
      </form>
  );
}
