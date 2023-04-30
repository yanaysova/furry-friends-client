import React, { useState } from "react";
import axios from "axios";
import { checkPasswordMatch } from "../../utilities/utilities";
import "./SignUpForm.css";
import StyledButton from "../../ui/StyleButton/StyledButton";

const SignupForm = ({ handleToggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!checkPasswordMatch(password, rePassword)) {
      alert("Passwords dont match");
      setIsPasswordMatch(false);
      return;
    }
    setIsPasswordMatch(true);
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
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.response.data);
    }
  };

  return (
    <div>
      <h1>SignUp Form</h1>
      {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
      <form className="signup-form" onSubmit={(e) => handleSignUp(e)}>
        <label>
          Email Address:
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
        </label>
        {!isPasswordMatch && (
          <span style={{ color: "red" }}>The password fields must match.</span>
        )}
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            onChange={(e) => setRePassword(e.target.value)}
            required
          />
        </label>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Phone Number:
          <input
            type="tel"
            name="phoneNumber"
            onChange={(e) => setPhoneNum(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <StyledButton onClick={() => handleToggleForm()}>Sign In</StyledButton>
    </div>
  );
};

export default SignupForm;
