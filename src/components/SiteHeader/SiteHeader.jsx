import React from "react";
import { Link } from "react-router-dom";
import FurryFriendsLogo from "../../assets/furry friends.png";
import "./SiteHeader.css";

const SiteHeader = () => {
  return (
    <Link to="/">
      <div className="site-header">
        <img src={FurryFriendsLogo} alt="BlabberBox Logo" />
        {/* <h1>Furry Friends</h1> */}
      </div>
    </Link>
  );
};

export default SiteHeader;
