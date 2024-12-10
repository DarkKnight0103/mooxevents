// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
//
// const Enquiry = () => {
//     const [queries, setQueries] = useState([]);
//     const [services, setServices] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [newQuery, setNewQuery] = useState({
//         name: '',
//         mobileno: '',
//         email: '',
//         purpose_id: '',
//         purpose_name: '',
//         message: ''
//     });
//
//     useEffect(() => {
//         fetchQueries();
//         fetchServices();
//     }, []);
//
//     // Fetch the list of services dynamically
//     const fetchServices = async () => {
//         try {
//             const { data } = await axios.get(`${ip}/moox_events/api/service/get-active-services');
//             setServices(data.services);
//         } catch (error) {
//             console.error('Error fetching services:', error.message);
//         }
//     };
//
//     // Fetch all queries
//     const fetchQueries = async () => {
//         try {
//             setLoading(true);
//             const user_id = localStorage.getItem('userid');
//             const response = await axios.post(`${ip}/moox_events/api/enquiry/get-enquiry', { user_id });
//             setQueries(response.data.queries);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching queries:', error.message);
//             setLoading(false);
//         }
//     };
//
//     const resolveQuery = async (query_id) => {
//         try {
//             const user_id = localStorage.getItem('userid');
//             await axios.post(`${ip}/moox_events/api/enquiry/change-enquiry-status', { event_id: query_id, user_id });
//             alert('Query resolved successfully!');
//             fetchQueries();
//         } catch (error) {
//             console.error('Error resolving query:', error.message);
//             alert('Failed to resolve query.');
//         }
//     };
//
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setNewQuery((prev) => ({ ...prev, [name]: value }));
//     };
//
//     const handlePurposeChange = (e) => {
//         const { value } = e.target;
//         const selectedService = services.find(service => service._id === value);
//         setNewQuery(prev => ({
//             ...prev,
//             purpose_id: value,
//             purpose_name: selectedService ? selectedService.name : ''
//         }));
//     };
//
//     const handleSubmitQuery = async (e) => {
//         e.preventDefault();
//         try {
//             const { name, mobileno, email, purpose_id, purpose_name, message } = newQuery;
//             const user_id = localStorage.getItem('userid');
//             await axios.post(`${ip}/moox_events/api/enquiry/add-enquiry', { name, mobileno, email, purpose_id, purpose_name, message, user_id });
//             alert('Query submitted successfully');
//             setNewQuery({
//                 name: '',
//                 mobileno: '',
//                 email: '',
//                 purpose_id: '',
//                 purpose_name: '',
//                 message: ''
//             });
//             fetchQueries();
//         } catch (error) {
//             console.error('Error submitting query:', error.message);
//             alert('Failed to submit query.');
//         }
//     };
//
//     const latestQueries = queries.filter((query) => query.active).sort((a, b) => new Date(b.uploadedOn) - new Date(a.uploadedOn));
//     const resolvedQueries = queries.filter((query) => !query.active).sort((a, b) => new Date(b.uploadedOn) - new Date(a.uploadedOn));
//
//     return (
//         <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
//             <h1>Contact Us Queries</h1>
//             {loading ? (
//                 <p>Loading queries...</p>
//             ) : (
//                 <div style={{ display: 'flex', gap: '20px' }}>
//                     {/* Latest Queries */}
//                     <div style={{ flex: 1 }}>
//                         <h2>Latest Queries</h2>
//                         {latestQueries.length ? (
//                             latestQueries.map((query) => (
//                                 <div key={query._id} style={{
//                                     border: '1px solid #ccc',
//                                     padding: '10px',
//                                     marginBottom: '10px',
//                                     borderRadius: '5px'
//                                 }}>
//                                     <p><strong>Name:</strong> {query.name}</p>
//                                     <p><strong>Email:</strong> {query.email}</p>
//                                     <p><strong>Mobile:</strong> {query.mobileno}</p>
//                                     <p><strong>Purpose:</strong> {query.purpose_name}</p>
//                                     <p><strong>Message:</strong> {query.message}</p>
//                                     <p><strong>Date:</strong> {new Date(query.uploadedOn).toLocaleString()}</p>
//                                     <button
//                                         onClick={() => resolveQuery(query._id)}
//                                         style={{
//                                             backgroundColor: 'green',
//                                             color: 'white',
//                                             padding: '5px 10px',
//                                             border: 'none',
//                                             cursor: 'pointer'
//                                         }}
//                                     >
//                                         Mark as Resolved
//                                     </button>
//                                 </div>
//                             ))
//                         ) : (
//                             <p>No latest queries available.</p>
//                         )}
//                     </div>
//
//                     {/* Resolved Queries */}
//                     <div style={{ flex: 1 }}>
//                         <h2>Resolved Queries</h2>
//                         {resolvedQueries.length ? (
//                             resolvedQueries.map((query) => (
//                                 <div key={query._id} style={{
//                                     border: '1px solid #ccc',
//                                     padding: '10px',
//                                     marginBottom: '10px',
//                                     borderRadius: '5px'
//                                 }}>
//                                     <p><strong>Name:</strong> {query.name}</p>
//                                     <p><strong>Email:</strong> {query.email}</p>
//                                     <p><strong>Mobile:</strong> {query.mobileno}</p>
//                                     <p><strong>Purpose:</strong> {query.purpose_name}</p>
//                                     <p><strong>Message:</strong> {query.message}</p>
//                                     <p><strong>Date:</strong> {new Date(query.uploadedOn).toLocaleString()}</p>
//                                     <p><strong>Resolved Date:</strong> {new Date(query.resolvedOn).toLocaleString()}</p>
//                                     <p style={{color: 'green'}}><strong>Status:</strong> Resolved</p>
//                                 </div>
//                             ))
//                         ) : (
//                             <p>No resolved queries available.</p>
//                         )}
//                     </div>
//                 </div>
//             )}
//
//             {/* Add Query Form */}
//             <form onSubmit={handleSubmitQuery} style={{ marginTop: '20px' }}>
//                 <h2>Submit a Query</h2>
//                 <input type="text" name="name" value={newQuery.name} onChange={handleInputChange} placeholder="Your Name" required />
//                 <input type="text" name="mobileno" value={newQuery.mobileno} onChange={handleInputChange} placeholder="Your Mobile Number" required />
//                 <input type="email" name="email" value={newQuery.email} onChange={handleInputChange} placeholder="Your Email" required />
//                 <select name="purpose_id" value={newQuery.purpose_id} onChange={handlePurposeChange} required>
//                     <option value="">Select Purpose</option>
//                     {services.map((service) => (
//                         <option key={service._id} value={service._id}>
//                             {service.name}
//                         </option>
//                     ))}
//                 </select>
//                 <input type="text" name="purpose_name" value={newQuery.purpose_name} onChange={handleInputChange} placeholder="Purpose Name" required readOnly />
//                 <textarea name="message" value={newQuery.message} onChange={handleInputChange} placeholder="Your Message" required />
//                 <button type="submit" style={{ backgroundColor: 'blue', color: 'white', padding: '10px 15px' }}>Submit</button>
//             </form>
//         </div>
//     );
// };
//
// export default Enquiry;





