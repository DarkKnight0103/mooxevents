// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './style/team.css'
// const TeamManagement = () => {
//     const [members, setMembers] = useState([]);
//     const [newMember, setNewMember] = useState({
//         user_id: '',
//         name: '',
//         description: '',
//         position: '',
//         facebook_link: '',
//         instagram_link: '',
//         photo: null,
//     });
//     const [activeMembers, setActiveMembers] = useState([]);
//     const [loading, setLoading] = useState(true);
//
//     // Fetch members (active and all)
//     const fetchMembers = async () => {
//         try {
//             const response = await axios.post('/moox_events/api/team/get-all-member', { user_id: localStorage.getItem('userid') });
//             setMembers(response.data.events);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching members:', error);
//         }
//     };
//
//     const fetchActiveMembers = async () => {
//         try {
//             const response = await axios.post('/moox_events/api/team/get-active-members');
//             setActiveMembers(response.data.events);
//         } catch (error) {
//             console.error('Error fetching active members:', error);
//         }
//     };
//
//     useEffect(() => {
//         fetchMembers();
//         fetchActiveMembers();
//     }, []);
//
//     // Handle member form input
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setNewMember({ ...newMember, [name]: value });
//     };
//
//     const handlePhotoChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setNewMember({ ...newMember, photo: reader.result.split(',')[1] });
//             };
//             reader.readAsDataURL(file);
//         }
//     };
//
//     // Add member
//     const handleAddMember = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('/moox_events/api/team/add-member', {...newMember,user_id:localStorage.getItem('userid')});
//             fetchMembers(); // Refresh the member list after adding
//             alert('Member added successfully');
//         } catch (error) {
//             console.error('Error adding member:', error);
//         }
//     };
//
//     // Toggle member status
//     const handleToggleStatus = async (event_id, status) => {
//         try {
//             await axios.post('/moox_events/api/team/change-member-status', {
//                 event_id,
//                 status,
//                 user_id: localStorage.getItem('userid'),
//             });
//             fetchMembers(); // Refresh the member list after status change
//             alert(`Member status updated to ${status ? 'active' : 'inactive'}`);
//         } catch (error) {
//             console.error('Error updating member status:', error);
//         }
//     };
//
//     return (
//         <div className="container">
//             <h1>Team Management</h1>
//
//             <h2>All Members</h2>
//             <div className="members-list">
//                 {members.map((member) => (
//                     <div key={member.id} className="member-card">
//                         <img src={member.photo} alt={member.name} />
//                         <h3>{member.name}</h3>
//                         <p>{member.position}</p>
//                         <p>{member.description}</p>
//                         <button onClick={() => handleToggleStatus(member.id, !member.active)}>
//                             {member.active ? 'Deactivate' : 'Activate'}
//                         </button>
//                     </div>
//                 ))}
//             </div>
//
//             <h2>Add New Member</h2>
//             <form onSubmit={handleAddMember}>
//                 <input
//                     type="text"
//                     name="name"
//                     value={newMember.name}
//                     placeholder="Name"
//                     onChange={handleInputChange}
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="position"
//                     value={newMember.position}
//                     placeholder="Position"
//                     onChange={handleInputChange}
//                     required
//                 />
//                 <textarea
//                     name="description"
//                     value={newMember.description}
//                     placeholder="Description"
//                     onChange={handleInputChange}
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="facebook_link"
//                     value={newMember.facebook_link}
//                     placeholder="Facebook Link"
//                     onChange={handleInputChange}
//                 />
//                 <input
//                     type="text"
//                     name="instagram_link"
//                     value={newMember.instagram_link}
//                     placeholder="Instagram Link"
//                     onChange={handleInputChange}
//                 />
//                 <input type="file" onChange={handlePhotoChange} required />
//                 <button type="submit">Add Member</button>
//             </form>
//         </div>
//     );
// };
//
// export default TeamManagement;




import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeamManagement = () => {
    const [members, setMembers] = useState([]);
    const [newMember, setNewMember] = useState({
        user_id: '',
        name: '',
        description: '',
        position: '',
        facebook_link: '',
        instagram_link: '',
        photo: null,
    });
    const [activeMembers, setActiveMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch members (active and all)
    const fetchMembers = async () => {
        try {
            const response = await axios.post('/moox_events/api/team/get-all-member', { user_id: localStorage.getItem('userid') });
            setMembers(response.data.events);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    };

    const fetchActiveMembers = async () => {
        try {
            const response = await axios.post('/moox_events/api/team/get-active-members');
            setActiveMembers(response.data.events);
        } catch (error) {
            console.error('Error fetching active members:', error);
        }
    };

    useEffect(() => {
        fetchMembers();
        fetchActiveMembers();
    }, []);

    // Handle member form input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMember({ ...newMember, [name]: value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewMember({ ...newMember, photo: reader.result.split(',')[1] });
            };
            reader.readAsDataURL(file);
        }
    };

    // Add member
    const handleAddMember = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/moox_events/api/team/add-member', {...newMember,user_id:localStorage.getItem('userid')});
            fetchMembers(); // Refresh the member list after adding
            alert('Member added successfully');
        } catch (error) {
            console.error('Error adding member:', error);
        }
    };

    // Toggle member status
    const handleToggleStatus = async (event_id, status) => {
        try {
            await axios.post('/moox_events/api/team/change-member-status', {
                event_id,
                status,
                user_id: localStorage.getItem('userid'),
            });
            fetchMembers(); // Refresh the member list after status change
            alert(`Member status updated to ${status ? 'active' : 'inactive'}`);
        } catch (error) {
            console.error('Error updating member status:', error);
        }
    };

    return (
        <div className="container mx-auto p-6 bg-gray-50">
            <h1 className="text-3xl font-semibold text-gray-900 mb-6">Team Management</h1>

            {/* All Members */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Members</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member) => (
                    <div key={member.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition">
                        <img src={member.photo} alt={member.name} className="w-full h-48 object-cover rounded-t-lg mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                        <p className="text-gray-600">{member.position}</p>
                        <p className="text-gray-700 mt-2">{member.description}</p>
                        <div className="flex gap-2 mt-4">
                            <a href={member.facebook_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Facebook</a>
                            <a href={member.instagram_link} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">Instagram</a>
                        </div>
                        <button
                            onClick={() => handleToggleStatus(member.id, !member.active)}
                            className={`mt-4 w-full py-2 rounded-md text-white ${member.active ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                        >
                            {member.active ? 'Deactivate' : 'Activate'}
                        </button>
                    </div>
                ))}
            </div>

            {/* Add New Member */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-12 mb-6">Add New Member</h2>
            <form onSubmit={handleAddMember} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    value={newMember.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="position"
                    value={newMember.position}
                    onChange={handleInputChange}
                    placeholder="Position"
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    name="description"
                    value={newMember.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="facebook_link"
                    value={newMember.facebook_link}
                    onChange={handleInputChange}
                    placeholder="Facebook Link"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="instagram_link"
                    value={newMember.instagram_link}
                    onChange={handleInputChange}
                    placeholder="Instagram Link"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="file"
                    onChange={handlePhotoChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
                >
                    Add Member
                </button>
            </form>
        </div>
    );
};

export default TeamManagement;

