import { useState, useContext, useEffect } from "react";
import { usersContextRef } from "../../context/usersContext";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PetsIcon from "@mui/icons-material/Pets";
import Logout from "@mui/icons-material/Logout";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import { privateInstance } from "../../utilities/api";

export default function AvatarMenu() {
  const { currentUser, setCurrentUser, isAdmin } = useContext(usersContextRef);
  const [anchorEl, setAnchorEl] = useState(null);
  const [firstNameLetter, setFirstNameLetter] = useState("");
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  useEffect(() => {
    setFirstNameLetter(currentUser.firstName?.[0] || "");
  }, [currentUser]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const response = await privateInstance.post("/auth/logout");
      if (response.status === 200 || response.status === 204) {
        localStorage.removeItem("token");
        navigate("/");
        setCurrentUser(null);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
    handleClose();
  };

  const handleProfileSettings = () => {
    navigate("/user/profile");
    handleClose();
  };

  const handleMyPets = () => {
    navigate("/user/mypets");
    handleClose();
  };

  const handleDashboard = () => {
    navigate("/admin");
    handleClose();
  };

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            sx={{ width: 32, height: 32, backgroundColor: "var(--orange)" }}
          >
            {firstNameLetter}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleProfileSettings}>
          <Avatar /> {currentUser.firstName} {currentUser.lastName}
        </MenuItem>
        <Divider />
        {isAdmin ? (
          <MenuItem onClick={handleDashboard}>
            <ListItemIcon>
              <DashboardCustomizeOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Dashboard
          </MenuItem>
        ) : (
          <MenuItem onClick={handleMyPets}>
            <ListItemIcon>
              <PetsIcon fontSize="small" />
            </ListItemIcon>
            My Pets
          </MenuItem>
        )}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
