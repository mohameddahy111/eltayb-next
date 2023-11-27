import {Redo, SkipNext, SkipPrevious, Undo} from "@mui/icons-material";
import {Box, IconButton, Typography} from "@mui/material";
import React from "react";

export default function Pages({data, fundo}) {
  const color = "#208080";
  return (
    <Box
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={1}
      my={3}
      py={2}
    >
      <Box>
        <IconButton
          onClick={() => {
            fundo(data.pages);
          }}
        >
          <SkipPrevious sx={{color: color}} />
        </IconButton>
        <IconButton
          onClick={() => {
            fundo(data.nextPage);
          }}
        >
          <Undo sx={{color: color}} />
        </IconButton>
      </Box>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Typography> {data?.page}</Typography>/{" "}
        <Typography>{data?.pages} </Typography>
      </Box>
      <Box>
        <IconButton
          onClick={() => {
            fundo(data.perPage);
          }}
        >
          <Redo sx={{color: color}} />
        </IconButton>
        <IconButton
          onClick={() => {
            fundo();
          }}
        >
          <SkipNext sx={{color: color}} />
        </IconButton>
      </Box>
    </Box>
  );
}
