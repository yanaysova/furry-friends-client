import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const ConfirmationModal = ({
  openState,
  toggleHandler,
  onConfirmation,
  content,
}) => {
  return (
    <Dialog open={openState} onClose={toggleHandler}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleHandler}>No</Button>
        <Button onClick={onConfirmation}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
