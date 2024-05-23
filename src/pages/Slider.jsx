/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      nextSlide();
    } else if (event.key === "ArrowLeft") {
      prevSlide();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="slider">
      <button
        onClick={prevSlide}
        style={{ position: "absolute", zIndex: 1, left: 10 }}
      >
        Prev
      </button>
      <div className="slides">
        {images.map((image, index) => (
          <div
            key={index}
            className="slide"
            style={{
              transform:
                index === currentIndex
                  ? "scale(1)"
                  : `translateY(${10 * (index - currentIndex)}%) scale(0.8)`,
              zIndex: images.length - Math.abs(index - currentIndex),
              position: "absolute",
              width: "100%",
              height: "100%",
              transition: "transform 0.5s ease-in-out",
              opacity: index === currentIndex ? 1 : 0.5,
            }}
          >
            <img
              src={image.url}
              alt={image.description}
              style={{ width: "100%", height: "auto" }}
            />
            {/* <p>{image.description}</p> */}
          </div>
        ))}
      </div>
      <button
        onClick={nextSlide}
        style={{ position: "absolute", zIndex: 1, right: 10 }}
      >
        Next
      </button>
    </div>
  );
};

export default Slider;
