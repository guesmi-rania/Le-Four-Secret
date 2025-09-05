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

// Produits / coupons
const products = [
  {
    id: 1,
    name: "Summer Gift Voucher",
    discount: "10% Off",
    code: "SUMMER24",
    image: "/images/product1.webp",
    expiry: new Date(new Date().getTime() + 86400000),
  },
  {
    id: 2,
    name: "Winter Gift Voucher",
    discount: "$100 Off",
    code: "WINTER25",
    image: "/images/product2.webp",
    expiry: new Date(new Date().getTime() + 172800000),
  },
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [countdowns, setCountdowns] = useState({});

  // Changement automatique des slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Countdown timer pour produits
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const newCountdowns = {};
      products.forEach(p => {
        const distance = p.expiry - now;
        if (distance > 0) {
          const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((distance / (1000 * 60)) % 60);
          const seconds = Math.floor((distance / 1000) % 60);
          newCountdowns[p.id] = {
            hours: hours.toString().padStart(2, "0"),
            minutes: minutes.toString().padStart(2, "0"),
            seconds: seconds.toString().padStart(2, "0"),
          };
        } else {
          newCountdowns[p.id] = { hours: "00", minutes: "00", seconds: "00" };
        }
      });
      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = index => setCurrentIndex(index);

  return (
    <div className="slider-section">
      <div className="slider-container">
        {/* Slider */}
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

          {/* Dots */}
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

        {/* Bloc produits / coupons */}
        <div className="coupons">
          {products.map(p => (
            <div key={p.id} className="coupon-card">
              <img src={p.image} alt={p.name} />
              <div className="content">
                <strong>{p.name}</strong>
                <p>{p.discount}</p>
                <p>Code: {p.code}</p>
                <p>Status: {countdowns[p.id]?.hours !== "00" ? "Active" : "Inactive"}</p>
                {countdowns[p.id] && (
                  <div className="timer">
                    <div className="time-box">{countdowns[p.id].hours}</div>
                    <span>:</span>
                    <div className="time-box">{countdowns[p.id].minutes}</div>
                    <span>:</span>
                    <div className="time-box">{countdowns[p.id].seconds}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
