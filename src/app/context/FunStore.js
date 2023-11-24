"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Store } from "./DataStore";
import axios from "axios";
import { useSnackbar } from "notistack";

const FunStore = createContext();
export const FunStoreProvider = ({ children }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { userToken, setUserInfo, userInfo, basicUrl } = Store();
  const [cart, setCart] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [brandsList, setBrandsList] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [pagination, setPagination] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWishList(
        localStorage.wishList ? JSON.parse(localStorage.wishList) : []
      );
      setCartItems(
        localStorage.cartItems ? JSON.parse(localStorage.cartItems) : []
      );
    }
  }, []);

  const getProducts = async () => {
    "use client";

    await axios
      .get(`${basicUrl}/product`)
      .then((res) => {
        if (res.status === 200) {
          setProducts(res.data);
        }
        // setLoadings(false);
      })
      .catch((err) => {
        // setLoadings(false);
      });
  };

  const getCart = async () => {
    "use client";

    if (userToken) {
      return await axios
        .get(`${basicUrl}/cart`, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            setCartItems(res.data.cart.cartItems);
            localStorage.setItem(
              "cartItems",
              JSON.stringify(res.data.cart.cartItems)
            );
            setCart(res.data.cart);
            // setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          // setLoading(false);
          setCartItems([]);
        });
    }
  };

  const correctCartItems = () => {
    "use client";
    if (cartItems) {
      cartItems.map(async(x) => {
        if (x.productId === null) {
         await removeItem(x._id);
         await getCart()
        }
      });
    }
  };
  const removeItem = async (id) => {
    closeSnackbar();
    await axios
      .patch(
        `${basicUrl}/cart`,
        { itemId: id },
        { headers: { Authorization: `Bearer ${userToken}` } }
      )
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar(`${res.data.message}`, { variant: "success" });
          getCart();
        }
      })
      .catch((err) => {
        enqueueSnackbar(`${err.response.data}`, { variant: "error" });
      });
  };

  const getWishList = async () => {
    "use client";

    await axios
      .get(`${basicUrl}/wishlist/`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setWishList(res.data.products);
          localStorage.setItem("wishlist", JSON.stringify(res.data.products));
        }
      })
      .catch((err) => {
        enqueueSnackbar(`${err.response?.data}`, { variant: "error" });
      });
  };
  //----------------------------------------------------------------//
  const addItemToCart = async (item) => {
    console.log(userInfo);
    if (!userToken) {
      enqueueSnackbar("please login first ", { variant: "info" });
      // setOpenLoginDailog(true);
      return;
    }
    if (userInfo._isBlocked) {
      enqueueSnackbar(
        "Sorry!! , you can't add item pleace Return  callCenter ",
        { variant: "info" }
      );
      return;
    }
    if (item.quatitiy < 1) {
      closeSnackbar();
      enqueueSnackbar("Quatitiy must be greater than 1", {
        variant: "error",
      });
      return;
    }
    await axios
      .post(`${basicUrl}/cart`, item, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then(async (res) => {
        if (res.status === 200) {
          console.log(res);
          enqueueSnackbar(`${res.data.message}`, {
            variant: "success",
          });
          // setSeleProduct("");
          // setOpenDilago(false);
        }
        getCart();
      })
      .catch((err) => {
        enqueueSnackbar(`${err.response?.data}`, { variant: "error" });
      });
  };

  // const getUserInfo = async () => {
  //   if (userToken && !userInfo) {
  //     await axios
  //       .get(`https://eltaybbackend.onrender.com/users/userInfo`, {
  //         headers: { Authorization: `Bearer ${userToken}` },
  //       })
  //       .then((res) => {
  //         setUserInfo(res.data.user);
  //         localStorage.setItem("userInfo", JSON.stringify(res.data.user));
  //         getCart();
  //         getWishList();
  //       })
  //       .catch((err) => {
  //         enqueueSnackbar(`${err.response.data}`, { variant: "error" });
  //       });
  //   }
  // };
  //---------------------------admin-------------------------------------//
  //---------------------------get all orders-------------------------------------//
  const getAllOrders = async (page) => {
    await axios
      .get(
        `${basicUrl}/orders/allOrders?page=${
          page ? page : 1
        }&sort=_isAccept,-createdAt`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((res) => {
        setAllOrders(res.data.data);
        setPagination(res.data.page);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //-----------------------------------get all category--------------------------------------//
  const getAllCategories = async () => {
    await axios
      .get(`${basicUrl}/categories`)
      .then((res) => {
        setCategoryList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //-----------------------------------get all Brands--------------------------------//

  const getAllBrands = async (categoryId) => {
    await axios
      .get(`${basicUrl}/categories/${categoryId}/brands`)
      .then((res) => {
        setBrandsList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //-----------------------------------get All chats--------------------------------//
  //---------------------------end_admin-------------------------------------//
  useEffect(() => {
    if (userToken) {
      // getUserInfo();

      if (userInfo && userInfo?._isAdmin !== "admin") {
        getCart();
        getWishList();
      }
    }
  }, [userToken]);

  return (
    <FunStore.Provider
      value={{
        cart,
        setCart,
        cartItems,
        setCartItems,
        getCart,
        categoryList,
        setCategoryList,
        brandsList,
        setBrandsList,
        wishList,
        setWishList,
        allOrders,
        pagination,
        setPagination,
        setAllOrders,
        getWishList,
        // getUserInfo,
        getAllBrands,
        getAllOrders,
        getAllCategories,
        addItemToCart,
        products,
        setProducts,
        getProducts,
        removeItem,
        correctCartItems,
      }}
    >
      {children}
    </FunStore.Provider>
  );
};

export const StoreFun = () => {
  return useContext(FunStore);
};
