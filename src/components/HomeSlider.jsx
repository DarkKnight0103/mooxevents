import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";

const HomeSlider = () => {
  const slides = [
    { image: "/img1.jpg" },
    { image: "/img2.jpg" },
    { image: "/img3.jpg" },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false); // State to track scroll position

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000);

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  // Scroll effect to toggle logo and backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      // Add backdrop-blur when user scrolls
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-row items-center justify-center w-full"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center h-full w-full px-8">
        {/* Logo Section */}
        <div className="lg:w-1/2 flex justify-center items-center mb-10 lg:mb-0">
          <img
            src="/logo.png"
            alt="Logo"
            className={`w-1/3 md:w-1/4 lg:w-2/5 transition-opacity duration-300 ${ 
              isScrolled ? "opacity-0 " : "opacity-100"}`}
            // style={{
            //   filter: "drop-shadow(0px 3px 7px rgba(255, 255, 255, 0.3))",
            // }}
          />
        </div>

        {/* Text Content Section */}
        <div className="lg:w-1/2 text-white text-center lg:text-left space-y-6 flex items-center justify-center flex-col">
          {/* Heading */}
          <p
            className="text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{
              textShadow:
                "0 0 10px rgba(255, 255, 255, 0.4), 0 0 20px rgba(255, 255, 255, 0.2)",
            }}
          >
            Want to
          </p>

          {/* Type Animation */}
          <TypeAnimation
            sequence={[
              "create unforgettable weddings?",
              2200, // 1800ms typing + 2200ms pause
              "host standout corporate events?",
              2200,
              "throw unforgettable parties?",
              2200,
              "craft lasting memories?",
              2200,
            ]}
            wrapper="span"
            speed={60} // 60ms per character
            style={{
              fontSize: "1.5rem",
              display: "inline-block",
              textShadow: "0 0 5px rgba(255, 255, 255, 0.7)",
            }}
            repeat={Infinity}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;
