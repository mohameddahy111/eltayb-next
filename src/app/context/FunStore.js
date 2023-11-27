"use client";

import {createContext, useContext, useEffect, useState} from "react";
import {Store} from "./DataStore";
import axios from "axios";
import {useSnackbar} from "notistack";
import {getCookie, setCookie} from "cookies-next";
const FunStore = createContext();
export const FunStoreProvider = ({children}) => {
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const {userToken, userInfo, basicUrl} = Store();
  const [cart, setCart] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [brandsList, setBrandsList] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [pagination, setPagination] = useState("");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setWishList(
  //       getCookie("wishList") || []
  //     );
  //     setCartItems(
  //       getCookie('cartItems') ||[]
  //     );
  //   }
  // }, []);

  const getProducts = async () => {
    "use client";

    await axios
      .get(`${basicUrl}/product`)
      .then((res) => {
        if (res.status === 200) {
          setProducts({data: res.data.data, page: res.data.page});
        }
      })
      .catch((err) => {
        enqueueSnackbar(`${err.response.data}`, {variant: "error"});
      });
  };

  const getCart = async () => {
    "use client";
    closeSnackbar();
    if (userToken) {
      return await axios
        .get(`${basicUrl}/cart`, {
          headers: {Authorization: `Bearer ${userToken}`}
        })
        .then((res) => {
          if (res.status === 200) {
            setCartItems(res.data.cart.cartItems);
            setCookie("cartItems", res.data.cart.cartItems);
            setCart(res.data.cart);
            correctCartItems();
          }
        })
        .catch((err) => {
          enqueueSnackbar(`${err.response.data}`, {variant: "warning"});
          setCartItems([]);
          closeSnackbar();
        });
    }
  };

  const correctCartItems = () => {
    "use client";
    if (cartItems) {
      cartItems.map((x) => {
        if (x.productId === null) {
          removeItem(x._id);
        }
      });
    }
  };
  const removeItem = async (id) => {
    closeSnackbar();
    await axios
      .patch(
        `${basicUrl}/cart`,
        {itemId: id},
        {headers: {Authorization: `Bearer ${userToken}`}}
      )
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar(`${res.data.message}`, {variant: "success"});
          getCart();
        }
      })
      .catch((err) => {
        enqueueSnackbar(`${err.response.data}`, {variant: "error"});
      });
  };

  const getWishList = async () => {
    "use client";

    await axios
      .get(`${basicUrl}/wishlist/`, {
        headers: {Authorization: `Bearer ${userToken}`}
      })
      .then((res) => {
        if (res.status === 200) {
          setWishList(res.data.products);
          setCookie("wishlist", res.data.products);
        }
      })
      .catch((err) => {
        enqueueSnackbar(`${err.response?.data}`, {variant: "error"});
      });
  };
  //----------------------------------------------------------------//
  const addItemToCart = async (item) => {
    if (!userToken) {
      enqueueSnackbar("please login first ", {variant: "info"});
      // setOpenLoginDailog(true);
      return;
    }
    if (userInfo._isBlocked) {
      enqueueSnackbar(
        "Sorry!! , you can't add item pleace Return  callCenter ",
        {variant: "info"}
      );
      return;
    }
    if (item.quatitiy < 1) {
      closeSnackbar();
      enqueueSnackbar("Quatitiy must be greater than 1", {
        variant: "error"
      });
      return;
    }
    await axios
      .post(`${basicUrl}/cart`, item, {
        headers: {Authorization: `Bearer ${userToken}`}
      })
      .then(async (res) => {
        if (res.status === 200) {
          enqueueSnackbar(`${res.data.message}`, {
            variant: "success"
          });
        }
        getCart();
      })
      .catch((err) => {
        enqueueSnackbar(`${err.response?.data}`, {variant: "error"});
      });
  };
  //-------------------------get orders---------------------------------------//
  const getOrders = async (page) => {
    await axios
      .get(`${basicUrl}/orders?sort=-createdAt&page=${page ? page : 1}`, {
        headers: {authorization: `Bearer ${userToken}`}
      })
      .then((res) => {
        if (res.status === 200) {
          setOrders({orders: res.data.data, page: res.data.page});
        }
      })
      .catch((err) => {
        enqueueSnackbar(`${err.response.data}`, {variant: "error"});
      });
  };

  //-------------------------end get orders---------------------------------------//

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
          headers: {Authorization: `Bearer ${userToken}`}
        }
      )
      .then((res) => {
        setAllOrders({orders: res.data.data, page: res.data.page});
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
    if (userInfo) {
      if (userInfo?._isAdmin !== "admin") {
        // getCart();
        getWishList();
        getOrders();
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
        orders,
        setOrders,
        getOrders
      }}
    >
      {children}
    </FunStore.Provider>
  );
};

export const StoreFun = () => {
  return useContext(FunStore);
};
