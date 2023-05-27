import React, { useEffect, useContext, useState } from "react";
import { usersContextRef } from "../../context/usersContext";
import PawLoader from "../../ui/PawLoader/PawLoader";
import { privateInstance } from "../../utilities/api";
import PetCard from "../../ui/PetCard/PetCard";
import "./MyPets.css";
import EmptyMyPets from "../../assets/empty_mypets.png";
import LinkButton from "../../ui/LinkButton/LinkButton";
import { useNavigate } from "react-router-dom";

const MyPets = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [favoritedPets, setFavoritedPets] = useState([]);
  const [adoptedPets, setAdoptedPets] = useState([]);
  const [fosteredPets, setFosteredPets] = useState([]);

  const { currentUser } = useContext(usersContextRef);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) getUserPets(currentUser.ID);
  }, [currentUser.ID]);

  const getUserPets = async (userId) => {
    setIsLoading(true);
    try {
      const res = await privateInstance.get(`/pet/user/${userId}`);
      console.log(res);
      setFavoritedPets(res.data.data.savedPets);
      setFosteredPets(res.data.data.fosteredPets);
      setAdoptedPets(res.data.data.adoptedPets);
      setIsLoading(false);
      console.log(favoritedPets);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="my-pets-wrapper">
      <h1>Your pets</h1>
      {isLoading ? (
        <PawLoader />
      ) : adoptedPets.length === 0 &&
        fosteredPets.length === 0 &&
        favoritedPets.length === 0 ? (
        <div className="no-pets">
          <h2>No pets yet! </h2>
          <LinkButton onClick={() => navigate("/search")}>
            Find your first furry friend today!
          </LinkButton>
          <img src={EmptyMyPets} alt="No pets here" />
        </div>
      ) : (
        <div className="pet-collections">
          <div>
            <h2>Currently Adopting</h2>
            {adoptedPets.length > 0 ? (
              <div className="gallery">
                {adoptedPets.map((pet) => (
                  <PetCard key={pet._id} pet={pet} isLoading={isLoading} />
                ))}
              </div>
            ) : (
              <div>
                <span>You currently don't have any adopted pets, </span>{" "}
                <LinkButton onClick={() => navigate("/search")}>
                  Adopt a pet today!
                </LinkButton>
              </div>
            )}
          </div>
          <div>
            <h2>Currently Fostering</h2>
            {fosteredPets.length > 0 ? (
              <div className="gallery">
                {fosteredPets.map((pet) => (
                  <PetCard key={pet._id} pet={pet} isLoading={isLoading} />
                ))}
              </div>
            ) : (
              <div>
                <span>You currently don't foster any pets, </span>{" "}
                <LinkButton onClick={() => navigate("/search")}>
                  Foster a pet today!
                </LinkButton>
              </div>
            )}
          </div>
          <div>
            <h2>Favorited Pets</h2>
            {favoritedPets.length > 0 ? (
              <div className="gallery">
                {favoritedPets.map((pet) => (
                  <PetCard key={pet._id} pet={pet} isLoading={isLoading} />
                ))}
              </div>
            ) : (
              <div>
                <span>You currently don't have any pets in favorites, </span>{" "}
                <LinkButton onClick={() => navigate("/search")}>
                  Browse our pet selection here!
                </LinkButton>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPets;
