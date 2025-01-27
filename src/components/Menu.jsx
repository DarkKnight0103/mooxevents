<<<<<<< Updated upstream

// import React, { useState } from "react";
// import { Squash as HamburgerSquash } from "hamburger-react";
// import { useSpring, animated, useTrail } from "@react-spring/web";
// import { Link } from "react-router-dom";

// const Menu = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   // Animation for fullscreen menu
//   const menuAnimation = useSpring({
//     transform: isOpen ? "translateY(0%)" : "translateY(-100%)",
//     opacity: isOpen ? 1 : 0,
//     config: { tension: 130, friction: 30 },
//   });

//   // Trail animation for menu items
//   const items = [
//     { name: "Home", link: "/" },
//     { name: "About Us", link: "/about" },
//     { name: "Services", link: "/services" },
//     { name: "Events", link: "/events" },
//     { name: "Gallery", link: "/gallery" },
//     { name: "Career", link: "/career" },
//     { name: "Contact", link: "/contact" },
//   ];

//   const trail = useTrail(items.length, {
//     opacity: isOpen ? 1 : 0,
//     from: { opacity: 0 },
//     config: { tension: 220, friction: 20 },
//     reset: true,
//   });

//   return (
//     <>
//       {/* Hamburger Menu Button (Always on top) */}
//       <div className="fixed z-50 rounded px-5 py-1 md:px-10 md:py-1 flex justify-between items-center w-full backdrop-blur">
//       <div className="w-full flex items-start z-10">
//         {/* Conditionally hide the logo when the menu is open */}
//         <Link to={'/'}>
//           <img
//             src="/logo.png"
//             alt=""
//             className={`w-28 md:w-36 mt-3 transition-opacity duration-300 ${
//               isOpen ? "opacity-0 cursor-default" : "opacity-100"
//             }`}
//             style={{
//               filter: "drop-shadow(0 0px 6px rgba(255, 255, 255, 0.1))",
//             }}
//           />
//         </Link>
//       </div>

//       {/* Hamburger menu */}
//       <HamburgerSquash
//         toggled={isOpen}
//         toggle={setIsOpen}
//         size={25}
//         direction="left"
//         duration={0.3}
//         distance="lg"
//         rounded
//         label="Show menu"
//         color="#DBAF76"
//         easing="ease-in"
//       />
//     </div>
//       {/* Fullscreen Menu */}
//       <animated.div
//         style={menuAnimation}
//         className="fixed top-0 left-0 w-full h-screen z-50 bg-gray-900  backdrop-blur-md ease-out" 
//       >
//         <div className="flex flex-col md:flex-row justify-between items-center md:items-end h-full py-28 px-6 sm:py-20 sm:px-10 lg:px-28">
//           {/* Main Menu Items */}
//           <div className="flex flex-col gap-6 sm:gap-10 w-full text-center md:text-left">
//   {trail.map((style, index) => (
//     <animated.a
//       key={items[index].name}
//       href={items[index].link}
//       style={style}
//       className="font-parkin font-bold text-3xl sm:text-4xl text-[#DBAF76] lg:text-5xl"
//     >
//       {/* Apply hover effects only on the text */}
//       <span
//         className="relative hover:text-white transition duration-300"
//         onMouseEnter={(e) =>
//           (e.target.style.textShadow = "0px 0px 10px rgba(219, 175, 118, 0.4)")
//         }
//         onMouseLeave={(e) => (e.target.style.textShadow = "none")}
//       >
//         {items[index].name}
//       </span>
//     </animated.a>
//   ))}
// </div>


