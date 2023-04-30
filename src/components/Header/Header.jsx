import React from "react";
import { Link } from "react-router-dom";
import FurryFriendsLogo from "../../assets/furry_friends_logo.svg";
import "./Header.css";

const Header = () => {
  return (
    <Link to="/">
      <div className="site-header">
        {/* <img src={FurryFriendsLogo} alt="BlabberBox Logo" /> */}
        <h1>Furry Friends</h1>
      </div>
    </Link>
  );
};

export default Header;
