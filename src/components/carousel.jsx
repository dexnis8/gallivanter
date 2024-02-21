/* eslint-disable react/prop-types */
// import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserCard from "./user_card";

const Carousel = ({ userCards }) => {
  const settings = {
    dots: true, // Show dots for navigation
    infinite: true, // Loop the carousel
    speed: 1000, // Transition speed (milliseconds)
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
    autoplay: true, // Auto-play the carousel
    autoplaySpeed: 3000, // Auto-play speed (milliseconds)
    responsive: [
      {
        breakpoint: 768, // Mobile view breakpoint
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true, // Make slides variable width for mobile view
          centerMode: true, // Center the active slide
        },
      },
    ],
  };

  return (
    <div className="mt-8">
      <Slider {...settings}>
        {userCards.map((user, index) => (
          <div key={index}>
            <UserCard
              imageUrl={user.imageUrl}
              message={user.message}
              name={user.name}
              role={user.role}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
