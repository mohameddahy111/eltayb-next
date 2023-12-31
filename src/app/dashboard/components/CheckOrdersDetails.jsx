import React, { useState } from "react";
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
  DialogContentText,
  Box,
} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Store } from "@/app/context/DataStore";
import { StoreFun } from "@/app/context/FunStore";

export default function CheckOrdersDetails({data }) {
    const { userToken   ,basicUrl } = Store();
    const {getAllOrders}=StoreFun()
    const [open, setOpen] = useState(false)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const accepte = async () => {
    if (data._isAccept) {
      return handleClose()
    }
    await axios
    .put(`${basicUrl}/orders/accept/${data._id}/`,{}, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar(`${res.data.message} ` ,{variant:'success'});
          getAllOrders()
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        handleClose();
      });
  };

  return (
      <Box >
          <Button variant='contained' onClick={handleClickOpen}>
              detalis
          </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">Order No : {data._id}</DialogTitle>
        {data.accpetBy && (
          <DialogContentText > 
            <Typography px={3} textTransform={'capitalize'}>
             accept by : {data.accpetBy.name}

            </Typography>
            <Typography px={3}>
             Email : <a href={`mailto: ${data.accpetBy.email}`}>  {data.accpetBy.email}</a>
            </Typography>

          </DialogContentText>

        )} 
        <DialogContent>
          <Grid item md={12} xs={12}>
            <Typography
              textTransform={"capitalize"}
              fontWeight={700}
              py={5}
              variant="h5"
              color={"#f0c000"}
            >
              clien Informiton
            </Typography>

            <Card>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>phone</TableCell>
                      <TableCell>city</TableCell>
                      <TableCell>street</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography
                          fontWeight={700}
                          color={"#208080"}
                          textTransform={"capitalize"}
                        >
                          {data.userId?.name}{" "}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{data.userId?.phone} </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{data.shippingAddress?.city} </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{data.shippingAddress?.street} </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>{" "}
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
                            {x?.productId?.title}{" "}
                          </Typography>
                        </TableCell>
                        <TableCell>
                        {x.price !== x.final_price ? (
                          <Typography><span className="price_span">{x.price}  </span> {x.final_price} LE </Typography>

                        ) :(
                          <Typography>{x.final_price} LE </Typography>
                        )}
                        </TableCell>
                        <TableCell>
                          <Typography>{x?.size} </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{x?.quantity} </Typography>
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
          <Button onClick={handleClose}>{data._isAccept ? "close" :"Disagree"} </Button>
          <Button onClick={accepte} autoFocus disabled={data._isAccept}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
     </Box>
  );
}
