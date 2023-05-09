import React from "react";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const Selector = ({ label, menuItems, state, setState }) => {
  const handleChange = (event) => {
    setState(event.target.value);
  };

  return (
    <FormControl required={true} sx={{ width: "100%" }}>
      <InputLabel>{label}</InputLabel>
      <Select
        labelId={label}
        id={label}
        value={state}
        label={label}
        onChange={handleChange}
        size="small"
      >
        {menuItems.map((item) => (
          <MenuItem value={item.value} key={item.label}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Selector;
