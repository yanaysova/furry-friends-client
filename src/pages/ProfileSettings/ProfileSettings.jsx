import React, { useState } from "react";
import AboutForm from "../../components/AboutForm/AboutForm";
import { usersContextRef } from "../../context/usersContext";
import { useContext } from "react";
import AccountForm from "../../components/AccoutForm/AccountForm";
import SnackbarAlert from "../../ui/SnackbarAlert/SnackbarAlert";
import "./ProfileSettings.css";
import TabBox from "../../ui/TabBox/TabBox";

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [updateFeedback, setUpdateFeedback] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const { currentUser, setCurrentUser } = useContext(usersContextRef);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const tabs = [
    { label: "About Me", value: 0 },
    { label: "Account Settings", value: 1 },
  ];

  const handleAlert = (message, type) => {
    setUpdateFeedback(message);
    setAlertSeverity(type);
    setOpen(true);
  };

  return (
    <div className="profile-page">
      <h1>
        Hi {currentUser.firstName} {currentUser.lastName}
      </h1>
      <TabBox value={activeTab} handleChange={handleTabChange} tabs={tabs} />
      {activeTab === 0 && <AboutForm handleAlert={handleAlert} />}
      {activeTab === 1 && <AccountForm handleAlert={handleAlert} />}
      <SnackbarAlert
        message={updateFeedback}
        open={open}
        setOpen={setOpen}
        severityType={alertSeverity}
      />
    </div>
  );
};

export default ProfileSettings;
