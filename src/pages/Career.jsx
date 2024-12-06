import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Loader from '../components/Loader';
import axios from 'axios';

const Career = () => {
  const [isLoading, setIsLoading] = useState(true); // Show loader initially
  const [showLoader, setShowLoader] = useState(true); // Track loader visibility
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null); // To store the selected position for the popup
  const [popupData, setPopupData] = useState({ name: '', email: '', mobileno: '' });
  const ip = import.meta.env.VITE_IP;

  useEffect(() => {
    // Initialize the animation once loader is hidden
    if (!showLoader) {
      AOS.init({ duration: 1000, once: true });
      AOS.refresh();
    }
  }, [showLoader]);

  // Fetching positions from the backend
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.post(`http://${ip}/moox_events/api/career/jobs`);
        const data = response.data;

        // Log the response to verify the format
        console.log('API Response:', data);

        // Access the 'events' array from the response object
        const positionsArray = data.events;

        // Check if positionsArray is an array before calling map
        if (Array.isArray(positionsArray)) {
          const formattedPositions = positionsArray.map(position => ({
            ...position,
            requirements: position.requirements.split(',').map(req => req.trim())
          }));
          setPositions(formattedPositions);
        } else {
          console.error('Expected an array of positions, but received:', positionsArray);
        }
      } catch (error) {
        console.error('Error fetching positions:', error);
      } finally {
        // Hide loader when API data is fetched and processed
        setTimeout(() => setIsLoading(false), 1000);
        setTimeout(() => setShowLoader(false), 1000);
         // Ensure loader disappears after everything is loaded
      }
    };

    fetchPositions();
  }, []);

  // Handle Apply Now button click
  const handleApplyNow = (positionId) => {
    // Set the selected position ID in the state to show the popup
    const position = positions.find(p => p._id === positionId);
    setSelectedPosition(position);
  };

  // Handle form submission
  const handleSubmitApplication = async () => {
    if (!popupData.name || !popupData.email || !popupData.mobileno) {
      alert('Please fill in all the fields');
      return;
    }

    const applicationData = {
      ...popupData,
      position_id: selectedPosition._id
    };

    // Here you would send the application data to your backend
    // Example POST request
    try {
      const response = await fetch(`http://${ip}/moox_events/api/career/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });
      const result = await response.json();
      alert(result.message || 'Application submitted successfully!');
    } catch (error) {
      alert('There was an error submitting your application.');
    }

    // Close the popup after submission
    setSelectedPosition(null);
    setPopupData({ name: '', email: '', mobileno: '' });
  };

  return (
    <>
      {showLoader && (
        <div className={`fixed w-full h-screen flex justify-center items-center bg-black z-[999] transition-opacity duration-1000 ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
          <Loader />
        </div>
      )}
      <Menu />
      <div className="min-h-screen flex flex-col font-parkin bg-gray-100">
        {/* Header Section */}
        <div className="bg-gray-900 h-96 text-white text-center py-16 flex items-center justify-center flex-col px-4" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-parkin">Career at Moox Events</h1>
          <p className="text-lg md:text-xl mt-2">Join our team and be a part of something special</p>
        </div>

        {/* Breadcrumb Section */}
        <nav className="bg-[#DBAF76] py-3 px-4 md:py-4 md:px-6" data-aos="fade-up">
          <ol className="flex flex-wrap space-x-2 md:space-x-4 text-sm md:text-base text-white">
            <li>
              <a href="/" className="hover:text-[#785322]">Home</a>
            </li>
            <li>/</li>
            <li>
              <a href="/career" className="hover:text-[#785322]">Careers</a>
            </li>
          </ol>
        </nav>

        {/* Why Choose Moox Events Section */}
        <section className="px-6 py-12 md:px-8 md:py-16 bg-white" data-aos="fade-up">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-[#283B5C] mb-6">Why Choose Moox Events?</h2>
            <p className="text-lg text-gray-700">
              At Moox Events, we believe in creating unforgettable experiences. Our team is passionate about delivering high-quality events that make an impact. We offer a dynamic and supportive work environment where innovation is encouraged and creativity is celebrated. Join us and contribute to bringing exceptional events to life.
            </p>
          </div>
        </section>

        {/* Open Positions Section */}
        <section className="px-6 py-12 md:px-8 md:py-16 bg-white" data-aos="fade-up">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Open Positions at <span className="text-[#DBAF76]">Moox Events</span>
          </h2>
          {positions.length > 0 ? (
            <div className="space-y-8">
              {positions.map((position, index) => (
                <div
                  key={position._id}
                  className="bg-white shadow-lg rounded-lg p-8 md:p-10 transition-all hover:shadow-xl transform duration-300 ease-in-out w-[70%] md:w-[60%] mx-auto"
                  onClick={() => handleApplyNow(position._id)}
                >
                  <h3 className="text-2xl font-semibold text-[#283B5C] mb-4">{position.position_name}</h3>
                  <p className="text-base text-gray-600 mb-4">{position.description}</p>
                  <p className="text-sm text-gray-500 mb-2"><strong>Requirements:</strong></p>
                  <ul className="list-disc pl-5 text-gray-500 mb-4">
                    {position.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-500 mb-4"><strong>Location:</strong> {position.location}</p>
                  <a
                    href="#"
                    className="inline-block py-3 px-6 bg-[#283B5C] text-white font-semibold rounded-md transition duration-300 hover:bg-[#DBAF76]"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApplyNow(position._id);
                    }}
                  >
                    Apply Now
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-gray-200">No open positions available at the moment. Check back soon!</p>
          )}
        </section>

        {/* Apply Now Popup */}
        {selectedPosition && (
          <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-[9999]">
            <div className="bg-white p-8 rounded-lg w-[90%] max-w-md">
              <h3 className="text-2xl font-semibold mb-4">Apply for {selectedPosition.position_name}</h3>
              <form onSubmit={(e) => { e.preventDefault(); handleSubmitApplication(); }}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-semibold">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={popupData.name}
                    onChange={(e) => setPopupData({ ...popupData, name: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-semibold">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={popupData.email}
                    onChange={(e) => setPopupData({ ...popupData, email: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="mobileno" className="block text-sm font-semibold">Mobile</label>
                  <input
                    type="text"
                    id="mobileno"
                    value={popupData.mobileno}
                    onChange={(e) => setPopupData({ ...popupData, mobileno: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-[#283B5C] text-white font-semibold rounded-md transition duration-300 hover:bg-[#DBAF76]"
                >
                  Submit Application
                </button>
              </form>
              <button
                onClick={() => setSelectedPosition(null)}
                className="w-full py-3 px-6 bg-red-400 mt-3 text-white font-semibold rounded-md transition duration-300 hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default Career;
