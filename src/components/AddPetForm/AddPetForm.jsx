import { useState, useContext, useEffect } from "react";
import axios from "axios";
import StyledButton from "../../ui/StyleButton/StyledButton";
import TextInput from "../../ui/TextInput/TextInput";
import Selector from "../../ui/Selector/Selector";
import RadioButtons from "../../ui/RadioButtons/RadioButtons";
import UploadButton from "../../ui/UploadButton/UploadButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import "./AddPetForm.css";

const AddPetForm = ({ handleAlert }) => {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [adoptionStatus, setAdoptionStatus] = useState("Available");
  const [picture, setPicture] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("");
  const [bio, setBio] = useState("");
  const [hypoallergenic, setHypoallergenic] = useState(false);
  const [diatery, setDiatery] = useState([]);
  const [breed, setBreed] = useState("");

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
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      // const res = await axios.post(`http://localhost:8080/pet`, PetData);
      // console.log(res);
      for (let key of PetData) {
        console.log(key, PetData[key]);
      }
      handleAlert(`${name} added successfully to database`, "success");
    } catch (error) {
      handleAlert(error.message, "error");
    }
  };

  return (
    <form className="add-pet-form" onSubmit={(e) => handleSubmit(e)}>
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
      <div className="input-box" style={{ justifyContent: "space-between" }}>
        <div style={{ width: "50%" }}>
          <Selector
            label={"Adoption Status"}
            menuItems={adoptionStatusSelector}
            state={adoptionStatus}
            setState={setAdoptionStatus}
          />
        </div>
        <UploadButton setFile={setPicture} />
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
      <TextField
        id="PetBio"
        label="Bio"
        multiline
        rows={4}
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        style={{ gridColumn: "1 / span 2", width: "60%" }}
      />
      <StyledButton type="submit">Upload Pet</StyledButton>
    </form>
  );
};

export default AddPetForm;
