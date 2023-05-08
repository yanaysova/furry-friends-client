import { useEffect, useState, useContext } from "react";
import { usersContextRef } from "../../context/usersContext";
import NewUserHeader from "../../components/NewUserHeader/NewUserHeader";
import LoggedUserHeader from "../../components/LoggedUserHeader/LoggedUserHeader";
import banner from "../../assets/banner.jpg";
import NewAdditions from "../../components/NewAdditions/NewAdditions";
import PawSpinner from "../../ui/PawLoader/PawLoader";

const HomePage = () => {
  const { currentUser } = useContext(usersContextRef);

  return (
    <div className="main-container">
      <section
        style={{
          backgroundImage: `url(${banner})`,
          backgroundColor: "var(--orange)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left center",
          backgroundAttachment: "fixed",
          width: "100%",
          height: "400px",
        }}
      >
        {currentUser ? <LoggedUserHeader /> : <NewUserHeader />}
      </section>
      <section style={{ width: "100%", marginTop: "1rem" }}>
        <NewAdditions />
      </section>
    </div>
  );
};

export default HomePage;
