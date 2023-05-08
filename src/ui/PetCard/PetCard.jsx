import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import PawLoader from "../PawLoader/PawLoader";
import "./PetCard.css";
import { useNavigate } from "react-router-dom";
import BadgeIcon from "@mui/icons-material/Badge";
import CakeIcon from "@mui/icons-material/Cake";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

export default function PetCard({ pet, isLoading }) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        maxWidth: 800,
        "&:hover": {
          boxShadow:
            "rgba(0, 0, 0, 0.12) 0px 1px 10px, rgba(0, 0, 0, 0.24) 0px 1px 10px",
          scale: 1.2,
        },
      }}
    >
      {isLoading ? (
        <PawLoader />
      ) : (
        <>
          <CardMedia
            sx={{ height: 210, width: 250 }}
            image={pet?.picture}
            title={pet?.name}
          />
          <CardContent className="pet-card-content">
            <div>
              <BadgeIcon />
              <span style={{ fontWeight: "400" }}>Name: </span>
              <span>{pet?.name}</span>
            </div>
            <div>
              {pet?.gender === "Male" ? <MaleIcon /> : <FemaleIcon />}
              <span style={{ fontWeight: "400" }}>Gender: </span>
              <span>{pet?.gender}</span>
            </div>
            <div>
              <CakeIcon />
              <span style={{ fontWeight: "400" }}>Age: </span>
              <span>{pet?.age}</span>
            </div>{" "}
            <div>
              <FingerprintIcon />
              <span style={{ fontWeight: "400" }}>Breed: </span>
              <span>{pet?.breed}</span>
            </div>
          </CardContent>
          <CardActions sx={{ margin: 0 }}>
            <Button size="large">Add</Button>
            <Button
              size="large"
              onClick={() => navigate(`/petpage/${pet?._id}`)}
            >
              More Info
            </Button>
          </CardActions>
        </>
      )}
    </Card>
  );
}
