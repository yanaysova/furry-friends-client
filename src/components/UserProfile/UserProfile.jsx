import React, { useContext, useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StyledButton from "../../ui/StyleButton/StyledButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { privateInstance } from "../../utilities/api";
import "./UserProfile.css";
import ConfirmationModal from "../../ui/ConfirmationModal/ConfirmationModal";
import { usersContextRef } from "../../context/usersContext";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import PawLoader from "../../ui/PawLoader/PawLoader";

const UserProfile = ({ selectedUser, handleEditPage }) => {
  const [userInfo, setUserInfo] = useState("");
  const [favoritedPets, setFavoritedPets] = useState([]);
  const [fosteredPets, setFosteredPets] = useState([]);
  const [adoptedPets, setAdoptedPets] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(usersContextRef);
  const navigate = useNavigate();

  const PromoteConfirmation =
    "Promote user to admin role? Admins can add, edit, delete pets, and promote other admins";

  const DemoteConfirmation = "Demote admin to user role?";

  useEffect(() => {
    if (selectedUser._id) {
      getUserExtendedInfo(selectedUser._id);
    }
  }, [selectedUser]);

  const getUserExtendedInfo = async (userId) => {
    setIsLoading(true);
    try {
      const res = await privateInstance.get(`/user/${userId}/all`);
      setUserInfo(res.data.data);
      setFavoritedPets(res.data.data.savedPets);
      setFosteredPets(res.data.data.fosteredPets);
      setAdoptedPets(res.data.data.adoptedPets);
      console.log(adoptedPets);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleChangeRole = async () => {
    toggleModal();
    try {
      const role = !userInfo.isAdmin;
      await privateInstance.put(`/user/${selectedUser._id}/role`, {
        isAdmin: role,
      });
      const updatedUser = {
        ...userInfo,
        isAdmin: role,
      };
      setUserInfo(updatedUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="user-wrapper">
      {isLoading ? (
        <PawLoader />
      ) : (
        <>
          <h2>
            {userInfo?.firstName} {userInfo?.lastName}
          </h2>
          <h3>ID: {userInfo?._id}</h3>
          <div className="info-wrapper">
            <div>
              <h4>User Information</h4>
              <ul className="user-info">
                <li>
                  <strong>ID:</strong> {userInfo?._id}
                </li>
                <li>
                  <strong>First name:</strong> {userInfo?.firstName}
                </li>
                <li>
                  <strong>Last name:</strong> {userInfo?.lastName}
                </li>
                <li>
                  <strong>Email address:</strong> {userInfo?.email}
                </li>
                <li>
                  <strong>Phone number:</strong> {userInfo?.phoneNum}
                </li>
                <li>
                  <strong>Created at:</strong>
                  {new Date(userInfo?.createdAt).toLocaleString()}
                </li>
                <li>
                  <strong>Role:</strong> {userInfo.isAdmin ? "Admin" : "User"}
                </li>
                {userInfo._id !== currentUser._id && (
                  <button className="role-btn" onClick={toggleModal}>
                    {userInfo.isAdmin
                      ? "Demote to user"
                      : "Promote user to admin"}
                  </button>
                )}
              </ul>
            </div>
            <div className="user-pets">
              <div>
                <h4>Favorited Pets</h4>
                <ul>
                  {favoritedPets &&
                    favoritedPets.map((pet) => {
                      return (
                        <li key={pet._id}>
                          {pet.name}
                          <Tooltip title="Open pet profile page in a new tab">
                            <button
                              className="pet-btn"
                              onClick={() =>
                                window.open(`/petpage/${pet._id}`, "_blank")
                              }
                            >
                              <OpenInNewOutlinedIcon
                                fontSize="inherit"
                                color="info"
                              />
                            </button>
                          </Tooltip>
                          <br></br> <strong>ID:</strong> {pet._id}
                        </li>
                      );
                    })}
                </ul>
              </div>
              <div>
                <h4>Fostered Pets</h4>
                <ul>
                  {fosteredPets &&
                    fosteredPets.map((pet) => {
                      return (
                        <li key={pet._id}>
                          {pet.name}
                          <Tooltip title="Open pet profile page in a new tab">
                            <button
                              className="pet-btn"
                              onClick={() =>
                                window.open(`/petpage/${pet._id}`, "_blank")
                              }
                            >
                              <OpenInNewOutlinedIcon
                                fontSize="inherit"
                                color="info"
                              />
                            </button>
                          </Tooltip>
                          <br></br> <strong>ID:</strong> {pet._id}
                        </li>
                      );
                    })}
                </ul>
              </div>
              <div>
                <h4>Adopted Pets</h4>
                <ul>
                  {adoptedPets &&
                    adoptedPets.map((pet) => {
                      return (
                        <li key={pet._id}>
                          {pet.name}
                          <Tooltip title="Open pet profile page in a new tab">
                            <button
                              className="pet-btn"
                              onClick={() =>
                                window.open(`/petpage/${pet._id}`, "_blank")
                              }
                            >
                              <OpenInNewOutlinedIcon
                                fontSize="inherit"
                                color="info"
                              />
                            </button>
                          </Tooltip>
                          <br></br> <strong>ID:</strong> {pet._id}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
          <Tooltip title="Back to list">
            <StyledButton onClick={() => handleEditPage("")}>
              <ArrowBackIcon fontSize="large" />
            </StyledButton>
          </Tooltip>
          <ConfirmationModal
            openState={isOpenModal}
            toggleHandler={toggleModal}
            onConfirmation={handleChangeRole}
            content={
              userInfo.isAdmin ? DemoteConfirmation : PromoteConfirmation
            }
          ></ConfirmationModal>
        </>
      )}
    </div>
  );
};

export default UserProfile;
