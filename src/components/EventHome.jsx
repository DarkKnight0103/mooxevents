import React, { useState, useEffect } from "react";
import axios from "axios";

const EventHome = ({ onDataLoaded }) => {
  const [events, setEvents] = useState([]); // State to store events
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const limit = 4; // Limit to 4 cards
  const ip = import.meta.env.VITE_IP;
  const apiUrl = `http://${ip}/moox_events/api/event/get-all-events`;

  // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.post(apiUrl);
        const data = await response.data;
        console.log(data);
        if (data.events) {
          // Limit the events to the specified limit
          setEvents(data.events.slice(0, limit));
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
        onDataLoaded(); // Notify the parent component that data has been loaded
      }
    };

    fetchEvents();
  }, [onDataLoaded]);

  if (isLoading) {
    return (
      <div className="py-12 font-parkin text-center text-gray-800">
        Loading events...
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="py-12 font-parkin text-center text-gray-800">
        No events found.
      </div>
    );
  }

  return (
    <div className="py-12 font-parkin">
      <div className="max-w-7xl mx-auto space-y-12 px-4 sm:px-6 lg:px-8">
        {events.map((event, index) => (
          <div
            key={event._id}
            className={`flex flex-col md:flex-row items-center ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } group`}
          >
            {/* Image Section */}
            <div className="relative md:w-1/2 w-full">
              <img
                src={event.photo}
                alt={event.title}
                className="w-full h-60 sm:h-72 md:h-96 object-cover rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-[#DBAF76] text-white text-xs sm:text-sm font-bold py-1 px-2 sm:px-3 rounded shadow-md">
                {new Date(event.event_date).getDate()}{" "}
                <span className="ml-1">
                  {new Date(event.event_date).toLocaleString("default", {
                    month: "short",
                  })}{" "}
                  '{new Date(event.event_date).getFullYear().toString().slice(-2)}
                </span>
              </div>
            </div>
            {/* Content Section */}
            <div className="md:w-1/2 w-full mt-6 md:mt-0 md:px-8 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-[#DBAF76] transition-colors duration-300">
                {event.title}
              </h3>
              <p className="text-gray-600 mt-4 text-sm sm:text-base">
                {event.description}
              </p>
              <div className="mt-4 text-sm font-medium text-gray-600">
                Category:{" "}
                <span className="text-[#DBAF76]">
                  {event.event_name || "General"}
                </span>
              </div>
              <button className="mt-6 px-4 py-2 sm:px-6 sm:py-2 bg-[#DBAF76] text-gray-900 font-medium rounded-lg shadow-md hover:bg-gray-800 hover:text-[#DBAF76] transition duration-300">
                INQUIRE NOW
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventHome;
