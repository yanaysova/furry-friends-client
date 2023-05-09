import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const RadioButtons = ({ label, menuItems, state, setState }) => {
  const handleChange = (event) => {
    setState(event.target.value);
  };

  return (
    <FormControl required={true}>
      <FormLabel id={label}>{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby={label}
        name={label}
        value={state}
        onChange={handleChange}
      >
        {menuItems.map((item) => (
          <FormControlLabel
            value={item.value}
            key={item.label}
            control={<Radio />}
            label={item.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtons;
