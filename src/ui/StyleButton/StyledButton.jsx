import { styled } from "@mui/system";
import Button from "@mui/material/Button";

const StyledButton = styled(Button)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "none",
  borderRadius: "10px",
  width: "fit-content",
  padding: "0 20px",
  fontFamily: "'Yanone Kaffeesatz', sans-serif",
  textTransform: "none",
  fontWeight: 400,
  color: "var(--black)",
  fontSize: "1.2rem",
  backgroundColor: "var(--grey)",
  "&:hover": {
    backgroundColor: "var(--green)",
    cursor: "pointer",
  },
  "&:disabled": {
    cursor: "not-allowed",
    pointerEvents: "all !important",
    backgroundColor: "transparent",
    border: "1px solid lightgrey",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    padding: "0 15px",
  },
}));

export default StyledButton;
