// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
//
// const ContactUs = () => {
//     const [queries, setQueries] = useState([]);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         fetchQueries();
//     }, []);
//
//     const fetchQueries = async () => {
//         try {
//             setLoading(true);
//             const user_id = localStorage.getItem('userid'); // Replace with actual user ID
//             const response = await axios.post(`http://${ip}/moox_events/api/contactus/get-queries', { user_id });
//             setQueries(response.data.queries);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching queries:', error.message);
//             setLoading(false);
//         }
//     };
//
//     const resolveQuery = async (event_id) => {
//         try {
//             const user_id = localStorage.getItem('userid'); // Replace with actual user ID
//             await axios.post(`http://${ip}/moox_events/api/contactus/change-query-status', { event_id, user_id });
//             alert('Query resolved successfully!');
//             fetchQueries(); // Refresh the queries
//         } catch (error) {
//             console.error('Error resolving query:', error.message);
//             alert('Failed to resolve query.');
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
//                                 <div key={query._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
//                                     <p><strong>Name:</strong> {query.name}</p>
//                                     <p><strong>Email:</strong> {query.email}</p>
//                                     <p><strong>Mobile:</strong> {query.mobileno}</p>
//                                     <p><strong>Purpose:</strong> {query.purpose}</p>
//                                     <p><strong>Date:</strong> {new Date(query.uploadedOn).toLocaleString()}</p>
//                                     <button
//                                         onClick={() => resolveQuery(query._id)}
//                                         style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer' }}
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
//                                     <p><strong>Purpose:</strong> {query.purpose}</p>
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
//         </div>
//     );
// };
//
// export default ContactUs;







import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContactUs = () => {
    const ip = import.meta.env.VITE_IP;
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchQueries();
    }, []);

    const fetchQueries = async () => {
        try {
            setLoading(true);
            const user_id = localStorage.getItem('userid'); // Replace with actual user ID
            const response = await axios.post(`http://${ip}/moox_events/api/contactus/get-queries`, { user_id });
            setQueries(response.data.queries);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching queries:', error.message);
            setLoading(false);
        }
    };

    const resolveQuery = async (event_id) => {
        try {
            const user_id = localStorage.getItem('userid'); // Replace with actual user ID
            await axios.post(`http://${ip}/moox_events/api/contactus/change-query-status`, { event_id, user_id });
            alert('Query resolved successfully!');
            fetchQueries(); // Refresh the queries
        } catch (error) {
            console.error('Error resolving query:', error.message);
            alert('Failed to resolve query.');
        }
    };

    const latestQueries = queries.filter((query) => query.active).sort((a, b) => new Date(b.uploadedOn) - new Date(a.uploadedOn));
    const resolvedQueries = queries.filter((query) => !query.active).sort((a, b) => new Date(b.uploadedOn) - new Date(a.uploadedOn));

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-semibold text-gray-900 mb-6">Contact Us Queries</h1>
            {loading ? (
                <div className="text-center">Loading queries...</div>
            ) : (
                <div className="flex gap-8">
                    {/* Latest Queries */}
                    <div className="flex-1">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Latest Queries</h2>
                        {latestQueries.length ? (
                            latestQueries.map((query) => (
                                <div key={query._id} className="mb-4 p-4 bg-white rounded-md shadow-md hover:shadow-lg transition">
                                    <p><strong className="text-gray-700">Name:</strong> {query.name}</p>
                                    <p><strong className="text-gray-700">Email:</strong> {query.email}</p>
                                    <p><strong className="text-gray-700">Mobile:</strong> {query.mobileno}</p>
                                    <p><strong className="text-gray-700">Purpose:</strong> {query.purpose}</p>
                                    <p><strong className="text-gray-700">Date:</strong> {new Date(query.uploadedOn).toLocaleString()}</p>
                                    <button
                                        onClick={() => resolveQuery(query._id)}
                                        className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 focus:ring focus:ring-green-300"
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
                                <div key={query._id} className="mb-4 p-4 bg-white rounded-md shadow-md hover:shadow-lg transition">
                                    <p><strong className="text-gray-700">Name:</strong> {query.name}</p>
                                    <p><strong className="text-gray-700">Email:</strong> {query.email}</p>
                                    <p><strong className="text-gray-700">Mobile:</strong> {query.mobileno}</p>
                                    <p><strong className="text-gray-700">Purpose:</strong> {query.purpose}</p>
                                    <p><strong className="text-gray-700">Date:</strong> {new Date(query.uploadedOn).toLocaleString()}</p>
                                    <p><strong className="text-gray-700">Resolved Date:</strong> {new Date(query.resolvedOn).toLocaleString()}</p>
                                    <p className="text-green-600 font-semibold"><strong>Status:</strong> Resolved</p>
                                </div>
                            ))
                        ) : (
                            <p>No resolved queries available.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactUs;












