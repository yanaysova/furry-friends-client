import React, { useContext, useEffect, useState } from "react";
import ModalComponent from "../../ui/Modal/ModalComponent";
import LoginForm from "../LoginForm/LoginForm";
import SignupForm from "../SignupForm/SignupForm";
import { usersContextRef } from "../../context/usersContext";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ openAuthModal, setOpenAuthModal }) => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const { currentUser } = useContext(usersContextRef);

  const handleToggleForm = () => setIsLoginForm(!isLoginForm);
  const navigate = useNavigate();

  // Closes modal on login
  useEffect(() => {
    if (currentUser) {
      setOpenAuthModal(false);
      handleClose();
    }
  }, [currentUser, setOpenAuthModal]);

  const handleClose = () => {
    navigate("/");
  };

  return (
    <ModalComponent
      open={openAuthModal}
      setOpen={setOpenAuthModal}
      handleClose={handleClose}
      content={
        isLoginForm ? (
          <LoginForm handleToggleForm={handleToggleForm}></LoginForm>
        ) : (
          <SignupForm handleToggleForm={handleToggleForm}></SignupForm>
        )
      }
    ></ModalComponent>
  );
};

export default AuthModal;
