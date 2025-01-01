import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Service.css";
import axios from "axios";

const Services = () => {
  const [isVisible, setIsVisible] = useState(false); // For "SERVICES" letters
  const [cardVisible, setCardVisible] = useState(false); // For cards fade-in
  const [services, setServices] = useState([]); // State for services
  const [loading, setLoading] = useState(true); // Loading state
  const ip = import.meta.env.VITE_IP; // Get the IP from environment variables
  const navigate = useNavigate(); // For navigation

  // Scroll Event for Animations
  useEffect(() => {
    const handleScroll = () => {
      const servicesSection = document.getElementById("services-section");
      const cardSection = document.getElementById("card-section");

      if (servicesSection) {
        const rect = servicesSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setIsVisible(true); // Trigger animation for "SERVICES" letters
        }
      }

      if (cardSection) {
        const rect = cardSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setCardVisible(true); // Trigger animation for cards
        }
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger on mount in case elements are already in view

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fetch services from backend
  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const response = await axios.get(
          `${ip}/moox_events/api/service/services`
        );
        const data = response.data;

        if (data.events) {
          setServices(data.events); // Set services data in state
          setLoading(false); // Stop loading once data is fetched
        }
      } catch (error) {
        console.error("Error fetching service data:", error);
        setLoading(false); // Stop loading if there's an error
      }
    };

    fetchServicesData(); // Call the function to fetch data
  }, [ip]);

  // Handle click on Inquire Now button
  const handleInquireClick = (id) => {
    navigate(`/event/${id}`); // Redirect to the event detail page
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div
      id="services-section"
      className="flex w-full items-center justify-center flex-col min-h-[1000px]"
    >
      <div className="flex w-[90%] items-start justify-between flex-row h-full">
        {/* Left Letters */}
        <div className="flex w-[150px] h-auto items-start">
          <div className="w-full gap-3 flex flex-col">
            {"SERVICES".split("").map((letter, index) => (
              <div
                key={index}
                className={`w-full flex items-end justify-end text-gray-800 text-7xl font-parkin p-3 transform transition-all duration-500 ease-out ${
                  isVisible
                    ? `translate-x-0 opacity-100`
                    : "-translate-x-20 opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`, // Add staggered delay for each letter
                }}
              >
                {letter}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-center justify-between w-[85%] h-full p-3">
          <div>
            <p className="md:text-lg text-md text-gray-600 md:w-full w-[90%] text-center mb-10 mt-3">
              Our trained and skilled event planners have the right expertise to
              make your event more spectacular. With full-time experience in the
              event management & Wedding Planning industry, we are serving our
              customers with the best possible services delivered at the best
              possible rates.
            </p>
          </div>

          {/* Cards Section */}
          <div
            id="card-section"
            className="w-[90%] h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <div
                className={`flip-card-container transform transition-all duration-700 ease-out ${
                  cardVisible
                    ? `translate-y-0 opacity-100`
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 300}ms` }} // Increased stagger delay to 300ms for each card
                key={service.id}
              >
                <div className="flip-card shadow-2xl">
                  {/* Front Side */}
                  <div className="flip-card-front">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="card-image"
                    />
                    <div className="card-text text-2xl">{service.title}</div>
                  </div>

                  {/* Back Side */}
                  <div className="flip-card-back flex flex-col items-center justify-center">
                    <h3 className="card-back-title">{service.title}</h3>
                    <p className="card-back-status">{service.status}</p>
                    <button
                      className="card-button"
                      onClick={() => handleInquireClick(service.id)}
                    >
                      Inquire Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
