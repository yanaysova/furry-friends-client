import { useState } from "react";
import { Button, Box } from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

const UploadButton = ({ setFile, setIsEmpty, isEmpty }) => {
  const [filename, setFilename] = useState("");

  const handleFileUpload = (e) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    setFile(file);
    const { name } = file;
    setFilename(name);
    setIsEmpty(false);
  };

  return (
    <div style={{ disply: "flex", flexDirection: "column" }}>
      <Button
        component="label"
        variant="outlined"
        startIcon={<FileUploadOutlinedIcon />}
        sx={{ marginRight: "1rem" }}
      >
        Upload Image*
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileUpload}
        />
      </Button>
      <Box>{filename}</Box>
      {isEmpty && <span style={{ color: "red" }}>*Please upload image</span>}
    </div>
  );
};

export default UploadButton;
