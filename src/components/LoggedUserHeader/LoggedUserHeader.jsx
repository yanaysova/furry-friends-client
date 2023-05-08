import React, { useContext } from "react";
import { usersContextRef } from "../../context/usersContext";
import "./LoggedUserHeader.css";
import dogIcon from "../../assets/dog_icon.png";
import catIcon from "../../assets/cat_icon.png";
import SquareButton from "../../ui/SquareButton/SquareButton";
import PetsIcon from "@mui/icons-material/Pets";
import { useNavigate } from "react-router-dom";

const LoggedUserHeader = () => {
  const navigate = useNavigate();

  const { currentUser } = useContext(usersContextRef);
  return (
    <div className="logged-user-header">
      <h1>
        Welcome back {currentUser.firstName} {currentUser.lastName}
      </h1>
      <h3>What are you looking furr?</h3>
      <section className="logged-selection">
        <SquareButton onClick={() => navigate("/search?type=Dog")}>
          <span>Dogs</span>
          <img src={dogIcon} alt="" />
        </SquareButton>
        <SquareButton>
          <span>My Pets</span>
          <PetsIcon sx={{ fontSize: "2.5rem", color: "black" }} />
        </SquareButton>
        <SquareButton>
          <span>Cats</span>
          <img src={catIcon} alt="" />
        </SquareButton>
      </section>
    </div>
  );
};

export default LoggedUserHeader;
