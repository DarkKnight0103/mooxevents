// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
//
// const AddService = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         description: '',
//     });
//     const [photo, setPhoto] = useState(null);
//     const [message, setMessage] = useState('');
//     const [services, setServices] = useState([]);
//
//     // Fetch all services when the component mounts
//     useEffect(() => {
//         const fetchServices = async () => {
//             try {
//                 const userId = localStorage.getItem('userid');
//                 const response = await axios.post(`${ip}/moox_events/moox_events/api/service/get-service', {
//                     user_id: userId,
//                 });
//                 setServices(response.data.events);
//             } catch (error) {
//                 setMessage('Failed to load services. ' + error.response?.data?.message || error.message);
//             }
//         };
//
//         fetchServices();
//     }, []);
//
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };
//
//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.readAsDataURL(file);
//             reader.onloadend = () => {
//                 setPhoto(reader.result.split(',')[1]); // Store only the Base64 string without the prefix
//             };
//         }
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//
//         if (!photo) {
//             setMessage('Please upload a photo.');
//             return;
//         }
//
//         try {
//             const userId = localStorage.getItem('userid');
//             const response = await axios.post(`${ip}/moox_events/moox_events/api/service/add-service', {
//                 user_id: userId,
//                 name: formData.name,
//                 description: formData.description,
//                 photo: photo, // Send the Base64 photo string as buffer
//             });
//
//             setMessage(response.data.message);
//             setServices([...services, response.data.service]); // Add new service to the list
//         } catch (error) {
//             setMessage('Failed to add service. ' + error.response?.data?.message || error.message);
//         }
//     };
//
//     const handleStatusChange = async (serviceId, currentStatus) => {
//         try {
//             const userId = localStorage.getItem('userid');
//             const response = await axios.post(`${ip}/moox_events/moox_events/api/service/change-service-status', {
//                 event_id: serviceId,
//                 status: !currentStatus, // Toggle the status
//                 user_id: userId,
//             });
//
//             setMessage(response.data.message);
//             // Update the services list with the new status
//             const updatedServices = services.map(service =>
//                 service._id === serviceId ? { ...service, status: !currentStatus } : service
//             );
//             setServices(updatedServices);
//         } catch (error) {
//             setMessage('Failed to update status. ' + error.response?.data?.message || error.message);
//         }
//     };
//
//     return (
//         <div style={{ margin: '2rem' }}>
//             <h2>Add Service</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Name:</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Description:</label>
//                     <textarea
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div>
//                     <label>Photo:</label>
//                     <input type="file" accept="image/*" onChange={handleFileChange} required />
//                 </div>
//                 <button type="submit">Add Service</button>
//             </form>
//             {message && <p>{message}</p>}
//
//             <h2>All Services</h2>
//             <div>
//                 {services.map(service => (
//                     <div key={service._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
//                         <h3>{service.name}</h3>
//                         <p>{service.description}</p>
//                         <img
//                             src={`data:image/png;base64,${service.photo}`} // Ensure the correct MIME type and Base64 string
//                             alt={service.name}
//                             width="100"
//                             onError={() => console.log('Image failed to load')} // Add an error handler for debugging
//                         />
//                         <p>Status: {service.status ? 'Active' : 'Inactive'}</p>
//                         <button onClick={() => handleStatusChange(service._id, service.status)}>
//                             {service.status ? 'Deactivate' : 'Activate'}
//                         </button>
//                     </div>
//                 ))}
//
//             </div>
//         </div>
//     );
// };
//
// export default AddService;



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddService = () => {
    const ip = import.meta.env.VITE_IP;
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });
    const [photo, setPhoto] = useState(null);
    const [message, setMessage] = useState('');
    const [services, setServices] = useState([]);
    const [notification, setNotification] = useState('');

    // Fetch all services when the component mounts
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const userId = localStorage.getItem('userid');
                const response = await axios.post(`${ip}/moox_events/moox_events/api/service/get-service`, {
                    user_id: userId,
                });
                setServices(response.data.events);
            } catch (error) {
                setMessage('Failed to load services. ' + (error.response?.data?.message || error.message));
            }
        };

        fetchServices();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setPhoto(reader.result.split(',')[1]);
            };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!photo) {
            setMessage('Please upload a photo.');
            return;
        }

        try {
            const userId = localStorage.getItem('userid');
            const response = await axios.post(`${ip}/moox_events/moox_events/api/service/add-service`, {
                user_id: userId,
                name: formData.name,
                description: formData.description,
                photo: photo,
            });

            setMessage(response.data.message);
            setServices([...services, response.data.service]);
        } catch (error) {
            setMessage('Failed to add service. ' + (error.response?.data?.message || error.message));
        }
    };

    const handleStatusChange = async (serviceId, currentStatus) => {
        try {
            const userId = localStorage.getItem('userid');
            const response = await axios.post(`${ip}/moox_events/moox_events/api/service/change-service-status`, {
                event_id: serviceId,
                status: !currentStatus,
                user_id: userId,
            });

            setNotification(response.data.message);
            setTimeout(() => {
                setNotification('');
            }, 2000);

            const updatedServices = services.map(service =>
                service._id === serviceId ? { ...service, status: !currentStatus } : service
            );
            setServices(updatedServices);
        } catch (error) {
            setNotification('Failed to update status. ' + (error.response?.data?.message || error.message));
            setTimeout(() => {
                setNotification('');
            }, 2000);
        }
    };

    return (
        <div className="mx-8 my-6">
            {/* Header */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Service</h2>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div>
                    <label className="block text-gray-600 font-medium mb-2">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-gray-600 font-medium mb-2">Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-gray-600 font-medium mb-2">Photo:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                    Add Service
                </button>
            </form>

            {message && (
                <p className="mt-4 text-center text-green-600 bg-green-100 py-2 px-4 rounded-lg">
                    {message}
                </p>
            )}

            {/* Services Section */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">All Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map(service => (
                    <div
                        key={service._id}
                        className="bg-white border border-gray-200 rounded-lg shadow-lg p-4"
                    >
                        <h3 className="text-xl font-semibold text-gray-800">{service.name}</h3>
                        <p className="text-gray-600 mt-2">{service.description}</p>
                        <img
                            src={`data:image/png;base64,${service.photo}`}
                            alt={service.name}
                            className="w-full h-40 object-cover rounded-lg mt-4"
                        />
                        <p className="mt-4 text-sm text-gray-700">
                            Status: <span className={service.status ? "text-green-500" : "text-red-500"}>
                                {service.status ? 'Active' : 'Inactive'}
                            </span>
                        </p>
                        <button
                            onClick={() => handleStatusChange(service._id, service.status)}
                            className={`mt-4 px-4 py-2 w-full rounded-lg transition ${
                                service.status
                                    ? 'bg-red-500 text-white hover:bg-red-600'
                                    : 'bg-green-500 text-white hover:bg-green-600'
                            }`}
                        >
                            {service.status ? 'Deactivate' : 'Activate'}
                        </button>
                    </div>
                ))}
            </div>

            {/* Notification */}
            {notification && (
                <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg">
                    {notification}
                </div>
            )}
        </div>
    );
};

export default AddService;
