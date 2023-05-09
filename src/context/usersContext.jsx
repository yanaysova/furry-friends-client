import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const usersContextRef = createContext();

export const UsersContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("Token") || "");
  const [isAdmin, setIsAdmin] = useState(false);

  // const headerConfig = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (token) {
      setToken(localToken);
    }
  }, [token]);

  const getAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/users");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  //Logs user out

  //Checks current user on load

  //Saves user to current user

  return (
    <usersContextRef.Provider
      value={{
        currentUser,
        setCurrentUser,
        getAllUsers,
        setIsAdmin,
        isAdmin,
      }}
    >
      {children}
    </usersContextRef.Provider>
  );
};
