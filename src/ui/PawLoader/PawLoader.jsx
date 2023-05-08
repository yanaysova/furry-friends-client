import React from "react";
import PetsIcon from "@mui/icons-material/Pets";

const PawLoader = () => {
  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        position: "relative",
        margin: "10px",
      }}
    >
      <div
        style={{
          content: "",
          display: "block",
          position: "absolute",
          width: "40px",
          height: "40px",
          backgroundColor: "white",
          borderRadius: "50%",
          opacity: "0.6",
          top: "0",
          right: "0",
          animation: "paw-mark-1 1s ease-in-out infinite",
          animationDelay: "0.2s",
        }}
      >
        <PetsIcon color="primary" fontSize="large" />
      </div>
      <div
        style={{
          content: "",
          display: "block",
          position: "absolute",
          width: "40px",
          height: "40px",
          backgroundColor: "white",
          borderRadius: "50%",
          opacity: "0.6",
          bottom: "0",
          left: "0",
          animation: "paw-mark-2 1s ease-in-out infinite",
        }}
      >
        <PetsIcon color="primary" fontSize="large" />
      </div>
      <style>
        {`
        @keyframes paw-mark-1 {
          0% {
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1);
          }
        }

        @keyframes paw-mark-2 {
          0% {
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1);
          }
        }
      `}
      </style>
    </div>
  );
};

export default PawLoader;