//           {/* Social Links */}
//           <div className="flex flex-col items-center md:flex-row gap-3 md:gap-5 mt-10 md:mt-0">
//             <animated.a
//               href="/instagram"
//               style={trail[items.length - 2]}
//               className="font-parkin font-bold text-lg sm:text-xl text-[#DBAF76] lg:text-2xl hover:text-white transition duration-300"
//               onMouseEnter={(e) =>
//                 (e.target.style.textShadow = "0px 0px 10px #DBAF7666")
//               }
//               onMouseLeave={(e) => (e.target.style.textShadow = "none")}
//             >
//               Instagram
//             </animated.a>
//             <animated.a
//               href="/facebook"
//               style={trail[items.length - 1]}
//               className="font-parkin font-bold text-lg sm:text-xl text-[#DBAF76] lg:text-2xl hover:text-white transition duration-300"
//               onMouseEnter={(e) =>
//                 (e.target.style.textShadow = "0px 0px 10px #DBAF7666")
//               }
//               onMouseLeave={(e) => (e.target.style.textShadow = "none")}
//             >
//               Facebook
//             </animated.a>
//           </div>
//         </div>
//       </animated.div>
//     </>
//   );
// };

// export default Menu;




// import React, { useState } from "react";
// import { Squash as HamburgerSquash } from "hamburger-react";
// import { useSpring, animated, useTrail } from "@react-spring/web";
// import { Link } from "react-router-dom";

// const Menu = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   // Animation for fullscreen menu
//   const menuAnimation = useSpring({
//     transform: isOpen ? "translateY(0%)" : "translateY(-100%)",
//     opacity: isOpen ? 1 : 0,
//     config: { tension: 130, friction: 30 },
//   });

//   // Trail animation for menu items
//   const items = [
//     { name: "Home", link: "/" },
//     { name: "About Us", link: "/about" },
//     { name: "Services", link: "/services" },
//     { name: "Events", link: "/events" },
//     { name: "Gallery", link: "/gallery" },
//     { name: "Career", link: "/career" },
//     { name: "Contact", link: "/contact" },
//   ];

//   const trail = useTrail(items.length, {
//     opacity: isOpen ? 1 : 0,
//     from: { opacity: 0 },
//     config: { tension: 220, friction: 20 },
//     reset: true,
//   });

//   return (
//     <>
//       {/* Hamburger Menu Button (Always on top) */}
//       <div
//         className={`fixed z-50 rounded px-5 py-1 md:px-10 md:py-1 flex justify-between items-center w-full ${
//           isOpen ? "" : "backdrop-blur" // Add backdrop-blur effect when menu is closed
//         }`}
//       >
//         <div className="w-full flex items-start z-10">
//           {/* Conditionally hide the logo when the menu is open */}
//           <Link to={'/'}>
//             <img
//               src="/logo.png"
//               alt=""
//               className={`w-28 md:w-36 mt-3 transition-opacity duration-300 ${
//                 isOpen ? "opacity-0 cursor-default" : "opacity-100"
//               }`}
//               style={{
//                 filter: "drop-shadow(0 0px 6px rgba(255, 255, 255, 0.1))",
//               }}
//             />
//           </Link>
//         </div>

//         {/* Hamburger menu */}
//         <HamburgerSquash
//           toggled={isOpen}
//           toggle={setIsOpen}
//           size={25}
//           direction="left"
//           duration={0.3}
//           distance="lg"
//           rounded
//           label="Show menu"
//           color="#DBAF76"
//           easing="ease-in"
//         />
//       </div>

//       {/* Fullscreen Menu */}
//       <animated.div
//         style={menuAnimation}
//         className="fixed top-0 left-0 w-full h-screen z-40 bg-gray-900  backdrop-blur-md ease-out"
//       >
//         <div className="flex flex-col md:flex-row justify-between items-center md:items-end h-full py-28 px-6 sm:py-20 sm:px-10 lg:px-28">
//           {/* Main Menu Items */}
//           <div className="flex flex-col gap-6 sm:gap-10 w-full text-center md:text-left">
//             {trail.map((style, index) => (
//               <animated.a
//                 key={items[index].name}
//                 href={items[index].link}
//                 style={style}
//                 className="font-parkin font-bold text-3xl sm:text-4xl text-[#DBAF76] lg:text-5xl"
//               >
//                 {/* Apply hover effects only on the text */}
//                 <span
//                   className="relative hover:text-white transition duration-300"
//                   onMouseEnter={(e) =>
//                     (e.target.style.textShadow = "0px 0px 10px rgba(219, 175, 118, 0.4)")
//                   }
//                   onMouseLeave={(e) => (e.target.style.textShadow = "none")}
//                 >
//                   {items[index].name}
//                 </span>
//               </animated.a>
//             ))}
//           </div>

