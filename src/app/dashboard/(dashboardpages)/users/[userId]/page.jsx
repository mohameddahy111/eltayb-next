"use client"

import UserDetalis from "@/app/dashboard/components/UserDetalis";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Store } from "@/app/context/DataStore";
import Loading from "@/app/loading";
import { useSnackbar } from "notistack";


export default function page({ params }) {
  const { basicUrl, userToken } = Store();
  const [userData, setUserDate] = useState("");
  const [orders, setOrders] = useState([]);
  const {enqueueSnackbar ,closeSnackbar }=useSnackbar()

  const getUserDetails = async () => {
    await axios
    .get(`${basicUrl}/users/admin/user/${params.userId}`, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
    .then((res) => {
        closeSnackbar()
        setUserDate(res.data.user_info);
        setOrders(res.data.user_orders);
        enqueueSnackbar(`${res.data.message}`, { variant: "success" });

      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(`${err.response?.data}`, { variant: "error" });

      });
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  return <div>{!userData ? <Loading /> : <UserDetalis user={userData} orders={orders} />}</div>;
}

