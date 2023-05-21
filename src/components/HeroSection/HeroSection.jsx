import { useContext } from "react";
import { usersContextRef } from "../../context/usersContext";
import "./HeroSection.css";
import dogIcon from "../../assets/dog_icon.png";
import catIcon from "../../assets/cat_icon.png";
import SquareButton from "../../ui/SquareButton/SquareButton";
import PetsIcon from "@mui/icons-material/Pets";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const { currentUser } = useContext(usersContextRef);
  return (
    <div className="hero-section">
      {currentUser ? (
        <>
          <h1>
            Welcome back {currentUser.firstName} {currentUser.lastName}
          </h1>
          <h3>What are you looking furr?</h3>
        </>
      ) : (
        <>
          <h1>Welcome to Furry Friends!</h1>
          <p className="new-user-p">
            We specialize in finding loving homes for cats and dogs. Our goal is
            to match you with the perfect furry companion.<br></br> Browse our
            selection of cats and dogs available for adoption and discover your
            new best friend.<br></br> Adopt and make a difference in the life of
            a furry friend!
          </p>
        </>
      )}
      <section className="logged-selection">
        <SquareButton onClick={() => navigate("/search?type=Dog")}>
          <span>Dogs</span>
          <img src={dogIcon} alt="dog icon" />
        </SquareButton>
        {currentUser && (
          <SquareButton>
            <span>My Pets</span>
            <PetsIcon
              onClick={() => navigate("/user/mypets")}
              sx={{ fontSize: "2.5rem", color: "black" }}
            />
          </SquareButton>
        )}
        <SquareButton onClick={() => navigate("/search?type=Cat")}>
          <span>Cats</span>
          <img src={catIcon} alt="dog icon" />
        </SquareButton>
      </section>
    </div>
  );
};

export default HeroSection;
