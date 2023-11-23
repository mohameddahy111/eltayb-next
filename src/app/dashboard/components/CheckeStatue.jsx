"use client";

import { Store } from "@/app/context/DataStore";
import { Switch } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import React from "react";

const CheckeStatue = ({ val, id }) => {
  const { userToken, basicUrl } = Store();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const changeStatus = async () => {
    await axios
      .put(
        `${basicUrl}/product/statue/`,
        { statue: !val, productId: id },
        { headers: { Authorization: `Bearer ${userToken}` } }
      )
      .then((res) => {
        enqueueSnackbar(`${res.data.message}`, { variant: "success" });
      })
      .catch((err) => {
        enqueueSnackbar(`${err.response.data}`, { variant: "error" });
      });
  };

  return (
    <Switch
      value={val}
      defaultChecked={val}
      onChange={() => {
        changeStatus();
      }}
    />
  );
};

export default CheckeStatue;
