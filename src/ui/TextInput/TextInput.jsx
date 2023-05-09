import React from "react";
import TextField from "@mui/material/TextField";

const TextInput = ({
  isRequiered = true,
  errMessage = undefined,
  errCode = "",
  label,
  type,
  autoComp,
  setState,
  value = undefined,
  optionalHelper = "",
  errText = "",
}) => {
  const hasError = errMessage === errCode ? true : false;

  const helperMsg = hasError ? errText : optionalHelper;

  return (
    <TextField
      style={{ width: "100%", margin: "0 10px" }}
      error={hasError}
      required={isRequiered}
      label={label}
      type={type}
      variant="standard"
      autoComplete={autoComp}
      value={value}
      onChange={(e) => {
        setState(e.target.value);
      }}
      helperText={helperMsg}
    />
  );
};

export default TextInput;
