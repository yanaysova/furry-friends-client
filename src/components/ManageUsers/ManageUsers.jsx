import React, { useState, useEffect } from "react";
import { privateInstance } from "../../utilities/api.js";
import DataTable from "../../ui/DataTable/DataTable.jsx";
import UserProfile from "../UserProfile/UserProfile.jsx";

const ManageUsers = ({ handleAlert }) => {
  const [userList, setUserList] = useState([]);
  const [isEditPage, setIsEditPage] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    const getUsersList = async () => {
      try {
        const res = await privateInstance.get("/user");
        const users = await res.data.data.results;
        setUserList(users);
      } catch (error) {
        handleAlert(error.response.data.message, "error");
      }
    };
    getUsersList();
  }, []);

  const handleSearch = async (event) => {
    const query = event.target.value;
    try {
      console.log(query);
      const res = await privateInstance.get(`/user?firstName=${query}`);
      console.log(res);
      const users = await res.data.data.results;
      setUserList(users);
    } catch (error) {
      handleAlert(error.response.data.message, "error");
    }
  };

  const handleEditPage = (user) => {
    setIsEditPage(!isEditPage);
    setSelectedUser(user);
  };

  const userColumns = [
    { field: "_id", headerName: "ID" },
    { field: "firstName", headerName: "First Name" },
    { field: "lastName", headerName: "Last Name" },
    { field: "email", headerName: "Email" },
    { field: "isAdmin", headerName: "Is Admin?" },
    { field: "createdAt", headerName: "Created At" },
  ];

  return (
    <>
      {isEditPage ? (
        <UserProfile
          selectedUser={selectedUser}
          handleEditPage={handleEditPage}
        />
      ) : (
        <div>
          <h1>users</h1>
          <input type="text" onChange={handleSearch} />
          <DataTable
            data={userList}
            columns={userColumns}
            handleEditPage={handleEditPage}
          />
        </div>
      )}
    </>
  );
};

export default ManageUsers;
