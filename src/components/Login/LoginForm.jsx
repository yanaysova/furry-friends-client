import React, { useState, useContext } from "react";
import { usersContextRef } from "../../context/usersContext";
import axios from "axios";
import "./LoginForm.css";
import StyledButton from "../../ui/StyleButton/StyledButton";
import TextField from "@mui/material/TextField";
import { Navigate } from "react-router";
import LinkButton from "../../ui/LinkButton/LinkButton";

const LoginForm = ({ handleToggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { setCurrentUser } = useContext(usersContextRef);

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
      setCurrentUser(res.data);
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.response.data);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
      <form className="login-form" onSubmit={(e) => handleLogin(e)}>
        <TextField
          error={errorMessage === "emailErr" ? true : false}
          required
          id="standard-required"
          label="Email"
          variant="standard"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          helperText={errorMessage === "emailErr" && "Email does not exist"}
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
          helperText={errorMessage === "passwordErr" && "Incorrect passowrd"}
        />
        <StyledButton type="submit">Login</StyledButton>
      </form>
      <div className="login-footer">
        <span>Need an account?</span>
        <LinkButton onClick={() => handleToggleForm()}>Sign up</LinkButton>
      </div>
    </div>
  );
};

export default LoginForm;
