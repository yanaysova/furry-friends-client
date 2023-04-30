import React from "react";
import { modalStyle } from "./modalStyle";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const ModalComponent = ({ open, setOpen, content }) => {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>{content}</Box>
    </Modal>
  );
};

export default ModalComponent;