//           {/* Social Links */}
//           <div className="flex flex-col items-center md:flex-row gap-3 md:gap-5 mt-10 md:mt-0">
//             <animated.a
//               href="/instagram"
//               style={trail[items.length - 2]}
//               className="font-parkin font-bold text-lg sm:text-xl text-[#DBAF76] lg:text-2xl hover:text-white transition duration-300"
//               onMouseEnter={(e) =>
//                 (e.target.style.textShadow = "0px 0px 10px #DBAF7666")
//               }
//               onMouseLeave={(e) => (e.target.style.textShadow = "none")}
//             >
//               Instagram
//             </animated.a>
//             <animated.a
//               href="/facebook"
//               style={trail[items.length - 1]}
//               className="font-parkin font-bold text-lg sm:text-xl text-[#DBAF76] lg:text-2xl hover:text-white transition duration-300"
//               onMouseEnter={(e) =>
//                 (e.target.style.textShadow = "0px 0px 10px #DBAF7666")
//               }
//               onMouseLeave={(e) => (e.target.style.textShadow = "none")}
//             >
//               Facebook
//             </animated.a>
//           </div>
//         </div>
//       </animated.div>
//     </>
//   );
// };

// export default Menu;






=======
>>>>>>> Stashed changes
// import React, { useState, useEffect } from "react";
// import { Squash as HamburgerSquash } from "hamburger-react";
// import { useSpring, animated, useTrail } from "@react-spring/web";
// import { Link } from "react-router-dom";

// const Menu = () => {
//   const [isOpen, setIsOpen] = useState(false);
<<<<<<< Updated upstream
//   const [showLogo, setShowLogo] = useState(false); // State to handle logo visibility

//   // Animation for fullscreen menu
=======
//   const [showLogo, setShowLogo] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isVisible, setIsVisible] = useState(true);

//   let lastScrollY = 0;

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY;

//       // if (scrollTop > lastScrollY && !isOpen) {
//       //   setIsVisible(false);
//       // } else {
//       //   setIsVisible(true);
//       // }

//       setShowLogo(scrollTop > 50);
//       setIsScrolled(scrollTop > 10);

//       lastScrollY = scrollTop > 0 ? scrollTop : 0;
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [isOpen]);

>>>>>>> Stashed changes
//   const menuAnimation = useSpring({
//     transform: isOpen ? "translateY(0%)" : "translateY(-100%)",
//     opacity: isOpen ? 1 : 0,
//     config: { tension: 130, friction: 30 },
//   });

<<<<<<< Updated upstream
//   // Trail animation for menu items
=======
>>>>>>> Stashed changes
//   const items = [
//     { name: "Home", link: "/" },
//     { name: "About Us", link: "/about" },
//     { name: "Services", link: "/services" },
<<<<<<< Updated upstream
//     { name: "Events", link: "/events" },
=======
//     { name: "Blogs", link: "/events" },
>>>>>>> Stashed changes
//     { name: "Gallery", link: "/gallery" },
//     { name: "Career", link: "/career" },
//     { name: "Contact", link: "/contact" },
//   ];

//   const trail = useTrail(items.length, {
//     opacity: isOpen ? 1 : 0,
//     from: { opacity: 0 },
//     config: { tension: 220, friction: 20 },
//     reset: true,
//   });

