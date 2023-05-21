import { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Tooltip } from "@mui/material";
import PawLoader from "../PawLoader/PawLoader";
import CakeIcon from "@mui/icons-material/Cake";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import LikeButton from "../LikeButton/LikeButton";
import "./PetCard.css";
import PetProfileUser from "../../components/PetProfileUser/PetProfileUser";
import { usersContextRef } from "../../context/usersContext";
import { privateInstance } from "../../utilities/api";

export default function PetCard({ pet, isLoading }) {
  const navigate = useNavigate();
  const [isMoreInfo, setIsMoreInfo] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const { currentUser } = useContext(usersContextRef);

  useEffect(() => {
    if (!currentUser || !pet) {
      setFavorited(false);
      return;
    }
    const inFavorites = currentUser?.savedPets?.find((id) => id === pet?._id);
    if (inFavorites) {
      setFavorited(true);
    } else {
      setFavorited(false);
    }
  }, [currentUser, pet]);

  const handleClick = () => {
    setIsMoreInfo(!isMoreInfo);
  };

  const handleLikeButton = async () => {
    if (!currentUser) {
      navigate("/auth");
    }
    if (!favorited) {
      setFavorited(true);
      try {
        await privateInstance.post(`/pet/${pet._id}/save`);
      } catch (error) {
        console.log(error);
        setFavorited(false);
      }
    } else {
      setFavorited(false);
      try {
        await privateInstance.delete(`/pet/${pet._id}/save`);
      } catch (error) {
        console.log(error);
        setFavorited(true);
      }
    }
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        maxWidth: 200,
        minWidth: 180,
        height: 280,
        margin: "16px",
        "&:hover": {
          boxShadow:
            "rgba(0, 0, 0, 0.12) 0px 1px 10px, rgba(0, 0, 0, 0.24) 0px 1px 10px",
          scale: 1.2,
        },
      }}
    >
      {!isMoreInfo ? (
        <>
          {isLoading ? (
            <PawLoader />
          ) : (
            <>
              {pet?.picture && (
                <div style={{ position: "relative" }}>
                  <CardMedia
                    sx={{
                      height: 150,
                      width: 200,
                      borderBottomLeftRadius: "50%",
                      borderBottomRightRadius: "10%",
                      cursor: "pointer",
                    }}
                    image={pet.picture}
                    title={pet.name}
                  />
                  <LikeButton
                    addLiked={handleLikeButton}
                    favorited={favorited}
                    key={favorited ? "favorited" : "not-favorited"}
                  />
                </div>
              )}
              <CardContent className="pet-card-content">
                <div className="pet-name">
                  <h3>{pet?.name}</h3>
                </div>
                <div className="card-info">
                  <div>
                    <Tooltip title="Gender">
                      {pet?.gender === "Male" ? <MaleIcon /> : <FemaleIcon />}
                    </Tooltip>
                    <span>{pet?.gender}</span>
                  </div>
                  <div>
                    <Tooltip title="Age">
                      <CakeIcon />
                    </Tooltip>
                    <span>{pet?.age}</span>
                  </div>{" "}
                  <div>
                    <Tooltip title="Breed">
                      <FingerprintIcon />
                    </Tooltip>
                    <span>{pet?.breed}</span>
                  </div>
                  <div>
                    <Tooltip title="AdoptionStatus">
                      <FingerprintIcon />
                    </Tooltip>
                    <span>{pet?.adoptionStatus}</span>
                  </div>
                </div>
              </CardContent>
            </>
          )}
        </>
      ) : (
        <>
          {isLoading ? (
            <PawLoader />
          ) : (
            <>
              <CardContent>
                <PetProfileUser pet={pet} />
              </CardContent>
            </>
          )}
        </>
      )}
    </Card>
  );
}

// export default function PetCard({ pet, isLoading }) {
//   const navigate = useNavigate();

//   return (
//     <Card
//       onClick={() => navigate(`/petpage/${pet?._id}`)}
//       sx={{
//         maxWidth: 250,
//         minWidth: 180,
//         margin: "16px",
//         "&:hover": {
//           boxShadow:
//             "rgba(0, 0, 0, 0.12) 0px 1px 10px, rgba(0, 0, 0, 0.24) 0px 1px 10px",
//           scale: 1.2,
//         },
//       }}
//     >
//       {isLoading ? (
//         <PawLoader />
//       ) : (
//         <>
//           {pet?.picture && (
//             <div style={{ position: "relative" }}>
//               <CardMedia
//                 sx={{
//                   height: 210,
//                   width: 250,
//                   borderBottomLeftRadius: "50%",
//                   borderBottomRightRadius: "10%",
//                   cursor: "pointer",
//                 }}
//                 image={pet.picture}
//                 title={pet.name}
//               />
//               <LikeButton />
//             </div>
//           )}
//           <CardContent className="pet-card-content">
//             <div className="pet-name">
//               <h3>{pet?.name}</h3>
//             </div>
//             <div className="card-info">
//               <div>
//                 <Tooltip title="Gender">
//                   {pet?.gender === "Male" ? <MaleIcon /> : <FemaleIcon />}
//                 </Tooltip>
//                 <span>{pet?.gender}</span>
//               </div>
//               <div>
//                 <Tooltip title="Age">
//                   <CakeIcon />
//                 </Tooltip>
//                 <span>{pet?.age}</span>
//               </div>{" "}
//               <div>
//                 <Tooltip title="Breed">
//                   <FingerprintIcon />
//                 </Tooltip>
//                 <span>{pet?.breed}</span>
//               </div>
//               <div>
//                 <Tooltip title="AdoptionStatus">
//                   <FingerprintIcon />
//                 </Tooltip>
//                 <span>{pet?.adoptionStatus}</span>
//               </div>
//             </div>
//           </CardContent>
//         </>
//       )}
//     </Card>
//   );
// }
