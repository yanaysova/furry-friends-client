import React, { useEffect } from "react";
import axios from "axios";

const SearchPage = () => {
  const getPets = async (params) => {
    console.log(params);
    try {
      const res = await axios.get(`http://localhost:8080/pet`, {
        params: params,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Get the "type" query parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const typeParam = urlParams.get("type");

    // Call getPets with the type parameter
    getPets({ type: typeParam });
  }, []);

  return (
    <>
      <div>Search Page</div>
      <p>you are logged in</p>
    </>
  );
};

export default SearchPage;
