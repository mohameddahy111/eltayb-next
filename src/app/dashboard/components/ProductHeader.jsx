
import { Store } from "@/app/context/DataStore";
import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  Container,
  TextField,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import AddCategory from "./AddCategory";

export default function ProductHeader() {
  const {mobilDiv}=Store()
  return (
    <Container sx={{p:"20px"}}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDirection={mobilDiv && 'column'}
        gap={2}
      >
        <TextField fullWidth={mobilDiv && true} />
        {/* <Autocomplete /> */}
        <Box>
          <ButtonGroup variant="contained">
            <Link href='/dashboard/products/add_product' passHref>
            <Button>Add product </Button>

            </Link>
            <AddCategory title={"ADD CATEGORY" }/>
            <AddCategory title={"Add Brand " }/>
            {/* <Button>Add product </Button> */} 
          </ButtonGroup>
        </Box>
      </Box>
    </Container>
  );
}
