import React from "react";
import { TypeAnimation } from "react-type-animation";

const HomeSlider = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        src="/bg.mp4"
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      ></video>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 -z-5"></div>

      {/* Content Overlay */}
      <div className="relative flex flex-col lg:flex-row items-center justify-center h-full w-full px-5">
        {/* Logo Section */}
        <div className="lg:w-1/2 flex justify-center items-center mb-10 lg:mb-0">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-2/3 md:w-1/2 lg:w-2/3 drop-shadow-lg"
          />
        </div>

        {/* Text Content Section */}
        <div className="lg:w-1/2 text-white text-center space-y-4 px-4 lg:px-0 text-xl font-bold">
          {/* Heading */}
          <p
            className="text-4xl md:text-6xl lg:text-7xl"
            style={{
              textShadow:
                "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)",
            }}
          >
            Want to
          </p>

          {/* Type Animation */}
          <TypeAnimation
            sequence={[
              "create unforgettable weddings?",
              1000,
              "host standout corporate events?",
              1000,
              "throw unforgettable parties?",
              1000,
              "craft lasting memories?",
              1000,
            ]}
            wrapper="span"
            speed={60}
            style={{
              fontSize: "1.5em",
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
