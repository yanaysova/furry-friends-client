import { useEffect, useState } from "react";
import PetCard from "../../ui/PetCard/PetCard";
import axios from "axios";
import "./SearchResults.css";

const SearchResults = ({ petArray, isLoading }) => {
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
