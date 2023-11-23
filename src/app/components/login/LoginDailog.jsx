"use client";

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import LoginTabsDialog from "./LoginTabsDialog";
import { Store } from "@/app/context/DataStore";

export default function LoginDailog() {
  const { openLoginDailog, setOpenLoginDailog } = Store();

  const closeHandler = () => {
    setOpenLoginDailog(false);
  };
  return (
    <Box>
      <Dialog onClose={closeHandler} open={openLoginDailog} fullWidth>
        <DialogContent>
          <LoginTabsDialog/>
          </DialogContent>

      </Dialog>
    </Box>
  );
}
