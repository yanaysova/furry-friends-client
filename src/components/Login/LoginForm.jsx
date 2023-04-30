import React, { useState } from "react";
import "./LoginForm.css";
import StyledButton from "../../ui/StyleButton/StyledButton";
import axios from "axios";
import TextField from "@mui/material/TextField";

const LoginForm = ({ handleToggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const loggedUser = {
      email,
      password,
    };
    try {
      const res = await axios.post(
        "http://localhost:8080/users/login",
        loggedUser
      );
      console.log(res);
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.response.data);
    }
  };

  return (
    <div>
      <h1>Login Form</h1>
      {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
      <form className="login-form" onSubmit={(e) => handleLogin(e)}>
        <TextField
          error={errorMessage ? true : false}
          required
          id="standard-required"
          label="Email"
          variant="standard"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          helperText={errorMessage && `${errorMessage}`}
        />
        <TextField
          required
          id="standard-required"
          type="password"
          label="Password"
          variant="standard"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <StyledButton onClick={handleToggleForm}>Sign Up</StyledButton>
    </div>
  );
};

export default LoginForm;
