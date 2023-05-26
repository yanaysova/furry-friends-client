import React from "react";
import { Link } from "react-router-dom";
import FurryFriendsLogo from "../../assets/furryfriends_logo.png";
import "./SiteHeader.css";

const SiteHeader = () => {
  return (
    <Link to="/">
      <div className="site-header">
        <img src={FurryFriendsLogo} alt="Furry Friends Logo" />
      </div>
    </Link>
  );
};

export default SiteHeader;
