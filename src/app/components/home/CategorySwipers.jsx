"use client";

import { StoreFun } from "@/app/context/FunStore";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import HomeSwiper from "./HomeSwiper";
import ProductHomeSwiper from "./ProductHomeSwiper";

export default function CategorySwipers() {
  const { categoryList, products, getAllCategories, getProducts } = StoreFun();
  // const categoryItems = categoryList?.map((ele) =>
  //   products?.data?.filter((x) => x.category.title === ele.title)
  // );

const list =[]
 categoryList?.map((ele)=>{
  const filter = products?.data?.filter((x)=>x.category.title === ele.title)
  list.push({title :ele.title , data:filter})
})
  useEffect(() => {
    getAllCategories();
    getProducts();
  }, []);
  return (
    <Box>
      {list?.map((x, index) => (
        <React.Fragment key={index} >
          {x?.data?.length >0 && <ProductHomeSwiper text={x.title} list={x.data} />}
        </React.Fragment>
      ))}
    </Box>
  );
}
