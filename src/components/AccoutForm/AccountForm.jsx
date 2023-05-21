import { useState, useContext, useEffect } from "react";
import { usersContextRef } from "../../context/usersContext";
import StyledButton from "../../ui/StyleButton/StyledButton";
import TextInput from "../../ui/TextInput/TextInput";
import "./AccountForm.css";
import { checkPasswordMatch } from "../../utilities/utilities";
import { privateInstance } from "../../utilities/api";

const AccountForm = ({ handleAlert }) => {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setNewRePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { currentUser, setCurrentUser } = useContext(usersContextRef);

  useEffect(() => {
    setEmail(currentUser.email);
  }, []);

  const handleEmailChange = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const res = await privateInstance.put(`/user/${currentUser.id}/email`, {
        email: email,
      });
      setCurrentUser(res.data.data);
      handleAlert(
        `Email address successfully updated to ${res.data.data.email}`,
        "success"
      );
    } catch (error) {
      console.log(error);
      handleAlert(error.response.data.message, "error");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!checkPasswordMatch(newPassword, reNewPassword)) {
      setErrorMessage("passwordErr");
      return;
    }
    try {
      await privateInstance.put(`/user/${currentUser.id}/password`, {
        password: currentPassword,
        newPassword: newPassword,
      });
      handleAlert("Password address successfully updated", "success");
    } catch (error) {
      console.log(error.response.data);
      handleAlert(error.response.data.message, "error");
    }
  };

  return (
    <div className="account-form">
      <h3>Change Email</h3>
      <form onSubmit={(e) => handleEmailChange(e)}>
        <TextInput
          errCode={"userExistsErr"}
          label={"Email"}
          type={"email"}
          autoComp={"email"}
          setState={setEmail}
          value={email}
        />
        <StyledButton
          type="submit"
          disabled={email && email !== currentUser.email ? false : true}
        >
          Change Email
        </StyledButton>
      </form>
      <h3>Change Password</h3>
      <form onSubmit={(e) => handlePasswordChange(e)}>
        <TextInput
          label={"Current password"}
          type={"password"}
          autoComp={"current-password"}
          setState={setCurrentPassword}
        />
        <TextInput
          errMessage={errorMessage}
          errCode={"passwordErr"}
          label={"New password"}
          type={"password"}
          autoComp={"current-password"}
          setState={setNewPassword}
        />
        <TextInput
          errMessage={errorMessage}
          errCode={"passwordErr"}
          label={"Confirm new password"}
          type={"password"}
          autoComp={"new-password"}
          setState={setNewRePassword}
          errText={"Passwords don't match."}
        />
        <StyledButton
          type="submit"
          disabled={
            newPassword && currentPassword && reNewPassword ? false : true
          }
        >
          Change Password
        </StyledButton>
      </form>
    </div>
  );
};

export default AccountForm;
