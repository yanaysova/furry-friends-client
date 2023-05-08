import React, { useState } from "react";
import AboutForm from "../../components/AboutForm/AboutForm";
import { usersContextRef } from "../../context/usersContext";
import { useContext } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AccountForm from "../../components/AccoutForm/AccountForm";
import SnackbarAlert from "../../ui/SnackbarAlert/SnackbarAlert";
import "./ProfileSettings.css";

const ProfileSettings = () => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [updateFeedback, setUpdateFeedback] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const { currentUser, setCurrentUser } = useContext(usersContextRef);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="profile tabs"
          textColor="primary"
          indicatorColor="secondary"
        >
          <Tab label="About Me" />
          <Tab label="Account Settings" />
        </Tabs>
      </Box>
      {value === 0 && <AboutForm handleAlert={handleAlert} />}
      {value === 1 && <AccountForm handleAlert={handleAlert} />}
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
