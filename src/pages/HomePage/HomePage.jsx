import banner from "../../assets/banner.jpg";
import NewAdditions from "../../components/NewAdditions/NewAdditions";
import HeroSection from "../../components/HeroSection/HeroSection";

const HomePage = () => {
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
        <HeroSection />
      </section>
      <section style={{ width: "100%", marginTop: "1rem" }}>
        <NewAdditions />
      </section>
    </div>
  );
};

export default HomePage;
