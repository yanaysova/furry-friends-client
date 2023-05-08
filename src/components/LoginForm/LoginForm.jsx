import React, { useState, useContext } from "react";
import { usersContextRef } from "../../context/usersContext";
import axios from "axios";
import "./LoginForm.css";
import StyledButton from "../../ui/StyleButton/StyledButton";
import LinkButton from "../../ui/LinkButton/LinkButton";
import TextInput from "../../ui/TextInput/TextInput";

const LoginForm = ({ handleToggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { setCurrentUser, setIsAdmin } = useContext(usersContextRef);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const loggedUser = {
      email,
      password,
    };
    try {
      const res = await axios.post(
        "http://localhost:8080/user/login",
        loggedUser
      );
      const { user } = res.data;
      console.log(user.isAdmin);
      setCurrentUser(user);
      setIsAdmin(user.isAdmin);
    } catch (error) {
      setErrorMessage(error.response.data);
    }
  };

  return (
    <div>
      <div className="login-header">
        <h1>Login</h1>
        <h2>Welcome back</h2>
      </div>
      <form className="login-form" onSubmit={(e) => handleLogin(e)}>
        <TextInput
          errMessage={errorMessage}
          errCode={"emailErr"}
          label={"Email"}
          type={"Email"}
          autoComp={"Email"}
          setState={setEmail}
          errText={"Email does not exist"}
        />
        <TextInput
          errMessage={errorMessage}
          errCode={"passwordErr"}
          label={"Password"}
          type={"Password"}
          autoComp={"current-password"}
          setState={setPassword}
          errText={"Incorrect passowrd"}
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
