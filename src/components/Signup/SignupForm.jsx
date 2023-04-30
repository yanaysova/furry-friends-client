import React, { useState } from "react";
import axios from "axios";
import { checkPasswordMatch } from "../../utilities/utilities";
import "./SignUpForm.css";
import StyledButton from "../../ui/StyleButton/StyledButton";
import TextField from "@mui/material/TextField";
import LinkButton from "../../ui/LinkButton/LinkButton";

const SignupForm = ({ handleToggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!checkPasswordMatch(password, rePassword)) {
      setErrorMessage("passwordErr");
      return;
    }
    const newUser = {
      email,
      password,
      firstName,
      lastName,
      phoneNum,
    };
    try {
      const res = await axios.post(
        "http://localhost:8080/users/signup",
        newUser
      );
      console.log(res);
      handleToggleForm();
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.response.data);
    }
  };

  return (
    <div className="signup-form">
      <div className="signup-header">
        <h1>Sign up</h1>
        <h2>Find your new buddy today!</h2>
      </div>
      <form onSubmit={(e) => handleSignUp(e)}>
        <TextField
          error={errorMessage === "userExistsErr" ? true : false}
          required
          id="standard-required"
          label="Email"
          variant="standard"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          helperText={
            errorMessage === "userExistsErr" && "Email already in use."
          }
        />
        <TextField
          error={errorMessage === "passwordErr" ? true : false}
          required
          id="standard-required"
          type="password"
          label="Password"
          variant="standard"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          error={errorMessage === "passwordErr" ? true : false}
          required
          id="standard-required"
          type="password"
          label="Confirm Password"
          variant="standard"
          autoComplete="new-password"
          onChange={(e) => setRePassword(e.target.value)}
          helperText={
            errorMessage === "passwordErr" && "Passwords don't match."
          }
        />
        <TextField
          required
          id="standard-required"
          label="First Name"
          variant="standard"
          autoComplete="given-name"
          onChange={(e) => setFirstName(e.target.value)}
        />

        <TextField
          required
          id="standard-required"
          label="Last Name"
          variant="standard"
          autoComplete="family-name"
          onChange={(e) => setLastName(e.target.value)}
        />

        <TextField
          required
          id="standard-required"
          label="Phone Number"
          variant="standard"
          type="tel"
          autoComplete="tel"
          onChange={(e) => setPhoneNum(e.target.value)}
        />
        <StyledButton type="submit">Sign Up</StyledButton>
      </form>
      <div className="signup-footer">
        <span>Already have an account?</span>
        <LinkButton onClick={() => handleToggleForm()}>Login</LinkButton>
      </div>
    </div>
  );
};

export default SignupForm;
