import React, { useEffect, useState } from "react";
import "./PetPage.css";
import PawLoader from "../../ui/PawLoader/PawLoader";
import { useParams } from "react-router-dom";
import PetProfileUser from "../../components/PetProfileUser/PetProfileUser";
import { publicInstance } from "../../utilities/api";
import SnackbarAlert from "../../ui/SnackbarAlert/SnackbarAlert";

const PetPage = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [updateFeedback, setUpdateFeedback] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const handleAlert = (message, type) => {
    setUpdateFeedback(message);
    setAlertSeverity(type);
    setOpen(true);
  };

  const getPetById = async (id) => {
    setIsLoading(true);
    try {
      const res = await publicInstance.get(`/pet/${id}`);
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
      {isLoading ? (
        <PawLoader />
      ) : (
        <PetProfileUser pet={pet} handleAlert={handleAlert} />
      )}
      <SnackbarAlert
        message={updateFeedback}
        open={open}
        setOpen={setOpen}
        severityType={alertSeverity}
      />
    </div>
  );
};

export default PetPage;
