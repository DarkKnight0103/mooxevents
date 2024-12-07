// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
//
// const GalleryManagement = () => {
//     const [clients, setClients] = useState([]);
//     const [formData, setFormData] = useState({ name: '', active: true,description:'', photo: '' });
//     const [showPopup, setShowPopup] = useState(false);
//     const [message, setMessage] = useState('');
//
//     // Fetch clients on component load
//     useEffect(() => {
//         const fetchClients = async () => {
//             try {
//                 const response = await axios.post('http://localhost:5000/moox_events/api/gallery/get-photos',{user_id:localStorage.getItem('userid')});
//                 setClients(response.data.clients);
//             } catch (error) {
//                 setMessage('Failed to fetch clients. ' + error.response?.data?.message || error.message);
//             }
//         };
//         fetchClients();
//     }, []);
//
//     // Handle form field changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };
//
//     // Handle photo upload and convert to Base64
//     const handlePhotoChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.readAsDataURL(file);
//             reader.onloadend = () => {
//                 setFormData({ ...formData, photo: reader.result.split(',')[1] }); // Store Base64 string
//             };
//         }
//     };
//
//     // Submit new client
//     const handleAddClient = async (e) => {
//         e.preventDefault();
//
//         if (!formData.photo) {
//             setMessage('Please upload a photo.');
//             return;
//         }
//
//         try {
//             const response = await axios.post('http://localhost:5000/moox_events/api/gallery/add-photo', {
//                 name: formData.name,
//                 active: true,
//                 description:formData.description,
//                 user_id:localStorage.getItem('userid'),
//                 photo: formData.photo, // Send Base64 string
//             });
//             setMessage(response.data.message);
//             setClients([...clients, response.data.client]);
//             setShowPopup(false);
//             setFormData({ name: '',description: '', active: true, photo: '' });
//         } catch (error) {
//             setMessage('Failed to add client. ' + error.response?.data?.message || error.message);
//         }
//     };
//
//     // Toggle client active status
//     const toggleStatus = async (clientId, currentStatus) => {
//         try {
//             const response = await axios.post('http://localhost:5000/moox_events/api/gallery/change-photo-status', {
//                 event_id:clientId,
//                 user_id: localStorage.getItem('userid'),
//                 status: !currentStatus,
//             });
//             setMessage(response.data.message);
//             setClients(clients.map(client => (client._id === clientId ? { ...client, active: !currentStatus } : client)));
//         } catch (error) {
//             setMessage('Failed to update client status. ' + error.response?.data?.message || error.message);
//         }
//     };
//
//     return (
//         <div style={{ padding: '2rem' }}>
//             <h1>Gallery Management</h1>
//             <button onClick={() => setShowPopup(true)} style={{ marginBottom: '1rem' }}>
//                 Add Photo
//             </button>
//
//             {/* Popup for adding a client */}
//             {showPopup && (
//                 <div
//                     style={{
//                         position: 'fixed',
//                         top: '50%',
//                         left: '50%',
//                         transform: 'translate(-50%, -50%)',
//                         backgroundColor: '#fff',
//                         padding: '2rem',
//                         boxShadow: '0 0 10px rgba(0,0,0,0.5)',
//                         zIndex: 1000,
//                     }}
//                 >
//                     <h2>Add Photo</h2>
//                     <form onSubmit={handleAddClient}>
//                         <div>
//                             <label>Name:</label>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label>Description:</label>
//                             <input
//                                 type="text"
//                                 name="description"
//                                 value={formData.description}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label>Photo:</label>
//                             <input type="file" accept="image/*" onChange={handlePhotoChange} required/>
//                         </div>
//                         <button type="submit">Add Photo</button>
//                         <button
//                             type="button"
//                             onClick={() => setShowPopup(false)}
//                             style={{marginLeft: '1rem'}}
//                         >
//                             Cancel
//                         </button>
//                     </form>
//                 </div>
//             )}
//
//             {/* Client list */}
//             <div>
//                 {clients.map(client => (
//                     <div
//                         key={client._id}
//                         style={{
//                             border: '1px solid #ccc',
//                             padding: '1rem',
//                             marginBottom: '1rem',
//                             display: 'flex',
//                             alignItems: 'center',
//                         }}
//                     >
//                         <img
//                             src={client.logo}
//                             alt={client.title}
//                             style={{ width: '50px', height: '50px', marginRight: '1rem' }}
//                         />
//                         <div style={{ flexGrow: 1 }}>
//                             <h3>{client.title}</h3>
//                             <p>{client.description}</p>
//                             <p>Status: {client.active ? 'Active' : 'Inactive'}</p>
//                         </div>
//                         <button onClick={() => toggleStatus(client._id, client.active)}>
//                             {client.active ? 'Deactivate' : 'Activate'}
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default GalleryManagement;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GalleryManagement = () => {
    const [clients, setClients] = useState([]);
    const [formData, setFormData] = useState({ name: '', active: true, description: '', photo: '' });
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.post('http://localhost:5000/moox_events/api/gallery/get-photos', { user_id: localStorage.getItem('userid') });
                setClients(response.data.clients);
            } catch (error) {
                setMessage('Failed to fetch clients. ' + (error.response?.data?.message || error.message));
            }
        };
        fetchClients();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setFormData({ ...formData, photo: reader.result.split(',')[1] }); // Store Base64 string
            };
        }
    };

    const handleAddClient = async (e) => {
        e.preventDefault();

        if (!formData.photo) {
            setMessage('Please upload a photo.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/moox_events/api/gallery/add-photo', {
                name: formData.name,
                active: true,
                description: formData.description,
                user_id: localStorage.getItem('userid'),
                photo: formData.photo,
            });
            setMessage(response.data.message);
            setClients([...clients, response.data.client]);
            setShowPopup(false);
            setFormData({ name: '', description: '', active: true, photo: '' });
        } catch (error) {
            setMessage('Failed to add photo. ' + (error.response?.data?.message || error.message));
        }
    };

    const toggleStatus = async (clientId, currentStatus) => {
        try {
            const response = await axios.post('http://localhost:5000/moox_events/api/gallery/change-photo-status', {
                event_id: clientId,
                user_id: localStorage.getItem('userid'),
                status: !currentStatus,
            });
            setMessage(response.data.message);
            setClients(clients.map(client => (client._id === clientId ? { ...client, active: !currentStatus } : client)));
        } catch (error) {
            setMessage('Failed to update status. ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">Gallery Management</h1>
            <button
                onClick={() => setShowPopup(true)}
                className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:ring focus:ring-indigo-300"
            >
                Add Photo
            </button>

            {showPopup && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-25 z-40"></div>
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg z-50 w-full max-w-md">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Photo</h2>
                        <form onSubmit={handleAddClient} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Photo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                                />
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:ring focus:ring-indigo-300"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowPopup(false)}
                                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {clients.map(client => (
                    <div
                        key={client._id}
                        className="p-4 bg-white rounded-md shadow-md hover:shadow-lg transition"
                    >
                        <img
                            src={`data:image/png;base64,${client.photo}`}
                            alt={client.name}
                            className="w-full h-64 object-cover rounded-md"
                        />
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-gray-800">{client.name}</h3>
                            <p className="text-sm text-gray-600">{client.description}</p>
                            <p className="text-sm text-gray-600">Status: {client.active ? 'Active' : 'Inactive'}</p>
                            <button
                                onClick={() => toggleStatus(client._id, client.active)}
                                className={`mt-4 w-full px-4 py-2 rounded-md text-white shadow focus:ring ${
                                    client.active
                                        ? 'bg-red-500 hover:bg-red-600 focus:ring-red-300'
                                        : 'bg-green-500 hover:bg-green-600 focus:ring-green-300'
                                }`}
                            >
                                {client.active ? 'Deactivate' : 'Activate'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GalleryManagement;






