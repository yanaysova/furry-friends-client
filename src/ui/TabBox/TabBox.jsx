import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const TabBox = ({ value, handleChange, tabs }) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="profile tabs"
        textColor="primary"
        indicatorColor="secondary"
      >
        {tabs.map((tab) => (
          <Tab label={tab.label} key={tab.label} />
        ))}
      </Tabs>
    </Box>
  );
};

export default TabBox;
