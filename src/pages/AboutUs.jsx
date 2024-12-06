import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Loader from '../components/Loader';
import ClientHome from '../components/ClientHome';

const AboutUs = () => {
  const [isLoading, setIsLoading] = useState(true); // Track if data is still loading
  const [showLoader, setShowLoader] = useState(true); // Control visibility of loader

  // Handle data loaded notification from ClientHome
  const handleDataLoaded = () => {
    setIsLoading(false);  // Set loading to false once data is fetched
    setTimeout(() => setShowLoader(false), 1000);  // Hide loader after 1 second transition
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      {/* Loader that depends on the loading state from ClientHome */}
      {showLoader && isLoading && (
        <div className="fixed w-full h-screen flex justify-center items-center bg-black z-[999] transition-opacity duration-1000 opacity-100">
          <Loader />
        </div>
      )}

      <Menu />

      <div className="min-h-screen flex flex-col font-parkin bg-gray-100">
        {/* Header Section */}
        <div
          className="bg-gray-900 h-96 text-white text-center py-16 flex items-center justify-center flex-col px-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white font-parkin">About Us</h1>
          <p className="text-lg md:text-xl mt-2">
            Dedicated to innovation, quality, and customer satisfaction.
          </p>
        </div>

        {/* Breadcrumbs */}
        <nav className="bg-[#DBAF76] py-3 px-4 md:py-4 md:px-6">
          <ol className="flex flex-wrap space-x-2 md:space-x-4 text-sm md:text-base text-white">
            <li>
              <a href="/" className="hover:text-[#785322]">
                Home
              </a>
            </li>
            <li>/</li>
            <li>
              <a href="/about" className="hover:text-[#785322]">
                About Us
              </a>
            </li>
          </ol>
        </nav>

        {/* Description Section */}
        <div className="w-full h-auto flex items-center justify-center py-16">
          <div className="text-center w-full max-w-3xl">
            <div
              id="about-description"
              className={`w-[80%] md:w-auto text-lg text-gray-700 mx-auto leading-relaxed transform transition-all duration-1000`}
            >
              Moox Events Pvt. Ltd. is a Rajkot, Gujarat-based event management & wedding planning company dedicated to providing customers with a wide assortment of event management services for all sorts of corporate and personal events. Be it live shows, celebrity events, entertainment events, star nights, product launches, theme parties, wedding events, birthdays, anniversaries, Baby showers, corporate events, meet-ups, and many more…
              <br /><br />
              Our trained and skilled event planners have the right expertise to make your event more spectacular with full-time experience in the event management & Wedding Planning industry. We are serving our customers with the best possible services delivered at the best possible rates. We provide out-of-the-box and innovative ideas for 100% client satisfaction.
            </div>
          </div>
        </div>

        {/* ClientHome Component */}
        <div className="text-center text-gray-900 py-12 font-parkin text-5xl font-bold">
          Our Clients
        </div>

        <ClientHome onDataLoaded={handleDataLoaded} /> {/* Pass handleDataLoaded prop */}

        {/* Footer Component */}
        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
