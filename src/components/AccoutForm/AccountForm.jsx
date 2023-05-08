import { useState, useContext, useEffect } from "react";
import { usersContextRef } from "../../context/usersContext";
import axios from "axios";
import StyledButton from "../../ui/StyleButton/StyledButton";
import TextInput from "../../ui/TextInput/TextInput";
import "./AccountForm.css";
import { checkPasswordMatch } from "../../utilities/utilities";

const AccountForm = ({ handleAlert }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { currentUser, setCurrentUser } = useContext(usersContextRef);

  useEffect(() => {
    setEmail(currentUser.email);
  }, []);

  const handleEmailChange = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const res = await axios.put(
        `http://localhost:8080/user/${currentUser.id}/email`,
        { email: email }
      );
      setCurrentUser(res.data);
      handleAlert("Email address successfully updated", "success");
    } catch (error) {
      console.log(error);
      handleAlert(error.message, "error");
      setErrorMessage(error.response.data);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!checkPasswordMatch(password, rePassword)) {
      setErrorMessage("passwordErr");
      return;
    }
    try {
      const res = await axios.put(
        `http://localhost:8080/users/${currentUser.id}/password`,
        { password: password }
      );
      setCurrentUser(res.data);
      handleAlert("Password address successfully updated", "success");
    } catch (error) {
      console.log(error);
      handleAlert(error.message, "error");
    }
  };

  return (
    <div className="account-form">
      <h3>Email</h3>
      <form onSubmit={(e) => handleEmailChange(e)}>
        <TextInput
          errMessage={errorMessage}
          errCode={"userExistsErr"}
          label={"Email"}
          type={"email"}
          autoComp={"email"}
          setState={setEmail}
          value={email}
          errText={"Email already in use."}
        />
        <StyledButton
          type="submit"
          disabled={email && email !== currentUser.email ? false : true}
        >
          Change Email
        </StyledButton>
      </form>
      <h3>Password</h3>
      <form onSubmit={(e) => handlePasswordChange(e)}>
        <TextInput
          errMessage={errorMessage}
          errCode={"passwordErr"}
          label={"Password"}
          type={"password"}
          autoComp={"current-password"}
          setState={setPassword}
        />
        <TextInput
          errMessage={errorMessage}
          errCode={"passwordErr"}
          label={"Confirm Password"}
          type={"password"}
          autoComp={"new-password"}
          setState={setRePassword}
          errText={"Passwords don't match."}
        />
        <StyledButton type="submit" disabled={password ? false : true}>
          Change Password
        </StyledButton>
      </form>
    </div>
  );
};

export default AccountForm;
