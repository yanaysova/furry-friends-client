import { styled } from "@mui/system";
import Button from "@mui/material/Button";

const StyledButton = styled(Button)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "none",
  borderRadius: "20px",
  width: "fit-content",
  padding: "8px",
  fontFamily: "'Yanone Kaffeesatz', sans-serif",
  fontWeight: 400,
  color: "var(--black)",
  fontSize: "1.5rem",
  backgroundColor: "none",
  "&:hover": {
    backgroundColor: "var(--green)",
    cursor: "pointer",
  },
});

export default StyledButton;
