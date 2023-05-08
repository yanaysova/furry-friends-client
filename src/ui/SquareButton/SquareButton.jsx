import { styled } from "@mui/system";
import Button from "@mui/material/Button";

const SquareButton = styled(Button)({
  width: "7rem",
  height: "7rem",
  backgroundColor: "var(--white)",
  fontSize: "1.5rem",
  textTransform: "none",
  borderRadius: "10px",
  fontFamily: "'Yanone Kaffeesatz', sans-serif",
  border: "none",
  display: "flex",
  flexDirection: "column",
  margin: "1rem",
  boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
  "&:hover": {
    boxShadow:
      "rgba(0, 0, 0, 0.12) 0px 1px 10px, rgba(0, 0, 0, 0.24) 0px 1px 10px",
    cursor: "pointer",
    backgroundColor: "var(--white)",
  },
});

export default SquareButton;
