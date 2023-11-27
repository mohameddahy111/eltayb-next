import {useMediaQuery} from "@mui/material";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useSnackbar} from "notistack";
import {createContext, useContext, useEffect, useState} from "react";
import {deleteCookie, getCookie, hasCookie, setCookie} from "cookies-next";

const DataStore = createContext();
export const DataStoreProvider = ({children}) => {
  const router = useRouter();
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const basicUrl = "https://eltaybbackend.onrender.com";
  const mobilDiv = useMediaQuery("(max-width:600px)");
  const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(getCookie("userToken") || null);
  const [openLoginDailog, setOpenLoginDailog] = useState(false);
  const [openCartDailog, setOpenCartDailog] = useState(1);

  useEffect(() => {
    getCookie("userInfo")
      ? setUserInfo(JSON.parse(getCookie("userInfo")))
      : setUserInfo(null);
  }, [getCookie("userInfo")]);
  const getUserInfo = async (token) => {
    "use client";
    token = token || userToken;
    if (token) {
      await axios
        .get(`${basicUrl}/users/userInfo`, {
          headers: {Authorization: `Bearer ${token}`},
        })
        .then((res) => {
          if (res.status === 200) {
            setUserInfo(res.data.user);
            setCookie("userInfo", res.data.user);
            enqueueSnackbar(`wellcome ,  ${res.data.user.name}`, {
              variant: "success",
            });
            if (res.data.user._isAdmin === "admin") {
              router.push("/dashboard");
            }
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setOpenLoginDailog(false);
        });
    }
  };
  const logout = async () => {
    await axios
      .patch(
        `${basicUrl}/users/logout/${userInfo._id}`,
        {
          _isActive: false,
        },
        {headers: {Authorization: `Bearer ${userToken}`}}
      )
      .then((res) => {
        if (res.status === 200) {
          deleteCookie("userInfo");
          deleteCookie("userToken");
          deleteCookie("cartItems");
          setUserInfo(null);
          setUserToken(null);
          router.refresh();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // getUserInfo();
  }, [userToken]);
  return (
    <DataStore.Provider
      value={{
        mobilDiv,
        setUserInfo,
        openLoginDailog,
        setOpenLoginDailog,
        userInfo,
        openCartDailog,
        setOpenCartDailog,
        userToken,
        setUserToken,
        basicUrl,
        getUserInfo,
        logout,
      }}
    >
      {children}
    </DataStore.Provider>
  );
};

export const Store = () => {
  return useContext(DataStore);
};
