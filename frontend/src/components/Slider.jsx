// src/components/Slider.jsx
import React, { useState, useEffect } from "react";
import "../styles/Slider.css";

// Slides du slider
const slides = [
  {
    id: 1,
    title: "Best Different Type of Grocery Store",
    subtitle: "Quickly aggregate empowered networks after emerging products...",
    button: "Shop Now",
    image: "/images/slider1.webp",
  },
  {
    id: 2,
    title: "The Best Quality Products Guaranteed!",
    subtitle: "Guaranteed fresh and quality products for your home.",
    button: "Shop Now",
    image: "/images/slider2.webp",
  },
  {
    id: 3,
    title: "Quality Freshness Guaranteed!",
    subtitle: "Intrinsic fashion performance based products.",
    button: "Shop Now",
    image: "/images/slider3.webp",
  },
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Changement automatique des slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = index => setCurrentIndex(index);

  return (
    <div className="slider-section">
      <div className="slider-container">
        <div className="slider">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`slide ${currentIndex === index ? "active" : ""}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="slide-content">
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
                <button>{slide.button}</button>
              </div>
            </div>
          ))}

          <div className="dots">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`dot ${currentIndex === index ? "active" : ""}`}
                onClick={() => goToSlide(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
