import { useEffect, useState } from "react";
import PetCard from "../../ui/PetCard/PetCard";
import axios from "axios";
import "./SearchResults.css";

const SearchResults = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [petArray, setPetArray] = useState([]);

  const getPets = async (params) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`http://localhost:8080/pet`, {
        params: params,
      });
      const results = res.data.data.results;
      console.log(results);
      setPetArray(results);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const typeParam = urlParams.get("type");

    getPets({ type: typeParam });
  }, []);

  return (
    <div className="results-container">
      <div className="pet-gallery">
        {petArray?.map((pet) => (
          <PetCard key={pet._id} pet={pet} isLoading={isLoading} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
