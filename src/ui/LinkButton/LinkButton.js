import { styled } from "@mui/system";
import Button from "@mui/material/Button";

const LinkButton = styled(Button)({
  background: "none",
  border: "none",
  fontFamily: "'Yanone Kaffeesatz', sans-serif",
  fontSize: "1rem",
  margin: "0",
  padding: "0",
  textTransform: "none",
  textDecoration: "underline",
  color: "var(--green)",
  "&:hover": {
    textDecoration: "underline",
    cursor: "pointer",
    backgroundColor: "transparent",
  },
});

export default LinkButton;
