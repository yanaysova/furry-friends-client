import { useState } from "react";
import { Button, Box } from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

const UploadButton = ({ setFile }) => {
  const [filename, setFilename] = useState("");

  const handleFileUpload = (e) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    setFile(file);
    const { name } = file;
    setFilename(name);
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
          required="true"
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileUpload}
        />
      </Button>
      <Box>{filename}</Box>
    </div>
  );
};

export default UploadButton;
