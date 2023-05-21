import React, { useEffect, useContext, useState } from "react";
import { usersContextRef } from "../../context/usersContext";
import PawLoader from "../../ui/PawLoader/PawLoader";
import { privateInstance } from "../../utilities/api";
import { Tooltip } from "@mui/material";
import PetCard from "../../ui/PetCard/PetCard";
import "./MyPets.css";

const MyPets = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [favoritedPets, setFavoritedPets] = useState([]);

  const { currentUser } = useContext(usersContextRef);

  useEffect(() => {
    getUserExtendedInfo(currentUser._id);
  }, [currentUser]);

  const getUserExtendedInfo = async (userId) => {
    setIsLoading(true);
    try {
      const res = await privateInstance.get(`/user/${userId}/all`);
      setFavoritedPets(res.data.data.savedPets);
      setIsLoading(false);
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
      ) : (
        <div className="pet-collections">
          <div>
            <h2>Currently Adopting</h2>
            {favoritedPets?.map((pet) => (
              <PetCard key={pet._id} pet={pet} isLoading={isLoading} />
            ))}
          </div>
          <div>
            <h2>Currently Fostering</h2>
            {favoritedPets?.map((pet) => (
              <PetCard key={pet._id} pet={pet} isLoading={isLoading} />
            ))}
          </div>
          <div>
            <h2>Favorited Pets</h2>
            {favoritedPets?.map((pet) => (
              <PetCard key={pet._id} pet={pet} isLoading={isLoading} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPets;
