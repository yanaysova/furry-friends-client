import React, { useState, useContext, useEffect } from "react";
import "./PetProfileUser.css";
import { usersContextRef } from "../../context/usersContext";
import PawLoader from "../../ui/PawLoader/PawLoader";
import { Divider } from "@mui/material";
import { privateInstance } from "../../utilities/api";
import { useNavigate } from "react-router-dom";
import adopt from "../../assets/adopt.png";
import foster from "../../assets/foster.png";
import returnPet from "../../assets/return.png";

const PetProfileUser = ({ pet, handleAlert }) => {
  const [isFostering, setIsFostering] = useState(false);
  const [isAdopting, setIsAdopting] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [status, setStatus] = useState("");

  const { currentUser } = useContext(usersContextRef);

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || !pet) {
      setFavorited(false);
      return;
    }
    setStatus(adoptionStatus);
    const inFavorites = currentUser?.savedPets?.find((id) => id === pet?._id);
    if (inFavorites) {
      setFavorited(true);
    } else {
      setFavorited(false);
    }
    const adopted = currentUser?.adoptedPets?.find((id) => id === pet?._id);
    if (adopted) {
      setIsAdopting(true);
    } else {
      setIsAdopting(false);
    }
    const fostered = currentUser?.fosteredPets?.find((id) => id === pet?._id);
    if (fostered) {
      setIsFostering(true);
    } else {
      setIsFostering(false);
    }
  }, [currentUser, pet]);

  // const handleLikeButton = async () => {
  //   if (!currentUser) {
  //     navigate("/auth");
  //   }
  //   if (!favorited) {
  //     setFavorited(true);
  //     try {
  //       await privateInstance.post(`/pet/${pet._id}/save`);
  //     } catch (error) {
  //       console.log(error);
  //       setFavorited(false);
  //     }
  //   } else {
  //     setFavorited(false);
  //     try {
  //       await privateInstance.delete(`/pet/${pet._id}/save`);
  //     } catch (error) {
  //       console.log(error);
  //       setFavorited(true);
  //     }
  //   }
  // };

  if (!pet) {
    return <PawLoader />;
  }

  const {
    _id,
    name,
    age,
    gender,
    adoptionStatus,
    height,
    weight,
    color,
    bio,
    hypoallergenic,
    dietaryRestrictions,
    breed,
    picture,
  } = pet;

  const handleFoster = async () => {
    if (!currentUser) {
      navigate("/auth");
    }
    try {
      await privateInstance.post(`/pet/${_id}/adopt`, {
        status: "Fostered",
      });
      setIsFostering(!isFostering);
      setIsAdopting(false);
      setStatus("Fostered");
      handleAlert(`${name} fostered successfully`, "success");
    } catch (error) {
      console.log(error);
      handleAlert(error.response.data.message, "error");
    }
  };

  const handleAdopt = async () => {
    if (!currentUser) {
      navigate("/auth");
    }
    try {
      await privateInstance.post(`/pet/${_id}/adopt`, {
        status: "Adopted",
      });
      setIsFostering(false);
      setIsAdopting(true);
      handleAlert(`${name} adopted successfully`, "success");
      setStatus("Adopted");
    } catch (error) {
      console.log(error);
      handleAlert(error.response.data.message, "error");
    }
  };

  const handleReturn = async () => {
    if (!currentUser) {
      navigate("/auth");
    }
    try {
      await privateInstance.post(`/pet/${_id}/return`);
      setIsFostering(false);
      setIsAdopting(false);
      setStatus("Available");
      handleAlert(`${name} pet returned to Furry Friends`, "success");
    } catch (error) {
      console.log(error);
      handleAlert(error.response.data.message, "error");
    }
  };

  return (
    <div className="pet-wrapper">
      <div className="photo-wrapper">
        <img src={picture} alt={name} />
        <h2>Adoption Status: {status}</h2>
      </div>
      <div className="pet-information">
        <div className="text-fields">
          <h1>{name}</h1>
          <h2>{breed}</h2>
          <p>
            {age} &#183; {gender} &#183; {color}
          </p>
          <Divider />
          <p>
            {height} cm &#183; {weight} kg
          </p>
          <Divider />
          <p>Hypoallergenic: {hypoallergenic ? "Yes" : "No"}</p>
          <p>
            Dietary Restrictions:{" "}
            {dietaryRestrictions ? dietaryRestrictions : "None"}
          </p>
        </div>
        <div className="about">
          <h2>About {name}...</h2>
          <p>{bio}</p>
        </div>
      </div>
      <div className="button-container">
        {adoptionStatus === "Adopted" && !isAdopting ? null : (
          <>
            {isFostering ? (
              <>
                <button className="adopt" onClick={handleAdopt}>
                  Adopt <img src={adopt} alt="adopt icon"></img>
                </button>
                <button className="return" onClick={handleReturn}>
                  Return Pet <img src={returnPet} alt="return icon"></img>
                </button>
              </>
            ) : isAdopting ? (
              <button className="return" onClick={handleReturn}>
                Return Pet <img src={returnPet} alt="return icon"></img>
              </button>
            ) : (
              <>
                <button className="foster" onClick={handleFoster}>
                  Foster <img src={foster} alt="foster icon"></img>
                </button>
                <button className="adopt" onClick={handleAdopt}>
                  Adopt <img src={adopt} alt="adopt icon"></img>
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PetProfileUser;
