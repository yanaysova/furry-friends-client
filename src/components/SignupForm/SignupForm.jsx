import { useContext, useState } from "react";
import { checkPasswordMatch } from "../../utilities/utilities";
import "./SignUpForm.css";
import StyledButton from "../../ui/StyleButton/StyledButton";
import LinkButton from "../../ui/LinkButton/LinkButton";
import TextInput from "../../ui/TextInput/TextInput";
import { publicInstance } from "../../utilities/api";
import { usersContextRef } from "../../context/usersContext";

const SignupForm = ({ handleToggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { setCurrentUser, setIsAdmin } = useContext(usersContextRef);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!checkPasswordMatch(password, rePassword)) {
      setErrorMessage("passwordErr");
      return;
    }
    const newUser = {
      email,
      password,
      firstName,
      lastName,
      phoneNum,
    };
    try {
      const res = await publicInstance.post("/auth/signup", newUser);
      const { user } = res.data;
      setCurrentUser(user);
      setIsAdmin(user.isAdmin);
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.response.data);
    }
  };

  return (
    <div className="signup-form">
      <div className="signup-header">
        <h1>Sign up</h1>
        <h2>Find your new buddy today!</h2>
      </div>
      <form onSubmit={(e) => handleSignUp(e)}>
        <TextInput
          errMessage={errorMessage}
          errCode={"userExistsErr"}
          label={"Email"}
          type={"email"}
          autoComp={"email"}
          setState={setEmail}
          errText={"Email already in use."}
        />
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
        <TextInput
          label={"First Name"}
          type={"text"}
          autoComp={"given-name"}
          setState={setFirstName}
        />
        <TextInput
          label={"Last Name"}
          type={"text"}
          autoComp={"family-name"}
          setState={setLastName}
        />
        <TextInput
          label={"Phone Number"}
          type={"tel"}
          autoComp={"tel"}
          setState={setPhoneNum}
        />
        <StyledButton type="submit">Sign Up</StyledButton>
      </form>
      <div className="signup-footer">
        <span>Already have an account?</span>
        <LinkButton onClick={() => handleToggleForm()}>Login</LinkButton>
      </div>
    </div>
  );
};

export default SignupForm;
