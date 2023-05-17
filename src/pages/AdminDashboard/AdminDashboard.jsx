import { useState, useContext } from "react";
import "./AdminDashboard.css";
import { usersContextRef } from "../../context/usersContext";
import TabBox from "../../ui/TabBox/TabBox";
import AddPetForm from "../../components/AddPetForm/AddPetForm";
import SnackbarAlert from "../../ui/SnackbarAlert/SnackbarAlert";
import ManageUsers from "../../components/ManageUsers/ManageUsers";
import ManagePets from "../../components/ManagePets/ManagePets";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [updateFeedback, setUpdateFeedback] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const { currentUser } = useContext(usersContextRef);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAlert = (message, type) => {
    setUpdateFeedback(message);
    setAlertSeverity(type);
    setOpen(true);
  };

  const tabs = [
    { label: "General Information", value: 0 },
    { label: "Users", value: 1 },
    { label: "Pets", value: 2 },
    { label: "Add pet", value: 3 },
    { label: "Account Settings", value: 4 },
  ];
  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <h2>Hi {currentUser?.firstName}</h2>
      <TabBox value={activeTab} handleChange={handleTabChange} tabs={tabs} />
      {activeTab === 0 && <p>General Information Content</p>}
      {activeTab === 1 && <ManageUsers handleAlert={handleAlert} />}
      {activeTab === 2 && <ManagePets handleAlert={handleAlert} />}
      {activeTab === 3 && <AddPetForm handleAlert={handleAlert} />}
      {activeTab === 4 && <p>Account Settings Content</p>}
      <SnackbarAlert
        message={updateFeedback}
        open={open}
        setOpen={setOpen}
        severityType={alertSeverity}
      />
    </div>
  );
};

export default AdminDashboard;
