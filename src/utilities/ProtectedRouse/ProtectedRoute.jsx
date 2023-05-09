import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { usersContextRef } from "../../context/usersContext";

const ProtectedRoute = ({ children, role }) => {
  const { isAdmin, currentUser } = useContext(usersContextRef);

  if (
    (role === "admin" && !isAdmin) ||
    (role === "user" && !currentUser) ||
    (!isAdmin && !currentUser)
  ) {
    return (
      <>
        <Navigate to="/auth" replace />
      </>
    );
  }

  return children;
};

export default ProtectedRoute;
