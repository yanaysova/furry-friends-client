import React, { useState } from "react";
import "./PetProfileUser.css";

const PetProfileUser = ({ pet }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isFostering, setIsFostering] = useState(false);
  const [isAdopted, setIsAdopted] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  if (!pet) {
    return <div>Loading...</div>;
  }

  const {
    name,
    type,
    adoptionStatus,
    picture,
    height,
    weight,
    color,
    bio,
    hypoallergenic,
    dietaryRestrictions,
    breed,
  } = pet;

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleFoster = () => {
    setIsFostering(!isFostering);
    setIsAdopted(false);
  };

  const handleAdopt = () => {
    setIsAdopted(!isAdopted);
    setIsFostering(false);
  };

  const handleReturn = () => {
    setIsAdopted(false);
    setIsFostering(false);
  };

  return (
    <div className="pet-card">
      <h1>{name}</h1>
      <img src={picture} alt={name} />
      <p>Type: {type}</p>
      <p>Adoption Status: {adoptionStatus}</p>
      <p>Height: {height} inches</p>
      <p>Weight: {weight} lbs</p>
      <p>Color: {color}</p>
      <p>Breed: {breed}</p>
      <p>Bio: {bio}</p>
      <p>Hypoallergenic: {hypoallergenic ? "Yes" : "No"}</p>
      <p>Dietary Restrictions: {dietaryRestrictions}</p>
      {isOwner ? (
        <button className="return" onClick={handleReturn}>
          Return Pet
        </button>
      ) : (
        <div className="button-container">
          {isFostering ? (
            <button className="adopt" onClick={handleAdopt}>
              Adopt
            </button>
          ) : (
            <button className="foster" onClick={handleFoster}>
              Foster
            </button>
          )}
          <button
            className={`save ${isSaved ? "saved" : ""}`}
            onClick={handleSave}
          >
            {isSaved ? "Unsave" : "Save for Later"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PetProfileUser;