import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Enquiry = () => {
    const ip = import.meta.env.VITE_IP;
    const [queries, setQueries] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newQuery, setNewQuery] = useState({
        name: '',
        mobileno: '',
        email: '',
        purpose_id: '',
        purpose_name: '',
        message: ''
    });

    useEffect(() => {
        fetchQueries();
        fetchServices();
    }, []);

    // Fetch the list of services dynamically
    const fetchServices = async () => {
        try {
            const { data } = await axios.get(`${ip}/moox_events/api/service/get-active-services`);
            setServices(data.services);
        } catch (error) {
            console.error('Error fetching services:', error.message);
        }
    };

    // Fetch all queries
    const fetchQueries = async () => {
        try {
            setLoading(true);
            const user_id = localStorage.getItem('userid');
            const response = await axios.post(`${ip}/moox_events/api/enquiry/get-enquiry`, { user_id });
            setQueries(response.data.queries);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching queries:', error.message);
            setLoading(false);
        }
    };

    const resolveQuery = async (query_id) => {
        try {
            const user_id = localStorage.getItem('userid');
            await axios.post(`${ip}/moox_events/api/enquiry/change-enquiry-status`, { event_id: query_id, user_id });
            alert('Query resolved successfully!');
            fetchQueries();
        } catch (error) {
            console.error('Error resolving query:', error.message);
            alert('Failed to resolve query.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewQuery((prev) => ({ ...prev, [name]: value }));
    };

    const handlePurposeChange = (e) => {
        const { value } = e.target;
        const selectedService = services.find(service => service._id === value);
        setNewQuery(prev => ({
            ...prev,
            purpose_id: value,
            purpose_name: selectedService ? selectedService.name : ''
        }));
    };

    const handleSubmitQuery = async (e) => {
        e.preventDefault();
        try {
            const { name, mobileno, email, purpose_id, purpose_name, message } = newQuery;
            const user_id = localStorage.getItem('userid');
            await axios.post(`${ip}/moox_events/api/enquiry/add-enquiry`, { name, mobileno, email, purpose_id, purpose_name, message, user_id });
            alert('Query submitted successfully');
            setNewQuery({
                name: '',
                mobileno: '',
                email: '',
                purpose_id: '',
                purpose_name: '',
                message: ''
            });
            fetchQueries();
        } catch (error) {
            console.error('Error submitting query:', error.message);
            alert('Failed to submit query.');
        }
    };

    const latestQueries = queries.filter((query) => query.active).sort((a, b) => new Date(b.uploadedOn) - new Date(a.uploadedOn));
    const resolvedQueries = queries.filter((query) => !query.active).sort((a, b) => new Date(b.uploadedOn) - new Date(a.uploadedOn));

    return (
        <div className="font-sans p-6 bg-gray-50">
            <h1 className="text-3xl font-semibold text-gray-900 mb-6">Contact Us Queries</h1>
            {loading ? (
                <p className="text-gray-700">Loading queries...</p>
            ) : (
                <div className="flex gap-6">
                    {/* Latest Queries */}
                    <div className="flex-1">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Latest Queries</h2>
                        {latestQueries.length ? (
                            latestQueries.map((query) => (
                                <div key={query._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                                    <p><strong className="font-semibold">Name:</strong> {query.name}</p>
                                    <p><strong className="font-semibold">Email:</strong> {query.email}</p>
                                    <p><strong className="font-semibold">Mobile:</strong> {query.mobileno}</p>
                                    <p><strong className="font-semibold">Purpose:</strong> {query.purpose_name}</p>
                                    <p><strong className="font-semibold">Message:</strong> {query.message}</p>
                                    <p><strong className="font-semibold">Date:</strong> {new Date(query.uploadedOn).toLocaleString()}</p>
                                    <button
                                        onClick={() => resolveQuery(query._id)}
                                        className="bg-green-600 text-white px-4 py-2 rounded-md mt-2 hover:bg-green-700"
                                    >
                                        Mark as Resolved
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No latest queries available.</p>
                        )}
                    </div>

                    {/* Resolved Queries */}
                    <div className="flex-1">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Resolved Queries</h2>
                        {resolvedQueries.length ? (
                            resolvedQueries.map((query) => (
                                <div key={query._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                                    <p><strong className="font-semibold">Name:</strong> {query.name}</p>
                                    <p><strong className="font-semibold">Email:</strong> {query.email}</p>
                                    <p><strong className="font-semibold">Mobile:</strong> {query.mobileno}</p>
                                    <p><strong className="font-semibold">Purpose:</strong> {query.purpose_name}</p>
                                    <p><strong className="font-semibold">Message:</strong> {query.message}</p>
                                    <p><strong className="font-semibold">Date:</strong> {new Date(query.uploadedOn).toLocaleString()}</p>
                                    <p><strong className="font-semibold">Resolved Date:</strong> {new Date(query.resolvedOn).toLocaleString()}</p>
                                    <p className="text-green-600 font-semibold">Status: Resolved</p>
                                </div>
                            ))
                        ) : (
                            <p>No resolved queries available.</p>
                        )}
                    </div>
                </div>
            )}

            {/* Add Query Form */}
            <form onSubmit={handleSubmitQuery} className="mt-8 space-y-6 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Submit a Query</h2>
                <input
                    type="text"
                    name="name"
                    value={newQuery.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="mobileno"
                    value={newQuery.mobileno}
                    onChange={handleInputChange}
                    placeholder="Your Mobile Number"
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="email"
                    name="email"
                    value={newQuery.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    name="purpose_id"
                    value={newQuery.purpose_id}
                    onChange={handlePurposeChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select Purpose</option>
                    {services.map((service) => (
                        <option key={service._id} value={service._id}>
                            {service.name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    name="purpose_name"
                    value={newQuery.purpose_name}
                    onChange={handleInputChange}
                    placeholder="Purpose Name"
                    required
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    name="message"
                    value={newQuery.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Enquiry;
