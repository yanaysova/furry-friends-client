import React, { useEffect, useState } from "react";
import "./NewAdditions.css";
import PetCard from "../../ui/PetCard/PetCard";
import { publicInstance } from "../../utilities/api";

const NewAdditions = () => {
  const [newAdditionsArray, setNewAdditionsArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //Gets the 3 most recently added pets
  useEffect(() => {
    const getNewPets = async () => {
      setIsLoading(true);
      try {
        const res = await publicInstance.get("/pet/3-newest-additions");
        const pets = await res.data.data.results;
        setNewAdditionsArray(pets);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getNewPets();
  }, []);

  return (
    <div className="new-additions">
      <h2>Meet Our Latest Furry Friends!</h2>
      <div className="card-gallery">
        <PetCard pet={newAdditionsArray[0]} isLoading={isLoading}></PetCard>
        <PetCard pet={newAdditionsArray[1]} isLoading={isLoading}></PetCard>
        <PetCard pet={newAdditionsArray[2]} isLoading={isLoading}></PetCard>
      </div>
    </div>
  );
};

export default NewAdditions;
