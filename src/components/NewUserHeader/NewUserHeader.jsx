import React from "react";
import "./NewUserHeader.css";
import SquareButton from "../../ui/SquareButton/SquareButton";
import dogIcon from "../../assets/dog_icon.png";
import catIcon from "../../assets/cat_icon.png";

const NewUserHeader = () => {
  return (
    <div className="new-user-header">
      <h1>Welcome to Furry Friends!</h1>
      <p>
        We specialize in finding loving homes for cats and dogs. Our goal is to
        match you with the perfect furry companion.<br></br> Browse our
        selection of cats and dogs available for adoption and discover your new
        best friend.<br></br> Adopt and make a difference in the life of a furry
        friend!
      </p>
      <section className="welcome-selection">
        <SquareButton>
          <span>Dogs</span>
          <img src={dogIcon} alt="" />
        </SquareButton>
        <SquareButton>
          <span>Cats</span>
          <img src={catIcon} alt="" />
        </SquareButton>
      </section>
    </div>
  );
};

export default NewUserHeader;
