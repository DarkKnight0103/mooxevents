import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import axios from 'axios';

const ServiceHome = ({ category }) => {
    const [services, setServices] = useState([]); // State for services
    const [loading, setLoading] = useState(true); // Loading state
    const ip = import.meta.env.VITE_IP; // Get the IP from environment variables

    // Define responsive options for the carousel
    const responsiveOptions = [
        { breakpoint: '1400px', numVisible: 3, numScroll: 1 },
        { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
        { breakpoint: '767px', numVisible: 2, numScroll: 1 },
        { breakpoint: '575px', numVisible: 1, numScroll: 1 }
    ];

    // Fetch services from the API
    useEffect(() => {
        const fetchServicesData = async () => {
            try {
                const response = await axios.get(`http://${ip}/moox_events/api/service/services`);
                const data = response.data;

                if (data.events) {
                    setServices(data.events); // Set services data in state
                    setLoading(false); // Stop loading once data is fetched
                }
            } catch (error) {
                console.error('Error fetching service data:', error);
                setLoading(false); // Stop loading if there's an error
            }
        };

        fetchServicesData(); // Call the function to fetch data
    }, [ip]); // Fetch data again if IP changes

    // Template for rendering each service card
    const serviceTemplate = (service) => {
        return (
            <div className="p-4 flex flex-col bg-white rounded-lg shadow-lg transition-all duration-300 mx-3">
                <div className="relative flex-1 flex justify-center gap-3 flex-col min-h-80 mx-3">
                    <div className='w-full h-52'>
                        <img src={service.image} alt={service.title} className="w-full h-full object-cover rounded-lg mb-4" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h4>
                    <p className="text-sm text-gray-600 mb-4">{service.status}</p>
                </div>
                <Button 
                    label="ENQUIRE NOW" 
                    icon="pi pi-comment" 
                    className="font-bold font-parkin bg-[#DBAF76] text-white border-none py-2 px-4 rounded-lg hover:bg-[#e1a453] hover:text-white transition-all duration-300" 
                    onClick={() => handleEnquire(service.id)} 
                />
            </div>
        );
    };

    // Handle Enquire button click
    const handleEnquire = (serviceId) => {
        alert(`Enquiring about service ID: ${serviceId}`);
        // Here you can implement the logic for enquiring (e.g., open a modal, redirect, etc.)
    };

    if (loading) {
        return <div className="text-center py-4">Loading...</div>; // Show loading message while fetching data
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className="card p-4 w-[80%]">
                {/* Display the passed category */}
                <div className="mb-4 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">{category}</h2>
                </div>

                <Carousel value={services} numScroll={1} numVisible={3} autoplayInterval={2000} responsiveOptions={responsiveOptions} itemTemplate={serviceTemplate} />
            </div>
        </div>
    );
};

export default ServiceHome;
