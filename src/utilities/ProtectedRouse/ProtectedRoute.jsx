import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { usersContextRef } from "../../context/usersContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(usersContextRef);
  const isLoggedIn = currentUser;

  if (!isLoggedIn) {
    return (
      <>
        <Navigate to="/auth" replace />
      </>
    );
  }
  return children;
};

export default ProtectedRoute;
