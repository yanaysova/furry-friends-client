import "./App.css";
import { Routes, Route } from "react-router";
import { useState,useContext } from "react";
import { usersContextRef } from "./context/usersContext";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";

function App() {
  // const [petId, setPetId] = useState("");
  // const [petName, setPetName] = useState(null);
  // const { getAllUsers } = useContext(usersContextRef);

  // const getAllPets = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:8080/pets");
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const getPetById = async (e, id) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.get(`http://localhost:8080/pets/${id}`);
  //     const petData = await res.data;
  //     setPetName(petData.name);
  //     console.log(petData);
  //     console.log(petData.name);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
<div className="main-container">
<Navbar></Navbar>
</div>
  );
}

export default App;
