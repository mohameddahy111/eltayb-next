"use client"
import React, { useEffect, useState } from "react";
import ProductHeader from "../../components/ProductHeader";
import CreateTable from "../../components/CreateTable";
import { Box } from "@mui/material";
import axios from "axios";
import { Store } from "@/app/context/DataStore";
import Loading from "@/app/loading";




export default  function page() {
  const {basicUrl}=Store()
  const [products , setProducts]=useState([])
  const [loading, setLoading] = useState(true);

  const getProducts = async()=>{
    await axios.get(`${basicUrl}/product`).then((res)=>{
      console.log(res.data)
      setLoading(false)
      setProducts(res.data)
    }).catch((err)=>{
      setLoading(false)

    })

  }
  useEffect(()=>{
    getProducts()
  },[])
  return (
    <div>
      {loading ? <Loading/> :(
        <>
      <ProductHeader />
      <Box>
        <CreateTable data={products}  />
      </Box>

        </>
      )}
    </div>
  );
}
