import {
  Button,
  DialogActions,
  DialogTitle,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Store } from "@/app/context/DataStore";
import axios from "axios";
import { useSnackbar } from "notistack";

export default function SignUp() {
  const { setOpenLoginDailog, basicUrl } = Store();
  const {enqueueSnackbar}= useSnackbar()
  

  const validationSchema = yup.object({
    name:yup.string().min(2 ).required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(6, "password must be at least 6 characters")
      .required(),
    cpassword: yup
      .string()
      .min(6, "password must be at least 6 characters")
      .required(),
      phone: yup.number().required()

  });
  const closeHandler = () => {
    setOpenLoginDailog(false);
  };
  const formik = useFormik({
    validationSchema,
    initialValues: {
      email: "",
      password: "",phone:"" , cpassword:'',name:''
    },
    onSubmit: async (values) => {
      await axios
      .post(`${basicUrl}/users/`, values)
      .then((res) => {
       if (res.status ===201) {
        enqueueSnackbar(`${res.data}` , {variant:'success'})
        setOpenLoginDailog(false)
       };
      })
      .catch((err) => {
        enqueueSnackbar(`${err.response.data}` , {variant:'error'})
      });

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
        sign up
          </Typography>

      <List>
        <ListItem>
          <TextField
            fullWidth
            label="Name"
            name="name"
            inputProps={{ type: " text" }}
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </ListItem>
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
            label="Phone"
            name="phone"
            inputProps={{ type: "number" }}
            value={formik.values.phone<0 ?'': formik.values.phone }
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </ListItem>
        <ListItem>
          <TextField
            fullWidth
            label="Password"
            name="password"
            inputProps={{ type: " password" }}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </ListItem>
        <ListItem>
          <TextField
            fullWidth
            label=" confirm Password"
            name="cpassword"
            inputProps={{ type: " password" }}
            value={formik.values.cpassword}
            onChange={formik.handleChange}
            error={formik.touched.cpassword && Boolean(formik.errors.cpassword)}
            helperText={formik.touched.cpassword && formik.errors.cpassword}
          />
        </ListItem>
      </List>
      <DialogActions >
        <Button onClick={closeHandler}> close </Button>
        <Button type="submit" variant="contained" >
          {" "}
          sign up{" "}
        </Button>
      </DialogActions>
    </form>
  );
}
