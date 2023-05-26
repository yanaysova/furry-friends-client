import banner from "../../assets/banner.jpg";
import NewAdditions from "../../components/NewAdditions/NewAdditions";
import HeroSection from "../../components/HeroSection/HeroSection";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="main-container">
      <section className="hero-banner">
        <HeroSection />
      </section>
      <section style={{ width: "100%", marginTop: "1rem" }}>
        <NewAdditions />
      </section>
    </div>
  );
};

export default HomePage;
