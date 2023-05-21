import React, { useContext } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import StyledButton from "../../ui/StyleButton/StyledButton";
import SiteHeader from "../SiteHeader/SiteHeader";
import { usersContextRef } from "../../context/usersContext";
import AvatarMenu from "../../ui/AvatarMenu/AvatarMenu";

const Navbar = () => {
  const { currentUser } = useContext(usersContextRef);

  const navigate = useNavigate();

  return (
    <nav className="nav-container">
      <SiteHeader />
      <div>
        <button type="text" placeholder="Lets find a new buddy!" />
      </div>
      <div className="user-nav">
        {currentUser ? (
          <AvatarMenu />
        ) : (
          <StyledButton onClick={() => navigate("/auth")}>
            Login/Signup
          </StyledButton>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
