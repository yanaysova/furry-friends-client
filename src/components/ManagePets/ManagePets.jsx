import { useState, useEffect } from "react";
import { privateInstance } from "../../utilities/api.js";
import DataTable from "../../ui/DataTable/DataTable.jsx";
import AddPetForm from "../AddPetForm/AddPetForm.jsx";
import Selector from "../../ui/Selector/Selector.jsx";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "./ManagePets.css";

const ManagePets = ({ handleAlert }) => {
  const [petsList, setPetsList] = useState([]);
  const [isEditPage, setIsEditPage] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedPet, setSelectedPet] = useState("");
  const [searchByField, setSearchByField] = useState("name");
  const [searchByType, setSearchByType] = useState("Both");
  const [isInactiveIncluded, setIsInactiveIncluded] = useState(false);

  const searchByOptions = [
    { label: "Name", value: "name" },
    { label: "breed", value: "breed" },
  ];

  const typeSelector = [
    { label: "Both", value: "Both" },
    { label: "Dog", value: "Dog" },
    { label: "Cat", value: "Cat" },
  ];

  useEffect(() => {
    const getPetsList = async () => {
      try {
        const res = await privateInstance.get("/pet?limit=100");
        const pets = await res.data.data.results;
        setPetsList(pets);
      } catch (error) {
        console.log(error);
      }
    };
    getPetsList();
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const res = await privateInstance.get("/pet", {
          params: {
            [searchByField]: searchInput,
            type: searchByType === "Both" ? "" : searchByType,
            includeInactive: isInactiveIncluded,
          },
        });
        const pets = await res.data.data.results;
        setPetsList(pets);
      } catch (error) {
        console.log(error);
      }
    };
    handleSearch();
  }, [searchInput, searchByType, searchByField, isInactiveIncluded]);

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
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Selector
              label={"Search by"}
              menuItems={searchByOptions}
              state={searchByField}
              setState={setSearchByField}
            ></Selector>
            <Selector
              label={"Filter by type"}
              menuItems={typeSelector}
              state={searchByType}
              setState={setSearchByType}
            />
            <FormControlLabel
              labelPlacement="start"
              control={
                <Checkbox
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                  onChange={(event) =>
                    setIsInactiveIncluded(event.target.checked)
                  }
                />
              }
              label="Include Inactive Pets"
            />
          </div>
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
