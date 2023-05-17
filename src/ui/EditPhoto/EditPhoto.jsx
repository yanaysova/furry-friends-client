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
          component="span"
          variant="contained"
          sx={{
            position: "absolute",
            bottom: "5%",
            right: "5%",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <EditIcon sx={{ lineHeight: "50px" }} />
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
