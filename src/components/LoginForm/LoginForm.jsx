import React, { useState, useContext } from "react";
import { usersContextRef } from "../../context/usersContext";
import axios from "axios";
import "./LoginForm.css";
import StyledButton from "../../ui/StyleButton/StyledButton";
import LinkButton from "../../ui/LinkButton/LinkButton";
import TextInput from "../../ui/TextInput/TextInput";
import { useNavigate } from "react-router";
import { publicInstance } from "../../utilities/api";

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
      const res = await publicInstance.post("/auth/login", loggedUser);
      const { user } = res.data;
      console.log(res.data);
      setCurrentUser(user);
      setIsAdmin(user.isAdmin);
      localStorage.setItem("token", res.data.token);
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

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//       const response = await axios.post(LOGIN_URL,
//           JSON.stringify({ user, pwd }),
//           {
//               headers: { 'Content-Type': 'application/json' },
//               withCredentials: true
//           }
//       );
//       console.log(JSON.stringify(response?.data));
//       //console.log(JSON.stringify(response));
//       const accessToken = response?.data?.accessToken;
//       const roles = response?.data?.roles;
//       setAuth({ user, pwd, roles, accessToken });
//       setUser('');
//       setPwd('');
//       navigate(from, { replace: true });
//   } catch (err) {
//       if (!err?.response) {
//           setErrMsg('No Server Response');
//       } else if (err.response?.status === 400) {
//           setErrMsg('Missing Username or Password');
//       } else if (err.response?.status === 401) {
//           setErrMsg('Unauthorized');
//       } else {
//           setErrMsg('Login Failed');
//       }
//       errRef.current.focus();
//   }
// }

// export async function verifyOtp(
//   otp: string,
//   phone: string
// ): Promise<User | null> {
//   const verifyResponse = await submitOtp(otp, phone);
//   if (verifyResponse?.data?.data?.token) {
//     setAuthToken(verifyResponse.data.data.token);
//     const userData = decodeToken < User > verifyResponse.data.data.token;
//     return userData;
//   } else {
//     return null;
//   }
// }

// export function setAuthToken(token: string): void {
//   return localStorage.setItem(Constants.LOCALSTORAGE_TOKEN_NAME, token);
// }
