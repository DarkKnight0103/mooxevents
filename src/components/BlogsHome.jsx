import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { X, User, Calendar, Clock } from "lucide-react";

const BlogCard = ({ blog, onViewPost }) => {
  return (
    <div className="w-full h-[400px] bg-transparent overflow-hidden">
      <div className="relative h-[250px]">
        {/* Dark Shade Overlay */}
        <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

        {/* Tags Positioned Over Image */}
        <div className="absolute top-4 left-4 flex space-x-2 z-10">
          {blog.tags?.split(',').map((tag, index) => (
            <span
              key={index}
              className="backdrop-blur-sm bg-white/20 text-white text-xxs px-3 py-2 rounded"
            >
              {tag.trim()}
            </span>
          ))}
        </div>

        {/* Image */}
        <img
          className="w-full h-60 object-cover z-10"
          src={blog.photo1}
          alt={blog.title}
        />

        {/* Overlay at the Bottom of the Image */}
        <div className="absolute bottom-0 left-0 w-full h-16 backdrop-blur-md border-t-1 border-white border-opacity-50 bg-white/30 text-white p-4 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                className="w-7 h-7 rounded-full border-white"
                src={blog.profile_photo || '/default-profile.jpg'}
                alt="Author"
              />
              <div>
                <p className="text-sm font-semibold leading-none">
                  {blog.author}
                </p>
                <p className="text-xs mt-1 text-white font-light leading-none">
                  {new Date(blog.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            {/* Read Time */}
            <p className="text-xs font-light text-white mb-2">
              {blog.read_time}
            </p>
          </div>
        </div>
      </div>

      {/* Content Below Image */}
      <div className="p-4">
        <div>
          <h2 className="text-lg font-medium mb-2">{blog.title}</h2>
          <p className="text-sm text-gray-600 mb-4">
          {blog.description.split(" ").slice(0, 10).join(" ")}...
          </p>
        </div>
        <div className="text-black font-medium flex items-center space-x-1 hover:underline cursor-pointer">
          <button onClick={() => onViewPost(blog)}>View Post</button>
          <svg
            className="w-4 h-4 -rotate-45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

const BlogPopup = ({ blog, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Create an array of available photos
  const blogImages = [
    blog.photo1,
    blog.photo2,
    blog.photo3,
    blog.photo4,
    blog.photo5
  ].filter(Boolean); // Filter out null/undefined values

  return (
    <div
      className={`fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4 popup-overlay ${
        isClosing ? "closing" : ""
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-white w-11/12 max-w-3xl rounded-2xl overflow-hidden shadow-xl popup-content ${
          isClosing ? "closing" : ""
        } max-h-[90vh] flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-[40vh]">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 bg-white/90 p-2 rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <Slider {...sliderSettings} className="blog-slider">
            {blogImages.map((image, index) => (
              <div key={index} className="relative h-[40vh]">
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-10"></div>
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags?.split(',').map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors duration-300"
              >
                {tag.trim()}
              </span>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-3 text-gray-800">
            {blog.title}
          </h2>

          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            {blog.description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-300">
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <img
                  src={blog.profile_photo || '/default-profile.jpg'}
                  alt={blog.author}
                  className="w-10 h-10 rounded-full border-2 border-gray-200 group-hover:border-gray-300 transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-full bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors duration-300">
                    {blog.author}
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(blog.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <span>•</span>
                  <div className="text-sm flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{blog.read_time}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogList = ({ selectedCategory, onDataLoaded }) => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const ip = import.meta.env.VITE_IP;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const user_id = localStorage.getItem("userid");
        if (!user_id) {
          console.error("User not authenticated");
          setIsLoading(false);
          return;
        }

        const response = await axios.post(
          `${ip}/moox_events/api/blogs/get-blogs`,
          { user_id }
        );

        // Filter only active blogs
        const activeBlogs = response.data.blogs.filter(blog => blog.active);
        setBlogs(activeBlogs);
        setIsLoading(false);
        
        if (onDataLoaded) {
          onDataLoaded();
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [ip, onDataLoaded]);

  const handleViewPost = (blog) => {
    setSelectedBlog(blog);
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
    setSelectedBlog(null);
  };

  // Filter blogs based on selected category
  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.categoryName === selectedCategory);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {filteredBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} onViewPost={handleViewPost} />
        ))}
      </div>

      {isPopupVisible && selectedBlog && (
        <BlogPopup blog={selectedBlog} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default BlogList;