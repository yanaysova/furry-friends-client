import { useState, useContext } from "react";
import { usersContextRef } from "../../context/usersContext";
import { useNavigate } from "react-router";
import { privateInstance } from "../../utilities/api";
import StyledButton from "../../ui/StyleButton/StyledButton";
import LinkButton from "../../ui/LinkButton/LinkButton";
import TextInput from "../../ui/TextInput/TextInput";
import "./LoginForm.css";

const LoginForm = ({ handleToggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { setCurrentUser, setIsAdmin } = useContext(usersContextRef);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const loggedUser = {
      email,
      password,
    };
    try {
      const res = await privateInstance.post("/auth/login", loggedUser);
      const { user } = res.data;
      setCurrentUser(user);
      setIsAdmin(user.isAdmin);
      localStorage.setItem("token", res.data.token);
      console.log(user);
      if (user.isAdmin) {
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="login-header">
        <h1>Login</h1>
        <h2>Welcome back</h2>
      </div>
      <form className="login-form" onSubmit={(e) => handleLogin(e)}>
        <TextInput
          errMessage={errorMessage}
          errCode={"Invalid email"}
          label={"Email"}
          type={"Email"}
          autoComp={"Email"}
          setState={setEmail}
          errText={"Email does not exist"}
        />
        <TextInput
          errMessage={errorMessage}
          errCode={"Incorrect Password"}
          label={"Password"}
          type={"Password"}
          autoComp={"current-password"}
          setState={setPassword}
          errText={"Incorrect password"}
        />
        <StyledButton type="submit">Login</StyledButton>
      </form>
      <div className="login-footer">
        <span>Need an account?</span>
        <LinkButton onClick={() => handleToggleForm()}>Sign up</LinkButton>
      </div>
    </div>
  );
};

export default LoginForm;
