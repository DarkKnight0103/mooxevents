import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Gallery.css";

const GalleryHome = ({ onGalleryLoadComplete }) => {
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [galleryItems, setGalleryItems] = useState([]);
  const ip = import.meta.env.VITE_IP;

  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  // Fetch gallery data from the API
  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await axios.post(`http://${ip}/moox_events/api/gallery/get-all-photos`);
        const data = response.data;

        if (data.clients) {
          // Assuming `clients` is an array containing gallery items
          const items = data.clients.map((client) => ({
            type: client.logo ? "image" : "video", // Determine type based on whether the logo exists
            src: client.logo, // Assuming 'logo' is the URL for images or videos
          }));
          setGalleryItems(items);

          // Notify the parent that loading is complete
          if (onGalleryLoadComplete) {
            onGalleryLoadComplete();
          }
        }
      } catch (error) {
        console.error("Error fetching gallery items:", error);
      }
    };

    fetchGalleryItems();
  }, [onGalleryLoadComplete]);

  return (
    <div>
      <div id="gallery" className="gallery-container">
        {galleryItems.length === 0 ? (
          <p>Loading gallery...</p> // Show loading text when data is not available
        ) : (
          galleryItems.map((item, index) => (
            item.type === "image" ? (
              <img
                key={index}
                src={item.src}
                alt={`Gallery item ${index + 1}`}
                className="gallery-item"
                onClick={() => openModal(<img src={item.src} alt="Modal Content" className="modal-img w-[90vh] h-[90vh] object-cover" />)}
              />
            ) : (
              <video
                key={index}
                className="gallery-item"
                controls
                onClick={() =>
                  openModal(
                    <video className="modal-vid" controls>
                      <source src={item.src} type="video/mp4" />
                    </video>
                  )
                }
              >
                <source src={item.src} type="video/mp4" />
              </video>
            )
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div id="myModal" className="modal" onClick={closeModal}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-body">
                {modalContent}
                <button onClick={closeModal} className="close-modal-btn">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryHome;
