import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PetPage.css";
import PawLoader from "../../ui/PawLoader/PawLoader";
import { useParams } from "react-router-dom";
import PetProfileUser from "../../components/PetProfileUser/PetProfileUser";

const PetPage = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getPetById = async (id) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`http://localhost:8080/pet/${id}`);
      const selected = res.data.data;
      setPet(selected);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getPetById(id);
  }, []);

  return (
    <div className="pet-page">
      {isLoading ? <PawLoader /> : <PetProfileUser pet={pet} />}
    </div>
  );
};

export default PetPage;
