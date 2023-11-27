"use client"

import {
  Alert,
  Button,
  DialogActions,
  DialogTitle,
  List,
  ListItem,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Store } from "@/app/context/DataStore";
import axios from "axios";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import { setCookie } from "cookies-next";

export default function Signin() {
  const { setOpenLoginDailog, setUserToken, getUserInfo, basicUrl } = Store();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [disabled, setDisabled] = useState(false);

  const validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(6, "password must be at least 6 characters")
      .required(),
  });
  const closeHandler = () => {
    setOpenLoginDailog(false);
  };
  const formik = useFormik({
    validationSchema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setDisabled(true);
      await axios
        .post(`${basicUrl}/users/login`, values)
        .then((res) => {
          if (res.status === 200) {
            setCookie('userToken', res.data.token)
            // localStorage.setItem("userToken", JSON.stringify(res.data.token));
            setUserToken(res.data.token);
              getUserInfo(res.data.token);

          }
        })
        .catch((err) => {
          enqueueSnackbar(`${err.response.data}`,{variant:'error'})
          setDisabled(false)
        })
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography
        variant="h4"
        component={"h4"}
        textTransform={"uppercase"}
        width={"100%"}
        align="center"
        fontWeight={700}
      >
        Log in
      </Typography>

      <List>
        <ListItem>
          <TextField
            fullWidth
            label="Email"
            name="email"
            inputProps={{ type: " email" }}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </ListItem>
        <ListItem>
          <TextField
            fullWidth
            label="Password"
            name="password"
            inputProps={{ type: "password" }}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </ListItem>
      </List>
      <DialogActions>
        <Button onClick={closeHandler}> close </Button>
        {/* <Button disabled={disabled} type="submit" variant="contained" className=" bg-[#f0c000]">
          {" "}
          login{" "}
        </Button> */}
        <LoadingButton loading={disabled} type="submit" variant="contained">
          log in
        </LoadingButton>
      </DialogActions>
    </form>
  );
}
