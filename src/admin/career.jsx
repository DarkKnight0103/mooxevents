// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
//
// const CareerManagement = () => {
//     const [positions, setPositions] = useState([]);
//     const [applications, setApplications] = useState([]);
//     const [selectedPosition, setSelectedPosition] = useState(null);
//     const [newPosition, setNewPosition] = useState({ position_name: '', description: '',location:'', requirements: '' });
//
//     // Fetch all positions
//     const fetchPositions = async () => {
//         try {
//             const user_id = localStorage.getItem('userid');
//             if (!user_id) {
//                 alert('User not authenticated.');
//                 return;
//             }
//             const { data } = await axios.post('/moox_events/api/career/all', { user_id });
//             setPositions(data.events);
//         } catch (error) {
//             console.error('Error fetching positions:', error);
//             alert('Failed to fetch positions.');
//         }
//     };
//
//     // Toggle position active/inactive status
//     const togglePositionStatus = async (id) => {
//         try {
//             const user_id = localStorage.getItem('userid');
//             if (!user_id) {
//                 alert('User not authenticated.');
//                 return;
//             }
//             await axios.post(`/moox_events/api/career/toggle`, { user_id ,id});
//             fetchPositions();
//         } catch (error) {
//             console.error('Error toggling position status:', error);
//             alert('Failed to update position status.');
//         }
//     };
//
//     // Fetch all applications for a specific position
//     const fetchApplications = async (positionId) => {
//         try {
//             const user_id = localStorage.getItem('userid');
//             if (!user_id) {
//                 alert('User not authenticated.');
//                 return;
//             }
//             const { data } = await axios.post(`/moox_events/api/career/applications`, { user_id,position_id:positionId });
//             setApplications(data);
//             setSelectedPosition(positionId);
//         } catch (error) {
//             console.error('Error fetching applications:', error);
//             alert('Failed to fetch applications.');
//         }
//     };
//
//     // Add a new career position
//     const handleAddPosition = async () => {
//         try {
//             const user_id = localStorage.getItem('userid');
//             if (!user_id) {
//                 alert('User not authenticated.');
//                 return;
//             }
//             if (!newPosition.position_name || !newPosition.description || !newPosition.requirements) {
//                 alert('Please fill in all fields.');
//                 return;
//             }
//             await axios.post('/moox_events/api/career/add-position', { ...newPosition, user_id });
//             fetchPositions();
//             setNewPosition({ position_name: '', description: '', requirements: '',location:'' });
//         } catch (error) {
//             console.error('Error adding position:', error);
//             alert('Failed to add position.');
//         }
//     };
//
//     useEffect(() => {
//         fetchPositions();
//     }, []);
//
//     return (
//         <div>
//             <h1>Career Management</h1>
//
//             {/* Add New Position */}
//             <div>
//                 <h2>Add Position</h2>
//                 <input
//                     type="text"
//                     placeholder="Position Name"
//                     value={newPosition.position_name}
//                     onChange={(e) => setNewPosition({...newPosition, position_name: e.target.value})}
//                 />
//                 <input
//                     type="text"
//                     placeholder="Description"
//                     value={newPosition.description}
//                     onChange={(e) => setNewPosition({...newPosition, description: e.target.value})}
//                 />
//                 <input
//                     type="text"
//                     placeholder="Requirements"
//                     value={newPosition.requirements}
//                     onChange={(e) => setNewPosition({...newPosition, requirements: e.target.value})}
//                 />
//                 <input
//                     type="text"
//                     placeholder="Location"
//                     value={newPosition.location}
//                     onChange={(e) => setNewPosition({...newPosition, location: e.target.value})}
//                 />
//                 <button onClick={handleAddPosition}>Add Position</button>
//             </div>
//
//             {/* Display Positions */}
//             <div>
//                 <h2>Positions</h2>
//                 {positions.map((position) => (
//                     <div key={position._id}>
//                         <p><strong>{position.position_name}</strong></p>
//                         <p>{position.description}</p>
//                         <p>Requirement : {position.requirements}</p>
//                         <p>Location : {position.location}</p>
//                         <p>Status: {position.active ? 'Active' : 'Inactive'}</p>
//                         <button onClick={() => togglePositionStatus(position._id)}>
//                             {position.active ? 'Deactivate' : 'Activate'}
//                         </button>
//                         <button onClick={() => fetchApplications(position._id)}>View Applications</button>
//                     </div>
//                 ))}
//             </div>
//
//             {/* Display Applications */}
//             {selectedPosition && (
//                 <div>
//                     <h2>Applications for {positions.find(pos => pos._id === selectedPosition)?.position_name}</h2>
//                     {applications.length > 0 ? (
//                         applications.map((app) => (
//                             <div key={app._id}>
//                                 <p><strong>Name:</strong> {app.name}</p>
//                                 <p><strong>Email:</strong> {app.email}</p>
//                                 <p><strong>Mobile:</strong> {app.mobile}</p>
//                             </div>
//                         ))
//                     ) : (
//                         <p>No applications found for this position.</p>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default CareerManagement;



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CareerManagement = () => {
    const [positions, setPositions] = useState([]);
    const [applications, setApplications] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [newPosition, setNewPosition] = useState({ position_name: '', description: '', location: '', requirements: '' });

    const fetchPositions = async () => {
        try {
            const user_id = localStorage.getItem('userid');
            if (!user_id) {
                alert('User not authenticated.');
                return;
            }
            const { data } = await axios.post('/moox_events/api/career/all', { user_id });
            setPositions(data.events);
        } catch (error) {
            console.error('Error fetching positions:', error);
            alert('Failed to fetch positions.');
        }
    };

    const togglePositionStatus = async (id) => {
        try {
            const user_id = localStorage.getItem('userid');
            if (!user_id) {
                alert('User not authenticated.');
                return;
            }
            await axios.post(`/moox_events/api/career/toggle`, { user_id, id });
            fetchPositions();
        } catch (error) {
            console.error('Error toggling position status:', error);
            alert('Failed to update position status.');
        }
    };

    const fetchApplications = async (positionId) => {
        try {
            const user_id = localStorage.getItem('userid');
            if (!user_id) {
                alert('User not authenticated.');
                return;
            }
            const { data } = await axios.post(`/moox_events/api/career/applications`, { user_id, position_id: positionId });
            setApplications(data);
            setSelectedPosition(positionId);
        } catch (error) {
            console.error('Error fetching applications:', error);
            alert('Failed to fetch applications.');
        }
    };

    const handleAddPosition = async () => {
        try {
            const user_id = localStorage.getItem('userid');
            if (!user_id) {
                alert('User not authenticated.');
                return;
            }
            if (!newPosition.position_name || !newPosition.description || !newPosition.requirements) {
                alert('Please fill in all fields.');
                return;
            }
            await axios.post('/moox_events/api/career/add-position', { ...newPosition, user_id });
            fetchPositions();
            setNewPosition({ position_name: '', description: '', location: '', requirements: '' });
        } catch (error) {
            console.error('Error adding position:', error);
            alert('Failed to add position.');
        }
    };

    useEffect(() => {
        fetchPositions();
    }, []);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-semibold text-gray-900 mb-6">Career Management</h1>

            {/* Add New Position */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Position</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Position Name"
                        value={newPosition.position_name}
                        onChange={(e) => setNewPosition({ ...newPosition, position_name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        value={newPosition.location}
                        onChange={(e) => setNewPosition({ ...newPosition, location: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={newPosition.description}
                        onChange={(e) => setNewPosition({ ...newPosition, description: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
                    />
                    <input
                        type="text"
                        placeholder="Requirements"
                        value={newPosition.requirements}
                        onChange={(e) => setNewPosition({ ...newPosition, requirements: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
                    />
                </div>
                <button
                    onClick={handleAddPosition}
                    className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:ring focus:ring-indigo-300"
                >
                    Add Position
                </button>
            </div>

            {/* Display Positions */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Positions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {positions.map((position) => (
                        <div
                            key={position._id}
                            className="p-4 bg-white rounded-md shadow-md hover:shadow-lg transition"
                        >
                            <h3 className="text-lg font-semibold text-gray-900">{position.position_name}</h3>
                            <p className="text-sm text-gray-600">{position.description}</p>
                            <p className="text-sm text-gray-600"><strong>Requirements:</strong> {position.requirements}</p>
                            <p className="text-sm text-gray-600"><strong>Location:</strong> {position.location}</p>
                            <p className="text-sm text-gray-600"><strong>Status:</strong> {position.active ? 'Active' : 'Inactive'}</p>
                            <div className="mt-4 space-x-4">
                                <button
                                    onClick={() => togglePositionStatus(position._id)}
                                    className={`px-4 py-2 rounded-md text-white shadow focus:ring ${
                                        position.active
                                            ? 'bg-red-500 hover:bg-red-600 focus:ring-red-300'
                                            : 'bg-green-500 hover:bg-green-600 focus:ring-green-300'
                                    }`}
                                >
                                    {position.active ? 'Deactivate' : 'Activate'}
                                </button>
                                <button
                                    onClick={() => fetchApplications(position._id)}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:ring focus:ring-indigo-300"
                                >
                                    View Applications
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Display Applications */}
            {selectedPosition && (
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Applications for {positions.find((pos) => pos._id === selectedPosition)?.position_name}
                    </h2>
                    <div className="space-y-4">
                        {applications.length > 0 ? (
                            applications.map((app) => (
                                <div
                                    key={app._id}
                                    className="p-4 bg-white rounded-md shadow-md hover:shadow-lg transition"
                                >
                                    <p><strong>Name:</strong> {app.name}</p>
                                    <p><strong>Email:</strong> {app.email}</p>
                                    <p><strong>Mobile:</strong> {app.mobile}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No applications found for this position.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CareerManagement;
