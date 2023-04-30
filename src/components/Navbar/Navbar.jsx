import React, { useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import ModalComponent from "../../ui/Modal/ModalComponent";
import LoginForm from "../Login/LoginForm";
import SignupForm from "../Signup/SignupForm";
import StyledButton from "../../ui/StyleButton/StyledButton";
import Header from "../Header/Header";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleToggleForm = () => setIsLoginForm(!isLoginForm);

  return (
    <nav className="nav-container">
      <Header></Header>
      <div className="links">
        <NavLink to="/search">Find a Buddy</NavLink>
        <div className="user-nav">
          <StyledButton onClick={() => handleOpen()}>Login/Signup</StyledButton>
        </div>
      </div>
      <ModalComponent
        open={open}
        setOpen={setOpen}
        content={
          isLoginForm ? (
            <LoginForm handleToggleForm={handleToggleForm}></LoginForm>
          ) : (
            <SignupForm handleToggleForm={handleToggleForm}></SignupForm>
          )
        }
      ></ModalComponent>
    </nav>
  );
};

export default Navbar;
