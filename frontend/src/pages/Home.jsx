import React from "react";
import RecipeShowcase from "../components/RecipeShowcase";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import CategoryExplore from "../components/CategoryExplore";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-page">
      <div className="main-content">
      </div>
      <hr className="section-separator" />
      <CategoryExplore />
      <hr className="section-separator" />
      <div className="below-sections">
        <RecipeShowcase />
        <hr className="section-separator" />
        <AboutUs />
        <hr className="section-separator" />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
