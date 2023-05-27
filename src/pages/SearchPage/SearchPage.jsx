import React, { useEffect, useState } from "react";
import SearchResults from "../../components/SearchResults/SearchResults";
import SearchFilter from "../../components/SearchFilter/SearchFilter";
import { publicInstance } from "../../utilities/api";

const SearchPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [petArray, setPetArray] = useState([]);

  const getPets = async (queryString) => {
    setIsLoading(true);

    if (!queryString.includes("adoptionStatus=")) {
      queryString += queryString
        ? "&adoptionStatus=Available"
        : "?adoptionStatus=Available";
    }
    try {
      const res = await publicInstance.get(`pet${queryString}`);
      const results = res.data.data.results;
      setPetArray(results);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const search = window.location.search;
    getPets(search);
  }, [window.location.search]);

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
        <SearchResults petArray={petArray} isLoading={isLoading} />
      </div>
    </>
  );
};

export default SearchPage;
