"use client";
import { AddAPhoto, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Store } from "@/app/context/DataStore";
import { StoreFun } from "@/app/context/FunStore";
import Loading from "@/app/loading";
import DeleteItems from "./DeleteItems";

export default function EidtProduct({ data }) {
  const router = useRouter();
  const { userToken, basicUrl, mobilDiv } = Store();

  const { getAllCategories, categoryList, brandsList, getAllBrands } =
    StoreFun();
  const [img, setImg] = useState("");
  const [urlImg, setUrlImg] = useState(data.img.scr);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [category, setCategory] = useState(data.category._id);
  const [brands, setBrands] = useState(data.brand._id);
  const [priceSize, setPriceSize] = useState({
    price: "",
    size: 0,
    final_price: "",
    offer_value: 0,
  });

  const sizeList = [
    { title: "small" },
    { title: "medium" },
    { title: "large" },
    { title: "1 Leter" },
    { title: "1.5 Leter" },
  ];
  const [ps, setPs] = useState([...data.price_size]);
  const formData = new FormData();
  const valuesPrice = (e) => {
    let newItem = { ...priceSize };
    newItem[e.target.name] = e.target.value;
    setPriceSize(newItem);
  };
  const add = () => {
    if (priceSize.price === "") {
      enqueueSnackbar("Please select a price", { variant: "error" });
      return;
    }
    if (priceSize.size === "") {
      enqueueSnackbar("Please select a size", { variant: "error" });
      return;
    }
    const isExist = ps.find((x) => x.size === priceSize.size);
    if (isExist) {
      enqueueSnackbar("this size select before", { variant: "error" });
      console.log(isExist);
      return;
    }
    const list = [...ps];
    list.push(priceSize);
    setPs(list);
    setPriceSize({ price: "", size: 0, final_price: "", offer_value: 0 });
  };
  const removItem = (x) => {
    const list = ps.filter((z) => z.size !== x.size);
    setPs(list);
  };
  const validationSchema = yup.object({
    title: yup.string().min(2).required(),
    sub_title: yup.string().min(2),
    descrption: yup.string().min(2),
    statue: yup.boolean(),
    offer: yup.boolean(),
    _isShowe: yup.boolean(),
    quantity: yup.number(),
    stock: yup.number(),
    offer_value: yup.number(),
  });
  const formik = useFormik({
    validationSchema,
    initialValues: {
      title: data.title,
      sub_title: data.sub_title,
      descrption: data.descrption,
      statue: data.statue,
      offer: data.offer,
      _isShowe: data._isShowe,
      quantity: data.quantity,
      stock: data.stock,
      category: category,
      brand: brands,
      url_Img: urlImg,
      min_image: img,
    },
    onSubmit: async (values) => {
      Object.keys(values).map((x, index) => {
        return formData.append(x, values[x]);
      });
      ps.map((x, index) => {
        formData.append(`price_size.${index}.size`, x.size);
        formData.append(`price_size.${index}.price`, x.price);
        formData.append(`price_size.${index}.offer_value`, x.offer_value);
        formData.append(
          `price_size.${index}.final_price`,
          parseFloat(x.price - ((x.price * x.offer_value) / 100).toFixed(2))
        );
      });
      await axios
        .patch(`${basicUrl}/product/${data._id}`, formData, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            enqueueSnackbar(`${res.data.message}`, { variant: "success" });
            router.push("/dashboard/products");
          }
        })
        .catch((err) => {
          enqueueSnackbar(`${err.response.data}`, { variant: "error" });
        });
    },
  });
  useEffect(() => {
    formik.values.category = category;
    formik.values.brand = brands;
    formik.values.min_image = img[0];
    formik.values.url_Img = urlImg;
  }, [category, brands, img, urlImg]);
  // console.log(formik.values);

  useEffect(() => {
    if (category) {
      getAllBrands(category);
    }
  }, [category]);

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <Box>
      {data && (
        <Box>
          <Container>
            <Grid container spacing={1}>
              {/* left side img side  */}
              <Grid item xs={12} md={3} position={"relative"}>
                <Box
                  my={"10px"}
                  width={"100%"}
                  height={"400px"}
                  sx={{
                    backgroundImage: `url(${
                      img ? URL.createObjectURL(img[0]) : urlImg || ""
                    })`,
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                    boxShadow: "0px 0px 10px gray",
                    borderRadius: "20px",
                  }}
                ></Box>
                <Box
                  bgcolor={"rgba(223, 223, 223, 0.516)"}
                  borderRadius={50}
                  p={"5px"}
                  position={"absolute"}
                  top={"30px"}
                  right={"10px"}
                >
                  <label htmlFor="img">
                    <AddAPhoto />
                  </label>
                  <input
                    onChange={(e) => setImg(e.target.files, setUrlImg(""))}
                    type="file"
                    id="img"
                    name="img"
                    hidden
                  />
                </Box>
                <Box pt={4}>
                  <TextField
                    type="text"
                    label="Add url Photo"
                    value={urlImg}
                    onChange={(e) => {
                      setUrlImg(e.target.value, setImg(""));
                    }}
                    fullWidth
                  />
                </Box>
              </Grid>
              {/* rigth side informiton side  */}
              <Grid item xs={12} md={9} sx={{ my: "10px" }}>
                <Typography
                  variant="h4"
                  textTransform={"capitalize"}
                  fontWeight={700}
                  color={"#f0c000"}
                  p={4}
                >
                  product informtion
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={1} p={4}>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        label="title"
                        error={
                          formik.touched.title && Boolean(formik.errors.title)
                        }
                        helperText={formik.touched.title && formik.errors.title}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        name="sub_title"
                        value={formik.values.sub_title}
                        onChange={formik.handleChange}
                        label="Sub Title"
                        error={
                          formik.touched.sub_title &&
                          Boolean(formik.errors.sub_title)
                        }
                        helperText={
                          formik.touched.sub_title && formik.errors.title
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box>
                        <FormControl fullWidth>
                          <InputLabel id="category">category</InputLabel>
                          <Select
                            fullWidth
                            labelId="category"
                            id="category"
                            value={category}
                            label="category"
                            onChange={(e) => setCategory(e.target.value)}
                            error={
                              formik.touched.category &&
                              Boolean(formik.errors.category)
                            }
                          >
                            {categoryList?.map((x) => (
                              <MenuItem key={x._id} value={x._id}>
                                {x.title}{" "}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>{" "}
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box>
                        <FormControl fullWidth>
                          <InputLabel id="brands">Brands</InputLabel>
                          <Select
                            fullWidth
                            labelId="brands"
                            id="brands"
                            value={brands}
                            label="Brands"
                            onChange={(e) => setBrands(e.target.value)}
                          >
                            {brandsList?.map((x) => (
                              <MenuItem key={x._id} value={x._id}>
                                {x.title}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>{" "}
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        name="quantity"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        label="quantity"
                        error={
                          formik.touched.quantity &&
                          Boolean(formik.errors.quantity)
                        }
                        helperText={
                          formik.touched.quantity && formik.errors.quantity
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        name="stock"
                        value={formik.values.stock}
                        onChange={formik.handleChange}
                        label="stock"
                        error={
                          formik.touched.stock && Boolean(formik.errors.stock)
                        }
                        helperText={formik.touched.stock && formik.errors.stock}
                      />
                    </Grid>
                    <Box
                      width={"100%"}
                      display={"flex"}
                      justifyContent={"space-around"}
                      alignItems={"center"}
                    >
                      <Grid
                        item
                        xs={12}
                        md={3}
                        p={4}
                        sx={{
                          display: "flex",
                          // justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <InputLabel id="offer">Offer </InputLabel>
                          <Switch
                            aria-label="offer"
                            checked={formik.values.offer}
                            name="offer"
                            value={formik.values.offer}
                            onChange={formik.handleChange}
                          />
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={3}
                        sx={{
                          display: "flex",
                          // justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <InputLabel id="_isShowe">Showe </InputLabel>
                        <Switch
                          aria-label="_isShowe"
                          checked={formik.values._isShowe}
                          name="_isShowe"
                          value={formik.values._isShowe}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={3}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <InputLabel id="statue">statue </InputLabel>
                        <Switch
                          aria-label="statue"
                          checked={formik.values.statue}
                          name="statue"
                          value={formik.values.statue}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                    </Box>

                    <List sx={{ py: "20px" }}>
                      {ps?.map((x, index) => (
                        <ListItem
                          key={index}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <TextField name="size" label="Size" value={x.size} />
                          <TextField
                            name="price"
                            label="Price"
                            value={x.price}
                          />
                          <TextField
                            name="offer_value"
                            label="offer"
                            value={`${x.offer_value} %`}
                          />
                          <TextField
                            name="final_price"
                            label="final price"
                            value={parseFloat(
                              x.price -
                                ((x.price * x.offer_value) / 100).toFixed(2)
                            )}
                          />
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => removItem(x)}
                          >
                            remove
                          </Button>
                        </ListItem>
                      ))}
                    </List>
                    <ListItem
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      {/* <TextField
                  name="size"
                  label="Size"
                  value={priceSize.size}
                  onChange={(e) => {
                    valuesPrice(e);
                  }}
                /> */}
                      <Box>
                        <FormControl fullWidth>
                          <InputLabel id="brands">Size</InputLabel>
                          <Select
                            name="size"
                            fullWidth
                            labelId="size"
                            id="size"
                            value={priceSize.size}
                            label="size"
                            onChange={(e) => {
                              valuesPrice(e);
                            }}
                          >
                            <MenuItem value={0}>select size </MenuItem>
                            {sizeList?.map((x, index) => (
                              <MenuItem key={index} value={x.title}>
                                {x.title}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                      <TextField
                        name="price"
                        label="Price"
                        value={priceSize.price}
                        onChange={(e) => {
                          valuesPrice(e);
                        }}
                      />
                      <TextField
                        name="offer_value"
                        label="offer_value"
                        value={priceSize.offer_value}
                        onChange={(e) => {
                          valuesPrice(e);
                        }}
                        disabled={!formik.values.offer}
                      />
                      <TextField
                        name="final_price"
                        label="final_price"
                        value={parseFloat(
                          priceSize.price -
                            (
                              (priceSize.price * priceSize.offer_value) /
                              100
                            ).toFixed(2)
                        )}
                        onChange={(e) => {
                          valuesPrice(e);
                        }}
                      />
                      <Button variant="contained" color="success" onClick={add}>
                        Add
                      </Button>
                    </ListItem>
                    <Grid item xs={12} md={8} py={3}>
                      <label style={{ margin: "10px 0px", display: "block" }}>
                        Descrption:-
                      </label>
                      <textarea
                        name="descrption"
                        value={formik.values.descrption}
                        onChange={formik.handleChange}
                        cols={mobilDiv ? 40 : 65}
                        rows={10}
                        placeholder="type descrption for producte "
                      />
                    </Grid>
                  </Grid>
                  <Box py={2} display={'flex'} alignItems={'center'} gap={2}>
                    <Button
                      variant="contained"
                      // fullWidth={mobilDiv ? true : false}
                      type="submit"
                    >
                      Edit Product
                    </Button>
                    <DeleteItems data={data}/>
                    
                  </Box>
                </form>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </Box>
  );
}
