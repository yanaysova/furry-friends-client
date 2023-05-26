import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const MenuDrawer = ({ label, menuItems, setState, customContent }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (value) => {
    setState(value);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id={label}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
          maxWidth: "200px",
          minWidth: "130px",
          margin: "0 8px",
          fontSize: "0.8rem",
        }}
      >
        {label}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        getContentAnchorEl={null}
        sx={{
          marginTop: "14px",
        }}
      >
        {customContent ? (
          <MenuItem>{customContent}</MenuItem>
        ) : (
          menuItems.map((item) => (
            <MenuItem
              value={item.value}
              key={item.label}
              onClick={() => handleMenuItemClick(item.value)}
            >
              {item.label}
            </MenuItem>
          ))
        )}
      </Menu>
    </div>
  );
};

export default MenuDrawer;