<<<<<<< Updated upstream
//   // Scroll effect to show/hide logo
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) { // Change the scroll position value as needed
//         setShowLogo(true);
//       } else {
//         setShowLogo(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <>
//       {/* Hamburger Menu Button (Always on top) */}
//       <div
//         className={`fixed z-50 rounded px-5 py-1 md:px-10 md:py-1 flex justify-between items-center w-full ${
//           isOpen ? "" : "backdrop-blur" // Add backdrop-blur effect when menu is closed
//         }`}
//       >
//         <div className="w-full flex items-start z-10">
//           {/* Conditionally hide the logo when the menu is open */}
//           <Link to={'/'}>
//             <img
//               src="/logo.png"
//               alt=""
//               className={`w-28 md:w-36 mt-3 transition-opacity duration-300 ${
//                 isOpen || !showLogo ? "opacity-0 cursor-default" : "opacity-100"
//               }`}
//               style={{
//                 filter: "drop-shadow(0 0px 6px rgba(255, 255, 255, 0.1))",
//               }}
//             />
//           </Link>
//         </div>

//         {/* Hamburger menu */}
//         <HamburgerSquash
//           toggled={isOpen}
//           toggle={setIsOpen}
//           size={25}
//           direction="left"
//           duration={0.3}
//           distance="lg"
//           rounded
//           label="Show menu"
//           color="#DBAF76"
//           easing="ease-in"
//         />
=======
//   return (
//     <>
//       {/* Navbar */}
//       <div
//         className={`fixed z-50 w-full transition-all duration-300 ${
//           isOpen
//             ? "bg-transparent h-16"
//             : isScrolled
//             ? "bg-white/95 backdrop-blur-sm h-20"
//             : "bg-transparent h-20"
//         } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
//       >
//         <div className="h-full px-5 md:px-10 flex justify-between items-center">
//           <div className="flex items-center">
//             <Link to="/">
//               <img
//                 src="/logo.png"
//                 alt="Logo"
//                 className={`w-28 transition-opacity duration-300 ${
//                   isOpen || !showLogo ? "opacity-0" : "opacity-100"
//                 }`}
//                 style={{
//                   filter: "drop-shadow(0 0px 6px rgba(255, 255, 255, 0.1))",
//                 }}
//               />
//             </Link>
//           </div>
          
//           <div className="z-50 flex items-center">
//             <HamburgerSquash
//               toggled={isOpen}
//               toggle={setIsOpen}
//               size={25}
//               direction="left"
//               duration={0.3}
//               distance="lg"
//               rounded
//               label="Show menu"
//               color="#DBAF76"
//               easing="ease-in"
//             />
//           </div>
//         </div>
>>>>>>> Stashed changes
//       </div>

//       {/* Fullscreen Menu */}
//       <animated.div
//         style={menuAnimation}
<<<<<<< Updated upstream
//         className="fixed top-0 left-0 w-full h-screen z-40 bg-gray-900  backdrop-blur-md ease-out"
=======
//         className="fixed top-0 left-0 w-full h-screen z-40 bg-gray-900/95 backdrop-blur-md"
>>>>>>> Stashed changes
//       >
//         <div className="flex flex-col md:flex-row justify-between items-center md:items-end h-full py-28 px-6 sm:py-20 sm:px-10 lg:px-28">
//           {/* Main Menu Items */}
//           <div className="flex flex-col gap-6 sm:gap-10 w-full text-center md:text-left">
//             {trail.map((style, index) => (
//               <animated.a
//                 key={items[index].name}
//                 href={items[index].link}
//                 style={style}
//                 className="font-parkin font-bold text-3xl sm:text-4xl text-[#DBAF76] lg:text-5xl"
//               >
<<<<<<< Updated upstream
//                 {/* Apply hover effects only on the text */}
=======
>>>>>>> Stashed changes
//                 <span
//                   className="relative hover:text-white transition duration-300"
//                   onMouseEnter={(e) =>
//                     (e.target.style.textShadow = "0px 0px 10px rgba(219, 175, 118, 0.4)")
//                   }
//                   onMouseLeave={(e) => (e.target.style.textShadow = "none")}
//                 >
//                   {items[index].name}
//                 </span>
//               </animated.a>
//             ))}
//           </div>

//           {/* Social Links */}
//           <div className="flex flex-col items-center md:flex-row gap-3 md:gap-5 mt-10 md:mt-0">
//             <animated.a
<<<<<<< Updated upstream
//               href="/instagram"
//               style={trail[items.length - 2]}
//               className="font-parkin font-bold text-lg sm:text-xl text-[#DBAF76] lg:text-2xl hover:text-white transition duration-300"
//               onMouseEnter={(e) =>
//                 (e.target.style.textShadow = "0px 0px 10px #DBAF7666")
=======
//               href="https://www.instagram.com/mooxevents/"
//               target="_blank"
//               style={trail[items.length - 2]}
//               className="font-parkin font-bold text-lg sm:text-xl text-[#DBAF76] lg:text-2xl hover:text-white transition duration-300"
//               onMouseEnter={(e) =>
//                 (e.target.style.textShadow = "0px 0px 10px rgba(219, 175, 118, 0.4)")
>>>>>>> Stashed changes
//               }
//               onMouseLeave={(e) => (e.target.style.textShadow = "none")}
//             >
//               Instagram
//             </animated.a>
//             <animated.a
<<<<<<< Updated upstream
//               href="/facebook"
//               style={trail[items.length - 1]}
//               className="font-parkin font-bold text-lg sm:text-xl text-[#DBAF76] lg:text-2xl hover:text-white transition duration-300"
//               onMouseEnter={(e) =>
//                 (e.target.style.textShadow = "0px 0px 10px #DBAF7666")
=======
//               href="https://www.facebook.com/mooxevents/"
//               target="_blank"
//               style={trail[items.length - 1]}
//               className="font-parkin font-bold text-lg sm:text-xl text-[#DBAF76] lg:text-2xl hover:text-white transition duration-300"
//               onMouseEnter={(e) =>
//                 (e.target.style.textShadow = "0px 0px 10px rgba(219, 175, 118, 0.4)")
>>>>>>> Stashed changes
//               }
//               onMouseLeave={(e) => (e.target.style.textShadow = "none")}
//             >
//               Facebook
//             </animated.a>
//           </div>
//         </div>
//       </animated.div>
//     </>
//   );
// };

// export default Menu;


<<<<<<< Updated upstream



=======
>>>>>>> Stashed changes
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Menu = () => {
<<<<<<< Updated upstream
  const [isOpen, setIsOpen] = useState(false); // Menu state
  const [showLogo, setShowLogo] = useState(false); // State to show/hide logo
  const [isScrolled, setIsScrolled] = useState(false); // State to track scroll position

  // Animation for fullscreen menu
  const menuAnimation = useSpring({
    transform: isOpen ? "translateY(0%)" : "translateY(-100%)",
    opacity: isOpen ? 1 : 0,
    config: { tension: 130, friction: 30 },
  });

  // Trail animation for menu items
  const items = [
=======
  const location = useLocation();
  
  const menuItems = [
>>>>>>> Stashed changes
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
    { name: "Services", link: "/services" },
    { name: "Events", link: "/events" },
    { name: "Gallery", link: "/gallery" },
    { name: "Career", link: "/career" },
    { name: "Contact", link: "/contact" },
  ];

<<<<<<< Updated upstream
  const trail = useTrail(items.length, {
    opacity: isOpen ? 1 : 0,
    from: { opacity: 0 },
    config: { tension: 220, friction: 20 },
    reset: true,
  });

  // Scroll effect to toggle logo and backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      // Show logo if scrolled more than 50px
      setShowLogo(scrollTop > 50);

      // Add backdrop-blur when user scrolls
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Hamburger Menu Button */}
      <div
        className={`fixed z-50 px-5 py-1 md:px-10 md:py-1 flex justify-between items-center w-full transition duration-300 ${
          isScrolled ? "" : "" // Add blur only when scrolled
        }`}
      >
        <div className="w-full flex items-start z-10">
          {/* Conditionally hide the logo when menu is open */}
          <Link to="/">
            <img
              src="/logo.png"
              alt=""
              className={`w-28 md:w-36 mt-3 transition-opacity duration-300 ${
                isOpen || !showLogo ? "opacity-0 cursor-default" : "opacity-100"
              }`}
              style={{
                filter: "drop-shadow(0 0px 6px rgba(255, 255, 255, 0.1))",
              }}
            />
          </Link>
=======
  return (
    <nav
      className={`relative z-50 w-full transition-all duration-300 bg-white h-20`}
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8">
        <div className="h-full flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold text-[#1a2a47]">
              {/* <img
                src="/logo.png"
                alt="Logo"
                className="h-12 w-auto"
                style={{
                  filter: "drop-shadow(0 0px 6px rgba(0, 0, 0, 0.1))",
                }}
              /> */}
              MOOX EVENTS PVT. LTD.
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 uppercase">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className={`text-[#1a2a47] hover:text-[#d6af53] transition-colors duration-200 font-medium ${
                  location.pathname === item.link ? "text-[#d6af53]" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Social Links */}
            <div className="flex items-center space-x-4 ml-8 border-l pl-8 border-gray-200">
              <a
                href="https://www.instagram.com/mooxevents/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1a2a47] hover:text-[#d6af53] transition-colors duration-200"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.facebook.com/mooxevents/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1a2a47] hover:text-[#d6af53] transition-colors duration-200"
              >
                <FaFacebook size={24} />
              </a>
            </div>
          </div>
>>>>>>> Stashed changes
        </div>

        {/* Hamburger menu */}
        <HamburgerSquash
          toggled={isOpen}
          toggle={setIsOpen}
          size={25}
          direction="left"
          duration={0.3}
          distance="lg"
          rounded
          label="Show menu"
          color="#DBAF76"
          easing="ease-in"
        />
      </div>
<<<<<<< Updated upstream

      {/* Fullscreen Menu */}
      <animated.div
        style={menuAnimation}
        className="fixed top-0 left-0 w-full h-screen z-40 bg-gray-900 backdrop-blur-md ease-out"
      >
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end h-full py-28 px-6 sm:py-20 sm:px-10 lg:px-28">
          {/* Main Menu Items */}
          <div className="flex flex-col gap-6 sm:gap-10 w-full text-center md:text-left">
            {trail.map((style, index) => (
              <animated.a
                key={items[index].name}
                href={items[index].link}
                style={style}
                className="font-parkin font-bold text-3xl sm:text-4xl text-[#DBAF76] lg:text-5xl"
              >
                <span
                  className="relative hover:text-white transition duration-300"
                  onMouseEnter={(e) =>
                    (e.target.style.textShadow = "0px 0px 10px rgba(219, 175, 118, 0.4)")
                  }
                  onMouseLeave={(e) => (e.target.style.textShadow = "none")}
                >
                  {items[index].name}
                </span>
              </animated.a>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:flex-row gap-3 md:gap-5 mt-10 md:mt-0">
            <animated.a
              href="/instagram"
              style={trail[items.length - 2]}
              className="font-parkin font-bold text-lg sm:text-xl text-[#DBAF76] lg:text-2xl hover:text-white transition duration-300"
              onMouseEnter={(e) =>
                (e.target.style.textShadow = "0px 0px 10px #DBAF7666")
              }
              onMouseLeave={(e) => (e.target.style.textShadow = "none")}
            >
              Instagram
            </animated.a>
            <animated.a
              href="/facebook"
              style={trail[items.length - 1]}
              className="font-parkin font-bold text-lg sm:text-xl text-[#DBAF76] lg:text-2xl hover:text-white transition duration-300"
              onMouseEnter={(e) =>
                (e.target.style.textShadow = "0px 0px 10px #DBAF7666")
              }
              onMouseLeave={(e) => (e.target.style.textShadow = "none")}
            >
              Facebook
            </animated.a>
          </div>
        </div>
      </animated.div>
    </>
=======
    </nav>
>>>>>>> Stashed changes
  );
};

export default Menu;
