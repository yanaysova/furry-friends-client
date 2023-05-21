import { useState } from "react";
import { uploadInstance } from "../../utilities/api";
import StyledButton from "../../ui/StyleButton/StyledButton";
import TextInput from "../../ui/TextInput/TextInput";
import Selector from "../../ui/Selector/Selector";
import RadioButtons from "../../ui/RadioButtons/RadioButtons";
import UploadButton from "../../ui/UploadButton/UploadButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import "./AddPetForm.css";
import EditPhoto from "../../ui/EditPhoto/EditPhoto";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Tooltip } from "@mui/material";

const AddPetForm = ({ handleAlert, selectedPet, handleEditPage }) => {
  const [type, setType] = useState(selectedPet?.type || "");
  const [name, setName] = useState(selectedPet?.name || "");
  const [gender, setGender] = useState(selectedPet?.gender || "");
  const [age, setAge] = useState(selectedPet?.age || "");
  const [adoptionStatus, setAdoptionStatus] = useState(
    selectedPet?.adoptionStatus || "Available"
  );
  const [picture, setPicture] = useState(selectedPet?.picture || "");
  const [height, setHeight] = useState(selectedPet?.height || "");
  const [weight, setWeight] = useState(selectedPet?.weight || "");
  const [color, setColor] = useState(selectedPet?.color || "");
  const [bio, setBio] = useState(selectedPet?.bio || "");
  const [hypoallergenic, setHypoallergenic] = useState(
    selectedPet?.hypoallergenic || false
  );
  const [diatery, setDiatery] = useState(selectedPet?.diatery || []);
  const [breed, setBreed] = useState(selectedPet?.breed || "");
  const [isEmpty, setIsEmpty] = useState(false);

  const typeSelector = [
    { label: "Dog", value: "Dog" },
    { label: "Cat", value: "Cat" },
  ];

  const genderSelector = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  const adoptionStatusSelector = [
    { label: "Available", value: "Available" },
    { label: "Adopted", value: "Adopted" },
    { label: "Fostered", value: "Fostered" },
    { label: "Inactive", value: "Inactive" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!picture) {
      setIsEmpty(true);
      return;
    }
    try {
      const PetData = new FormData();
      PetData.append("type", type);
      PetData.append("name", name);
      PetData.append("picture", picture);
      PetData.append("gender", gender);
      PetData.append("age", age);
      PetData.append("adoptionStatus", adoptionStatus);
      PetData.append("height", height);
      PetData.append("weight", weight);
      PetData.append("color", color);
      PetData.append("bio", bio);
      PetData.append("hypoallergenic", hypoallergenic);
      PetData.append("diatery", diatery);
      PetData.append("breed", breed);
      if (selectedPet) {
        await uploadInstance.patch(`/pet/${selectedPet._id}`, PetData);
        handleAlert(`${name} successfully updated`, "success");
      } else {
        console.log(picture);
        await uploadInstance.post(`/pet`, PetData);
        handleAlert(`${name} added successfully to database`, "success");
      }
    } catch (error) {
      if (error.response) {
        handleAlert(error.response.data.message, "error");
      } else {
        handleAlert(error.message, "error");
      }
    }
  };

  //TODO: Implement delete?
  const handleDelete = async () => {
    try {
      await uploadInstance.delete(`/pet/${selectedPet._id}`);
      handleAlert(`${name} successfully deleted from database`, "success");
    } catch (error) {
      handleAlert(error.message, "error");
    }
  };

  return (
    <>
      <form
        className="add-pet-form"
        encType="multipart/form-data"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="input-box">
          <TextInput
            type={"text"}
            label={"Name"}
            isRequiered={true}
            value={name}
            setState={setName}
          />
          <TextInput
            type={"number"}
            label={"Age"}
            isRequiered={true}
            value={age}
            setState={setAge}
          />
        </div>
        <div className="input-box">
          <RadioButtons
            label={"Type"}
            menuItems={typeSelector}
            state={type}
            setState={setType}
          />
          <RadioButtons
            label={"Gender"}
            menuItems={genderSelector}
            state={gender}
            setState={setGender}
          />
        </div>
        <div className="input-box">
          <TextInput
            type={"text"}
            label={"Color"}
            isRequiered={true}
            value={color}
            setState={setColor}
          />
          <TextInput
            type={"text"}
            label={"Breed"}
            isRequiered={true}
            value={breed}
            setState={setBreed}
          />
        </div>
        <div className="input-box">
          <TextInput
            type={"number"}
            label={"Height"}
            isRequiered={true}
            value={height}
            setState={setHeight}
          />
          <TextInput
            type={"number"}
            label={"Weight"}
            isRequiered={true}
            value={weight}
            setState={setWeight}
          />
        </div>
        {/* TODO: Update user name for adopted and fostered */}
        <div className="input-box" style={{ justifyContent: "space-between" }}>
          {selectedPet ? (
            <div className="admin-pet-info">
              {selectedPet.adoptionStatus === "Available" && (
                <span>Adoption Status: Available</span>
              )}
              {selectedPet.adoptionStatus === "Adopted" && (
                <span>Adopted by Admin</span>
              )}
              {selectedPet.adoptionStatus === "Fostered" && (
                <span>Fostered by Admin</span>
              )}
              <span>Created by: {selectedPet.createdBy}</span>
              <span>
                Created at: {new Date(selectedPet.createdAt).toLocaleString()}
              </span>
              {selectedPet.editedAt && (
                <span>
                  Last Edited at:{" "}
                  {new Date(selectedPet.editedAt).toLocaleString()}
                </span>
              )}
            </div>
          ) : (
            <div style={{ width: "50%" }}>
              <Selector
                label={"Adoption Status"}
                menuItems={adoptionStatusSelector}
                state={adoptionStatus}
                setState={setAdoptionStatus}
              />
            </div>
          )}
          <div>
            {!selectedPet && (
              <UploadButton
                setFile={setPicture}
                setIsEmpty={setIsEmpty}
                isEmpty={isEmpty}
              />
            )}
          </div>
        </div>
        <div className="input-box">
          <TextInput
            type={"text"}
            label={"Diatery Requirements"}
            isRequiered={false}
            value={diatery}
            setState={setDiatery}
          />
          <FormControlLabel
            labelPlacement="start"
            control={
              <Checkbox
                sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                onChange={(e) => setHypoallergenic(e.target.checked)}
              />
            }
            label="Hypoallergenic"
          />
        </div>
        <div
          style={{
            gridColumn: "1 / span 2",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextField
            id="PetBio"
            label="Bio"
            multiline
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            style={{ width: "60%" }}
          />
          {selectedPet && (
            <div
              style={{
                width: "40%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <EditPhoto imageUrl={selectedPet.picture} setFile={setPicture} />
            </div>
          )}
        </div>
        <StyledButton type="submit">
          {selectedPet ? "Update Changes" : "Upload Pet"}
        </StyledButton>
        {/* TODO: Implement delete pet? needs to delete from user favorites and adopted status */}
        {/* {selectedPet && (
          <StyledButton onClick={handleDelete}>Delete Pet</StyledButton>
        )} */}
      </form>
      {selectedPet && (
        <Tooltip title="Back to list">
          <StyledButton onClick={() => handleEditPage("")}>
            <ArrowBackIcon fontSize="large" />
          </StyledButton>
        </Tooltip>
      )}
    </>
  );
};

export default AddPetForm;
