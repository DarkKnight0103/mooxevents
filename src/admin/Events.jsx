// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
//
// const EventManagement = () => {
//     const [events, setEvents] = useState([]);
//     const [services, setServices] = useState([]);
//     const [newEvent, setNewEvent] = useState({
//         title: '',
//         description: '',
//         event_date: '',
//         event_type: '',
//         photo: null,
//     });
//
//     // Fetch all events
//     const fetchEvents = async () => {
//         try {
//             const user_id = localStorage.getItem('userid');
//             if (!user_id) {
//                 alert('User not authenticated.');
//                 return;
//             }
//             const { data } = await axios.post(`${ip}/moox_events/api/event/get-events', { user_id });
//             setEvents(data.events);
//         } catch (error) {
//             console.error('Error fetching events:', error);
//         }
//     };
//
//     // Fetch active services for dropdown
//     const fetchServices = async () => {
//         try {
//             const { data } = await axios.get(`${ip}/moox_events/api/service/get-active-services');
//             setServices(data.services);
//         } catch (error) {
//             console.error('Error fetching services:', error);
//         }
//     };
//
//     // Handle adding a new event
//     const handleAddEvent = async () => {
//         try {
//             const user_id = localStorage.getItem('userid');
//             if (!user_id) {
//                 alert('User not authenticated.');
//                 return;
//             }
//             const formData = { ...newEvent, user_id, photo: newEvent.photo.split(',')[1] };
//             await axios.post(`${ip}/moox_events/api/event/add-event', formData);
//             fetchEvents();
//         } catch (error) {
//             console.error('Error adding event:', error);
//         }
//     };
//
//     // Handle toggling event status
//     const handleToggleStatus = async (id, status) => {
//         try {
//             const user_id = localStorage.getItem('userid');
//             if (!user_id) {
//                 alert('User not authenticated.');
//                 return;
//             }
//             await axios.post(`${ip}/moox_events/api/event/change-event-status', { event_id: id, status: !status, user_id });
//             fetchEvents();
//         } catch (error) {
//             console.error('Error toggling event status:', error);
//         }
//     };
//
//     useEffect(() => {
//         fetchEvents();
//         fetchServices();
//     }, []);
//
//     return (
//         <div>
//             <h1>Event Management</h1>
//
//             {/* Add New Event */}
//             <div>
//                 <h2>Add Event</h2>
//                 <input
//                     type="text"
//                     placeholder="Title"
//                     value={newEvent.title}
//                     onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
//                 />
//                 <input
//                     type="text"
//                     placeholder="Description"
//                     value={newEvent.description}
//                     onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
//                 />
//                 <input
//                     type="date"
//                     value={newEvent.event_date}
//                     onChange={(e) => setNewEvent({ ...newEvent, event_date: e.target.value })}
//                 />
//
//                 {/* Dropdown for Active Services */}
//                 <select
//                     value={newEvent.event_type}
//                     onChange={(e) => setNewEvent({ ...newEvent, event_type: e.target.value })}
//                 >
//                     <option value="">Select Service</option>
//                     {services.map((service) => (
//                         <option key={service._id} value={service._id}>
//                             {service.name}
//                         </option>
//                     ))}
//                 </select>
//
//                 <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => {
//                         const reader = new FileReader();
//                         reader.onload = () => setNewEvent({ ...newEvent, photo: reader.result });
//                         reader.readAsDataURL(e.target.files[0]);
//                     }}
//                 />
//                 <button onClick={handleAddEvent}>Add Event</button>
//             </div>
//
//             {/* Display Events */}
//             <div>
//                 <h2>Events</h2>
//                 {events.map((event) => (
//                     <div key={event._id}>
//                         <h3>{event.title}</h3>
//                         <p>{event.description}</p>
//                         <p>Date: {new Date(event.event_date).toLocaleDateString()}</p>
//                         <img src={event.photo} alt={event.title} style={{ width: '100px' }} />
//                         <p>Status: {event.active ? 'Active' : 'Inactive'}</p>
//                         <button onClick={() => handleToggleStatus(event._id, event.active)}>
//                             {event.active ? 'Deactivate' : 'Activate'}
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default EventManagement;



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventManagement = () => {
    const ip = import.meta.env.VITE_IP;
    const [events, setEvents] = useState([]);
    const [services, setServices] = useState([]);
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        event_date: '',
        event_type: '',
        photo: null,
    });

    const fetchEvents = async () => {
        try {
            const user_id = localStorage.getItem('userid');
            if (!user_id) {
                alert('User not authenticated.');
                return;
            }
            const { data } = await axios.post(`${ip}/moox_events/api/event/get-events`, { user_id });
            setEvents(data.events);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const fetchServices = async () => {
        try {
            const { data } = await axios.get(`${ip}/moox_events/api/service/get-active-services`);
            setServices(data.services);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const handleAddEvent = async () => {
        try {
            const user_id = localStorage.getItem('userid');
            if (!user_id) {
                alert('User not authenticated.');
                return;
            }
            const formData = { ...newEvent, user_id, photo: newEvent.photo.split(',')[1] };
            await axios.post(`${ip}/moox_events/api/event/add-event`, formData);
            fetchEvents();
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    const handleToggleStatus = async (id, status) => {
        try {
            const user_id = localStorage.getItem('userid');
            if (!user_id) {
                alert('User not authenticated.');
                return;
            }
            await axios.post(`${ip}/moox_events/api/event/change-event-status`, { event_id: id, status: !status, user_id });
            fetchEvents();
        } catch (error) {
            console.error('Error toggling event status:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
        fetchServices();
    }, []);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-semibold text-gray-900 mb-6">Event Management</h1>

            {/* Add New Event */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Event</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
                    />
                    <input
                        type="date"
                        value={newEvent.event_date}
                        onChange={(e) => setNewEvent({ ...newEvent, event_date: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
                    />
                    <select
                        value={newEvent.event_type}
                        onChange={(e) => setNewEvent({ ...newEvent, event_type: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
                    >
                        <option value="">Select Service</option>
                        {services.map((service) => (
                            <option key={service._id} value={service._id}>
                                {service.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const reader = new FileReader();
                            reader.onload = () => setNewEvent({ ...newEvent, photo: reader.result });
                            reader.readAsDataURL(e.target.files[0]);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
                    />
                </div>
                <button
                    onClick={handleAddEvent}
                    className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:ring focus:ring-indigo-300"
                >
                    Add Event
                </button>
            </div>

            {/* Display Events */}
            <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div
                            key={event._id}
                            className="p-4 bg-white rounded-md shadow-md hover:shadow-lg transition"
                        >
                            <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                            <p className="text-sm text-gray-600">{event.description}</p>
                            <p className="text-sm text-gray-600">Date: {new Date(event.event_date).toLocaleDateString()}</p>
                            <img
                                src={event.photo}
                                alt={event.title}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <p className="text-sm text-gray-600">
                                <strong>Status:</strong> {event.active ? 'Active' : 'Inactive'}
                            </p>
                            <div className="mt-4">
                                <button
                                    onClick={() => handleToggleStatus(event._id, event.active)}
                                    className={`w-full px-4 py-2 rounded-md text-white shadow focus:ring ${
                                        event.active
                                            ? 'bg-red-500 hover:bg-red-600 focus:ring-red-300'
                                            : 'bg-green-500 hover:bg-green-600 focus:ring-green-300'
                                    }`}
                                >
                                    {event.active ? 'Deactivate' : 'Activate'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventManagement;
