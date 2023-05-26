import { useState } from "react";
import "./SearchFilter.css";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import MenuDrawer from "../../ui/MenuDrawer/MenuDrawer";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

const SearchFilter = () => {
  const [searchText, setSearchText] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [typeFilter, setTypeFilter] = useState("Any");
  const [statusFilter, setStatusFilter] = useState("Available");
  const [genderFilter, setGenderFilter] = useState("Any");
  const [ageFilter, setAgeFilter] = useState("Any");
  const [weightFilter, setWeightFilter] = useState([1, 50]);
  const [heightFilter, setHeightFilter] = useState([5, 60]);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleClearInput = () => {
    setSearchText("");
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    buildQuery();
  };

  const handleWeightSlider = (event, newValue) => {
    setWeightFilter(newValue);
  };

  const handleHeightSlider = (event, newValue) => {
    setHeightFilter(newValue);
  };

  const buildQuery = () => {
    navigate(
      `/search?${searchBy}=${searchText}&type=${
        typeFilter !== "Any" ? typeFilter : ""
      }&adoptionStatus=${statusFilter !== "Any" ? statusFilter : ""}&gender=${
        genderFilter !== "Any" ? genderFilter : ""
      }&age=${ageFilter !== "Any" ? ageFilter : ""}&weight[gte]=${
        weightFilter[0]
      }&weight[lte]=${weightFilter[1]}&height[gte]=${
        heightFilter[0]
      }&height[lte]=${heightFilter[1]}`
    );
  };

  const searchByOptions = [
    { label: "Name", value: "name" },
    { label: "Breed", value: "breed" },
    { label: "Color", value: "color" },
  ];

  const filterTypeOptions = [
    { label: "Any", value: "Any" },
    { label: "Dog", value: "Dog" },
    { label: "Cat", value: "Cat" },
  ];

  const filterStatusOptions = [
    { label: "Available", value: "Available" },
    { label: "Fostered", value: "Fostered" },
    { label: "Adopted", value: "Adopted" },
    { label: "Any", value: "Any" },
  ];

  const filterGenderOptions = [
    { label: "Any", value: "Any" },
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  const filterAgeOptions = [
    { label: "Any", value: "Any" },
    { label: "Puppy (0-2)", value: "Puppy" },
    { label: "Young (2-5)", value: "Young" },
    { label: "Adult (5-10)", value: "Adult" },
    { label: "Senior (10+)", value: "Senior" },
  ];

  const weghtHeightSliders = (
    <Box sx={{ width: 250, display: "flex", flexDirection: "column" }}>
      <span>Weight (kg):</span>
      <Slider
        defaultValue={0}
        value={weightFilter}
        onChange={handleWeightSlider}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        step={10}
        marks
        min={5}
        max={50}
      />
      <span>Height (cm):</span>
      <Slider
        label="Height"
        value={heightFilter}
        onChange={handleHeightSlider}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        step={5}
        marks
        min={5}
        max={60}
      />
    </Box>
  );

  return (
    <div className="filter-wrapper">
      <form onSubmit={(e) => handleSubmitForm(e)}>
        <div className="filtering-section">
          <MenuDrawer
            label={`Pet Type: ${typeFilter}`}
            menuItems={filterTypeOptions}
            setState={setTypeFilter}
            state={typeFilter}
          />
          <Divider orientation="vertical" />
          <MenuDrawer
            label={`Status: ${statusFilter}`}
            menuItems={filterStatusOptions}
            setState={setStatusFilter}
            state={statusFilter}
          />
          <Divider orientation="vertical" />
          <MenuDrawer
            label={`Gender: ${genderFilter}`}
            menuItems={filterGenderOptions}
            setState={setGenderFilter}
            state={genderFilter}
          />
          <Divider orientation="vertical" />
          <MenuDrawer
            label={`Age: ${ageFilter}`}
            menuItems={filterAgeOptions}
            setState={setAgeFilter}
            state={ageFilter}
          />
          <Divider orientation="vertical" />
          <MenuDrawer
            label={`Weghit/Height`}
            customContent={weghtHeightSliders}
          />
        </div>
        <div className="input-section">
          <Divider orientation="vertical" />
          <div className="search-bar">
            <SearchIcon
              sx={{
                fontSize: "inherit",
                position: "absolute",
                top: "0px",
                height: "100%",
                left: "10%",
                cursor: "pointer",
              }}
              onClick={(e) => handleSubmitForm(e)}
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={handleInputChange}
            />
            {searchText && (
              <CancelIcon
                sx={{
                  fontSize: "inherit",
                  position: "absolute",
                  top: "0px",
                  height: "100%",
                  right: "25%",
                  cursor: "pointer",
                }}
                onClick={handleClearInput}
              />
            )}
          </div>
          <Divider orientation="vertical" />
          <div className="search-by-container">
            <MenuDrawer
              label={`Search By: ${searchBy}`}
              menuItems={searchByOptions}
              setState={setSearchBy}
              state={searchBy}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchFilter;
