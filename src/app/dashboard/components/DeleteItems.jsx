"use client";

import React, { useState } from "react";
import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { Store } from "@/app/context/DataStore";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";

export default function DeleteItems({ data }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userToken, basicUrl } = Store();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter()

  const deleteItem = async () => {
    setLoading(true);
    await axios
      .delete(`${basicUrl}/product/${data._id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res)
          enqueueSnackbar(`${res.data}`, { variant: "success" });
          setLoading(false);
          setOpen(false);
          router.push('/dashboard/products/')

        }
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar(`${err.response.data}`, { variant: "error" });
      });
  };
  return (
    <Box>
      <Button
        onClick={() => setOpen(true)}
        sx={{ ml: "5px" }}
        startIcon={<Delete />}
        variant="contained"
        color="error"
      >
        Delete Item
      </Button>
      <Box>
        <Dialog
          open={open}
          fullWidth
          onClose={() => {
            setOpen(false);
          }}
          aria-labelledby={"delet_items"}
        >
          <DialogTitle id={"delet_items"}>
            You Are Sure to Delete{" "}
            <span style={{ color: "red" }}>{data.title} </span>?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              you well be sure to delete {data.title} from your Data Base
              Collection ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => setOpen(false)}
              color="primary"
            >
              Cancel
            </Button>
            <LoadingButton
              loading={loading}
              variant="contained"
              onClick={() => deleteItem()}
              color="error"
            >
              Delelet
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
