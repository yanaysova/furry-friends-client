import { useState, useEffect } from "react";
import { privateInstance } from "../../utilities/api.js";
import DataTable from "../../ui/DataTable/DataTable.jsx";
import AddPetForm from "../AddPetForm/AddPetForm.jsx";

const ManagePets = ({ handleAlert }) => {
  const [petsList, setPetsList] = useState([]);
  const [isEditPage, setIsEditPage] = useState(false);
  const [selectedPet, setSelectedPet] = useState("");

  useEffect(() => {
    const getPetsList = async () => {
      try {
        const res = await privateInstance.get("/pet?limit=100");
        const pets = await res.data.data.results;
        console.log(pets);
        setPetsList(pets);
      } catch (error) {
        console.log(error);
      }
    };
    getPetsList();
  }, []);

  const handleSearch = async (event) => {
    const query = event.target.value;
    try {
      console.log(query);
      const res = await privateInstance.get(`/pets?type=${query}`);
      console.log(res);
      const pets = await res.data.data.results;
      setPetsList(pets);
    } catch (error) {
      console.log(error);
    }
  };

  const petsColumns = [
    { field: "_id", headerName: "ID" },
    { field: "type", headerName: "Type" },
    { field: "name", headerName: "Name" },
    { field: "gender", headerName: "Gender" },
    { field: "age", headerName: "Age" },
    { field: "breed", headerName: "Breed" },
    { field: "adoptionStatus", headerName: "Adoption Status" },
    { field: "createdAt", headerName: "Created At" },
  ];

  const handleEditPage = (pet) => {
    setIsEditPage(!isEditPage);
    setSelectedPet(pet);
  };

  return (
    <>
      {isEditPage ? (
        <AddPetForm
          selectedPet={selectedPet}
          handleEditPage={handleEditPage}
          handleAlert={handleAlert}
        />
      ) : (
        <div>
          <h1>Pets</h1>
          <input type="text" onChange={handleSearch} />
          <DataTable
            data={petsList}
            columns={petsColumns}
            handleEditPage={handleEditPage}
          />
        </div>
      )}
    </>
  );
};

export default ManagePets;
