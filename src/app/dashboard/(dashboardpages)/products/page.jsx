"use client"
import React, { useEffect, useState } from "react";
import ProductHeader from "../../components/ProductHeader";
import CreateTable from "../../components/CreateTable";
import { Box } from "@mui/material";
import axios from "axios";
import { Store } from "@/app/context/DataStore";
import Loading from "@/app/loading";
import Pages from "@/app/components/Pages";




export default  function page() {
  const {basicUrl}=Store()
  const [products , setProducts]=useState([])
  const [loading, setLoading] = useState(true);

  const getProducts = async(page)=>{
    await axios.get(`${basicUrl}/product?page=${page||1}`).then((res)=>{
      setLoading(false)
      setProducts(res.data)
    }).catch((err)=>{
      setLoading(false)
      console.log(err)

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
        <CreateTable data={products}   />
      </Box>
      <Pages data={products.page} fundo={getProducts}/>

        </>
      )}
    </div>
  );
}
