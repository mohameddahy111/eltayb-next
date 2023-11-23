import {  AddBusiness, Dashboard, Groups2, Home, Inventory2, Login, Logout, Store } from "@mui/icons-material";

export const list = [
  { title: "Home", path: "/", icon: <Home /> },
  { title: "Shop", path: "/shop", icon: <Store /> },
  { title: "About", path: "/about", icon: <Groups2 /> },
  { title: "Login", icon: <Login /> },
];

export const dashboardMenu = [
  { title: "Dash Board", path: "/dashboard", icon: <Dashboard sx={{ color:'#fff'}}/> },
  { title: "Products", path: "/dashboard/products", icon: <Inventory2 sx={{ color:'#fff'}}/> },
  { title: "users", path: "/dashboard/users", icon: <Groups2 sx={{ color:'#fff'}}/> },
  { title: "orders",  icon: <AddBusiness sx={{ color:'#fff'}}/> },
  { title: "logout",  icon: <Logout sx={{ color:'#fff'}}/> },
]

export const moreSeller = [
  {
    title: "Orange",
    rating: 4,
    more: "/product/orange",
    img: {
      scr: "https://i.pinimg.com/474x/89/0d/dd/890ddd9b30827a934c0e2c2222ee86a3.jpg",
      id: "",
    },
  },
  {
    title: "Pomegranate",
    rating: 4.5,
    more: "/product/pomegranate",
    img: {
      scr: "https://i.pinimg.com/564x/81/ec/98/81ec9853c06229d32fdaca1872535554.jpg",
      id: "",
    },
  },
  {
    title: "Strawbery",
    rating: 4.8,
    more: "/product/strawbery",
    img: {
      scr: "https://i.pinimg.com/564x/4d/78/fe/4d78feb181d19d30dcfbf3d1a682cea9.jpg",
      id: "",
    },
  },
  {
    title: "Cherries",
    rating: 4.5,
    more: "/product/cherries",
    img: {
      scr: "https://i.pinimg.com/564x/b6/4b/6d/b64b6dc0445eef04d966bc1246645d5e.jpg",
      id: "",
    },
  },
  {
    title: "Tropical Fruit Salad",
    rating: 4.5,
    more: "/product/Tropical_Fruit_Salad",
    img: {
      scr: "https://i.pinimg.com/564x/74/a7/da/74a7da691d1eea6ba244dfc283799af4.jpg",
      id: "",
    },
  },
  {
    title: "Mojito Fruit Salad",
    rating: 4.5,
    more: "/product/Mojito_Fruit_Salad",
    img: {
      scr: "https://i.pinimg.com/564x/cd/9e/2f/cd9e2fdf5315e8559a59a49f0247ffa6.jpg",
      id: "",
    },
  },
];
export const recently = [
  {
    title: "Mini Pancakes",
    rating: 4,
    more: "/product/Mini_Pancakes",
    img: {
      scr: "https://i.pinimg.com/564x/f2/fa/c6/f2fac632098c357d769bed6d14caeaea.jpg",
      id: "",
    },
  },
  {
    title: "Ice cream",
    rating: 4.5,
    more: "/product/ice_cream",
    img: {
      scr: "https://i.pinimg.com/564x/4d/2a/a1/4d2aa18eb0fa6469b2064b24e1a76e75.jpg",
      id: "",
    },
  },
  {
    title: " Blackberry Mojito",
    rating: 4.8,
    more: "/product/ Blackberry_Mojito",
    img: {
      scr: "https://i.pinimg.com/564x/d5/88/df/d588df74bcdf58ee85475a6cb37f6eb1.jpg",
      id: "",
    },
  },
  {
    title: "Rainbow Fruit ",
    rating: 4.5,
    more: "/product/Rainbow_Fruit",
    img: {
      scr: "https://i.pinimg.com/564x/49/ca/30/49ca30d3c0872eb60402059b2cc1e98c.jpg",
      id: "",
    },
  },
  {
    title: "Fruit cake ",
    rating: 4.5,
    more: "/product/Fruit_cake ",
    img: {
      scr: "https://i.pinimg.com/564x/71/d3/9b/71d39b05241d3f86e0e4b18123870107.jpg",
      id: "",
    },
  },
  {
    title: "Winter Fruit Salad ",
    rating: 4.5,
    more: "/product/Winter_ Fruit_Salad ",
    img: {
      scr: "https://i.pinimg.com/474x/bb/e8/46/bbe8464a5bf084de961428355db4939f.jpg",
      id: "",
    },
  },
];


