"use client";

import { StoreFun } from "@/app/context/FunStore";
import { Add, AddShoppingCart, Close, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Dialog,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";

export default function AddToCard({ icon, data, color }) {
  const { addItemToCart } = StoreFun();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState("small");
  const [quantity, setQuantity] = useState(1);
  const closeHandler = () => {
    setOpen(false);
  };
  const item = {
    productId: data._id,
    size,
    quantity,
  };

  const incormit = (oop) => {
    closeSnackbar();
    if (oop === "remove") {
      if (quantity < 1) {
        enqueueSnackbar("quantity must be greater than zero", {
          variant: "error",
        });
        setQuantity(1);

        return;
      } else {
        setQuantity(+quantity - 1);
      }
    } else {
      setQuantity(+quantity + 1);
    }
  };

  return (
    <React.Fragment>
      <Tooltip title="Add to Cart">
        {icon ? (
          <IconButton
            onClick={() => setOpen(true)}
            disabled={data.statue ? false : true}
          >
            <AddShoppingCart />
          </IconButton>
        ) : (
          <Button
            fullWidth
            sx={{ bgcolor: color && `${color}`, color: color && "#fff" }}
            variant="contained"
            onClick={() => setOpen(true)}
            startIcon={<AddShoppingCart />}
            disabled={data.statue ? false : true}
          >
            Add to cart
          </Button>
        )}
      </Tooltip>
      <Dialog open={open} onClose={closeHandler} fullWidth>
        <Box
          px={3}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h4" component={"h2"} color="#f0c000" p={3}>
            {data.title}
          </Typography>
          <IconButton onClick={closeHandler}>
            <Close />
          </IconButton>
        </Box>
        <Box p={3}>
          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <Card>
                <CardMedia
                  component={"img"}
                  src={data.img.scr}
                  alt={data.title}
                  width={"100%"}
                  height={400}
                />
              </Card>
            </Grid>
            <Grid item md={6} xs={12}>
              <List>
                <ListItem>
                  <Box width={"100%"}>
                    <FormControl fullWidth>
                      <InputLabel id="size">Size</InputLabel>
                      <Select
                        fullWidth
                        labelId="size"
                        id="size"
                        value={size}
                        label="size"
                        onChange={(e) => setSize(e.target.value)}
                      >
                        {data?.price_size?.map((x, index) => (
                          <MenuItem key={index} value={x.size}>
                            {data.offer ? (
                              <Box
                                width={"100%"}
                                display={"flex"}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                              >
                                <Typography>{x.size}</Typography>
                                <Typography>
                                  {x.offer_value > 0 && (
                                    <span style={{ color: "green" }}>
                                      {" "}
                                      save {x.offer_value} %{" "}
                                    </span>
                                  )}{" "}
                                </Typography>
                              </Box>
                            ) : (
                              <Typography>{x.size} </Typography>
                            )}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </ListItem>
                <ListItem>
                  <LoadingButton
                    sx={{ mr: "5px" }}
                    variant="contained"
                    onClick={() => {
                      incormit("remove");
                    }}
                    size="small"
                  >
                    <Remove />
                  </LoadingButton>
                  <TextField
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                    size="small"
                    value={+quantity < 0 ? 1 : quantity}
                    inputProps={{ type: "number" }}
                  />
                  <LoadingButton
                    sx={{ ml: "5px" }}
                    variant="contained"
                    onClick={() => {
                      incormit("add");
                    }}
                    size="small"
                  >
                    <Add />
                  </LoadingButton>
                </ListItem>
                <ListItem>
                  <Button
                    onClick={() => {
                      addItemToCart(item, closeHandler());
                    }}
                    fullWidth
                    variant="contained"
                    size="small"
                  >
                    Add item
                  </Button>
                </ListItem>
              </List>
              {data.offer && (
                <List>
                  {data?.price_size.map((x, index) => (
                    <React.Fragment key={index}>
                      {x.offer_value > 0 && (
                        <ListItem>
                          <Typography color={"green"}>
                            * can save {x.offer_value} % in size {x.size}
                          </Typography>
                        </ListItem>
                      )}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
