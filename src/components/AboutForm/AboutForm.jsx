import { useState, useContext, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import TextInput from "../../ui/TextInput/TextInput";
import StyledButton from "../../ui/StyleButton/StyledButton";
import { usersContextRef } from "../../context/usersContext";
import "./AboutForm.css";

const AboutForm = ({ handleAlert }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [bio, setBio] = useState("");
  const { currentUser, setCurrentUser } = useContext(usersContextRef);

  useEffect(() => {
    setFirstName(currentUser.firstName);
    setLastName(currentUser.lastName);
    setPhoneNum(currentUser.phoneNum);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        ...currentUser,
        firstName,
        lastName,
        phoneNum,
        ...(bio !== "A little about you" && { bio }),
      };
      const res = await axios.put(
        `http://localhost:8080/user/${currentUser.id}`,
        updatedUser
      );
      setCurrentUser(res.data);
      handleAlert("your information updated successfully", "success");
    } catch (error) {
      console.log(error);
      handleAlert(error.message, "error");
    }
  };

  return (
    <form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
      <TextInput
        className="form-field"
        type={"text"}
        label={"First Name"}
        isRequiered={false}
        value={firstName}
        setState={setFirstName}
      />
      <TextInput
        className="form-field"
        label={"Last Name"}
        type={"text"}
        isRequiered={false}
        value={lastName}
        setState={setLastName}
      />
      <TextInput
        className="form-field"
        label={"Phone Number"}
        type={"tel"}
        isRequiered={false}
        value={phoneNum}
        setState={setPhoneNum}
      />
      <TextField
        id="UserBio"
        label="Bio"
        multiline
        rows={4}
        value={bio ? bio : "A little about you"}
        onChange={(e) => setBio(e.target.value)}
      />
      <StyledButton type="submit">Save Changes</StyledButton>
    </form>
  );
};

export default AboutForm;
