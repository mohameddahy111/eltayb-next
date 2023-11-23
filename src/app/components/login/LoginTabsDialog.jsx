import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Signin from "./Signin";
import SignUp from "./SignUp";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
         {children}
        </Box>
      )}
    </div>
  );
}


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function LoginTabsDialog() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{ borderBottom: 1, borderColor: "#f0c000" }}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Log in" {...a11yProps(0)} sx={{":focus":{color:'#f0c000',} }} />
          <Tab label="Register" {...a11yProps(1)} sx={{":focus":{color:'#f0c000',}}}  />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
       <Signin/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
       <SignUp/>
      </CustomTabPanel>
    </Box>
  );
}
