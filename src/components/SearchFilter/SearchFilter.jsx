import { useState } from "react";
import "./SearchFilter.css";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import MenuDrawer from "../../ui/MenuDrawer/MenuDrawer";

const SearchFilter = () => {
  const [searchText, setSearchText] = useState("");
  const [searchBy, setSearchBy] = useState("name");

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleClearInput = () => {
    setSearchText("");
  };

  const handleSubmitForm = (e) => {
    alert("hi");
  };

  const searchByOptions = [
    { label: "Name", value: "name" },
    { label: "Age", value: "age" },
    { label: "Breed", value: "breed" },
  ];

  return (
    <div className="filter-wrapper">
      <form>
        <div className="filtering-section"></div>
        <div className="input-section">
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
              onClick={handleSubmitForm}
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
