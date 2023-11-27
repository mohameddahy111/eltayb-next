"use client"

import { Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import React, { useState } from "react";
import CheakeOut from "./CheakeOut";

export default function ChekoutDailog() {
  const [open, setOpen] = useState(false)
  const closeHandler = () => {
    setOpen(false)
  }
  return (
    <Box width={"100%"} >
      <Button variant='contained' fullWidth  onClick={()=>{setOpen(true)}} >
        Check Out
      </Button>

      <Dialog  fullScreen open={open} onClose={closeHandler} aria-labelledby={'title'}>
        <DialogTitle id={"title"}>
          Check out 
        </DialogTitle>
          <CheakeOut closeHandler={closeHandler} />
      </Dialog>
    </Box>
  );
}
