import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const EditPhoto = ({ imageUrl, setFile }) => {
  const handleFileUpload = (e) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    setFile(file);
  };

  return (
    <div style={{ position: "relative", width: "200px" }}>
      <img
        src={imageUrl}
        alt="Uploaded"
        style={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
          borderRadius: "20px",
        }}
      />
      <label htmlFor="file-upload">
        <Button
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            borderRadius: "50%",
            width: "45px",
            minWidth: "45px",
            height: "45px",
            padding: 0,
            background: "#ffffff",
            opacity: "0.95",
            transition: "opacity 0.3s ease",
            "&:hover": {
              opacity: "1",
              background: "#ffffff",
              boxShadow: "rgba(100, 100, 111, 0.3) 0px 5px 5px 0px",
            },
          }}
        >
          <EditIcon />
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileUpload}
          />
        </Button>
      </label>
    </div>
  );
};

export default EditPhoto;
