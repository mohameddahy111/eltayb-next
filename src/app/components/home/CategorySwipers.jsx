"use client";

import {StoreFun} from "@/app/context/FunStore";
import {Box} from "@mui/material";
import React, {useEffect} from "react";
import ProductHomeSwiper from "./ProductHomeSwiper";
export default function CategorySwipers() {
  // const {basicUrl}=Store()
  const {categoryList, getAllCategories, swiperList, getSwiperList} =
    StoreFun();

  const list = [];
  categoryList?.map((ele) => {
    const filter = swiperList?.filter((x) => x.category.title === ele.title);
    list.push({title: ele.title, data: filter});
  });
  useEffect(() => {
    getAllCategories();
    getSwiperList();
  }, []);
  return (
    <Box>
      {list?.map((x, index) => (
        <React.Fragment key={index}>
          {x?.data?.length > 0 && (
            <ProductHomeSwiper text={x.title} list={x.data} />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
}
