import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SnackbarAlert = ({ message, open, setOpen, severityType }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          variant="filled"
          severity={severityType}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SnackbarAlert;
