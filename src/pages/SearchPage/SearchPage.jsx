import React, { useEffect } from "react";
import SearchResults from "../../components/SearchResults/SearchResults";
import SearchFilter from "../../components/SearchFilter/SearchFilter";

const SearchPage = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <SearchFilter />
        <SearchResults />
      </div>
    </>
  );
};

export default SearchPage;
