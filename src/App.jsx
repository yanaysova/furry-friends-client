import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import AuthModal from "./components/AuthModal/AuthModal";
import ProfileSettings from "./pages/ProfileSettings/ProfileSettings";
import ProtectedRoute from "./utilities/ProtectedRouse/ProtectedRoute";
import MyPets from "./pages/MyPets/MyPets";
import { ThemeProvider } from "@mui/material/styles";
import MuiTheme from "./ui/Styles/MuiTheme";
import PetPage from "./pages/PetPage/PetPage";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";

function App() {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const location = useLocation();

  return (
    <div className="main-container">
      <ThemeProvider theme={MuiTheme}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/petpage/:id" element={<PetPage />}></Route>
          <Route
            path="/auth"
            element={
              <>
                <HomePage />
                <AuthModal
                  openAuthModal={location.pathname === "/auth"}
                  setOpenAuthModal={setOpenAuthModal}
                />
              </>
            }
          ></Route>
          <Route path="/search" element={<SearchPage />}></Route>
          <Route
            path="/user/profile"
            element={
              <ProtectedRoute role={"user"}>
                <ProfileSettings />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/user/mypets"
            element={
              <ProtectedRoute role={"user"}>
                <MyPets />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/admin"
            element={
              <ProtectedRoute role={"admin"}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
