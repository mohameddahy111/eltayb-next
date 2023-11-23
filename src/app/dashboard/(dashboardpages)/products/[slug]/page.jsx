"use client"

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import EidtProduct from '@/app/dashboard/components/EditProduct';
import axios from 'axios'
import { Store } from '@/app/context/DataStore';
import Loading from '@/app/loading';


export default function page() {
  const [product, setProduct] = useState("");
  const { userToken , basicUrl ,mobilDiv}=Store()

  const params = useParams()
  const getDetilsProduct = async () => {
    await axios.get(`${basicUrl}/product/${params.slug}`).then((res) => {
      console.log(res.data.product)
      setProduct(res.data.product);
    }).catch((err)=>{
      console.log(err)
    });
  };
  useEffect(()=>{
    getDetilsProduct()
    // getAllCategories();

  },[])



  return (
    <div>
      {product&& <EidtProduct data={product}/>}
    </div>
  )
}
