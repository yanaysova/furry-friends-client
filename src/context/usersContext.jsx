import { createContext, useState, useEffect } from "react";
import { publicInstance } from "../utilities/api";
export const usersContextRef = createContext();

export const UsersContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isAdmin, setIsAdmin] = useState(false);

  const validateAccessToken = async (token) => {
    try {
      const response = await publicInstance.get("/auth/validate", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error validating access token:", error);
      return { valid: false };
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      validateAccessToken(token).then(({ valid, user }) => {
        if (valid) {
          setCurrentUser(user);
          setIsAdmin(user.isAdmin);
        } else {
          localStorage.removeItem("token");
        }
      });
    }
  }, []);

  //Logs user out

  //Checks current user on load

  //Saves user to current user

  return (
    <usersContextRef.Provider
      value={{
        currentUser,
        setCurrentUser,
        setIsAdmin,
        isAdmin,
      }}
    >
      {children}
    </usersContextRef.Provider>
  );
};
