import React from "react";
import RecipeShowcase from "../components/RecipeShowcase";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import CategoryExplore from "../components/CategoryExplore";

function Home() {
  return (
    <div className="bg-white text-gray-800 font-poppins min-h-screen">
      <div className="flex flex-wrap justify-between items-center px-6 py-10 gap-10">
        {/* contenu à ajouter ici plus tard */}
      </div>

      <hr className="border-t border-gray-300 my-6" />

      <CategoryExplore />

      <hr className="border-t border-gray-300 my-6" />

      <div className="px-6 pb-10 space-y-6">
        <RecipeShowcase />

        <hr className="border-t border-gray-300 my-6" />

        <AboutUs />

        <hr className="border-t border-gray-300 my-6" />

        <Footer />
      </div>
    </div>
  );
}

export default Home;
