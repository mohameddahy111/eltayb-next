import React, {useState} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Grid,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box
} from "@mui/material";
import {StoreFun} from "../context/FunStore";

export default function DetailsOrderDetails({data}) {
  const [open, setOPen] = useState(false);
  const {addItemToCart} = StoreFun();

  const handleClickOpen = () => {
    setOPen(true);
  };

  const handleClose = () => {
    setOPen(false);
  };
  const reorder =  () => {
    // data.cartItems.map( (ele) => {
    //     const item = {
    //       productId: ele.productId._id,
    //       size: ele.size,
    //       quantity: ele.quantity
    //     };
    //     addItemToCart(item);
    //   });
      
  };

  return (
    <Box>
      <Button onClick={handleClickOpen} color="secondary" variant="contained">
        Detalis
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          Order No : {data?._id}
        </DialogTitle>
        <DialogContent>
          <Grid item md={12} xs={12}>
            <Typography fontWeight={700} py={5} variant="h5" color={"#f0c000"}>
              Order Informiton
            </Typography>

            <Card>
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
                    {data?.cartItems?.map((x, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Typography
                            fontWeight={700}
                            color={"#208080"}
                            textTransform={"capitalize"}
                          >
                            {x.productId?.title}{" "}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {x.price !== x.final_price ? (
                            <Typography>
                              <span className="price_span">{x.price} </span>{" "}
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
          </Grid>{" "}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              reorder(handleClose());
            }}
            autoFocus
          >
            Re-order
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
