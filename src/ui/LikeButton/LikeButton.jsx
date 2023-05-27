import { Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const LikeButton = ({ addLiked, favorited, style }) => {
  const handleButtonClick = async (e) => {
    e.stopPropagation();
    await addLiked();
  };

  return (
    <Button
      onClick={handleButtonClick}
      sx={{
        position: "absolute",
        margin: "0",
        padding: "0",
        top: "8px",
        right: "8px",
        minWidth: "0",
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        background: "#ffffff",
        opacity: "0.9",
        transition: "opacity 0.3s ease",
        "&:hover": {
          opacity: "1",
          background: "#ffffff",
          boxShadow: "rgba(100, 100, 111, 0.3) 0px 5px 5px 0px",
        },
        ...style,
      }}
    >
      {favorited ? (
        <FavoriteIcon style={{ margin: "0", padding: "0" }} />
      ) : (
        <FavoriteBorderIcon style={{ margin: "0", padding: "0" }} />
      )}
    </Button>
  );
};

export default LikeButton;
