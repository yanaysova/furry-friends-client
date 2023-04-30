import { styled } from "@mui/system";
import Button from "@mui/material/Button";

const StyledButton = styled(Button)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "none",
  borderRadius: "30px",
  width: "fit-content",
  padding: "0 20px",
  fontFamily: "'Yanone Kaffeesatz', sans-serif",
  fontWeight: 400,
  color: "var(--black)",
  fontSize: "1.5rem",
  backgroundColor: "var(--grey)",
  "&:hover": {
    backgroundColor: "var(--green)",
    cursor: "pointer",
  },
});

export default StyledButton;
