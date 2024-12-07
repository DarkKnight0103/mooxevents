// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
//
// const AchievementsManagement = () => {
//     const [achievements, setAchievements] = useState([]);
//     const [newAchievement, setNewAchievement] = useState({
//         title: '',
//         description: '',
//         achievement_date: '',
//         photo: null,
//     });
//
//     // Fetch all achievements
//     const fetchAchievements = async () => {
//         try {
//             const user_id = localStorage.getItem('userid');
//             if (!user_id) {
//                 alert('User not authenticated.');
//                 return;
//             }
//             const { data } = await axios.post('/moox_events/api/achievements/get-achievements', { user_id });
//             setAchievements(data.events);
//         } catch (error) {
//             console.error('Error fetching achievements:', error);
//         }
//     };
//
//     // Handle adding a new achievement
//     const handleAddAchievement = async () => {
//         try {
//             const user_id = localStorage.getItem('userid');
//             if (!user_id) {
//                 alert('User not authenticated.');
//                 return;
//             }
//
//             const formData = {
//                 ...newAchievement,
//                 user_id,
//                 photo: newAchievement.photo.split(',')[1] // Extract base64 string
//             };
//
//             await axios.post('/moox_events/api/achievements/add-achievements', formData);
//             fetchAchievements(); // Refresh achievements
//             alert('Achievement added successfully!');
//         } catch (error) {
//             console.error('Error adding achievement:', error);
//         }
//     };
//
//     // Handle toggling achievement status
//     const handleToggleStatus = async (id, status) => {
//         try {
//             const user_id = localStorage.getItem('userid');
//             if (!user_id) {
//                 alert('User not authenticated.');
//                 return;
//             }
//             await axios.post('/moox_events/api/achievements/change-achievements-status', { event_id: id, status: !status, user_id });
//             fetchAchievements();
//         } catch (error) {
//             console.error('Error toggling achievement status:', error);
//         }
//     };
//
//     useEffect(() => {
//         fetchAchievements();
//     }, []);
//
//     return (
//         <div>
//             <h1>Achievements Management</h1>
//
//             {/* Add New Achievement */}
//             <div>
//                 <h2>Add Achievement</h2>
//                 <input
//                     type="text"
//                     placeholder="Title"
//                     value={newAchievement.title}
//                     onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
//                 />
//                 <input
//                     type="text"
//                     placeholder="Description"
//                     value={newAchievement.description}
//                     onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
//                 />
//                 <input
//                     type="date"
//                     value={newAchievement.achievement_date}
//                     onChange={(e) => setNewAchievement({ ...newAchievement, achievement_date: e.target.value })}
//                 />
//                 <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => {
//                         const reader = new FileReader();
//                         reader.onload = () => setNewAchievement({ ...newAchievement, photo: reader.result });
//                         reader.readAsDataURL(e.target.files[0]);
//                     }}
//                 />
//                 <button onClick={handleAddAchievement}>Add Achievement</button>
//             </div>
//
//             {/* Display Achievements */}
//             <div>
//                 <h2>Achievements</h2>
//                 {achievements.map((achievement) => (
//                     <div key={achievement._id}>
//                         <h3>{achievement.title}</h3>
//                         <p>{achievement.description}</p>
//                         <p>Date: {new Date(achievement.event_date).toLocaleDateString()}</p>
//                         <img src={achievement.photo} alt={achievement.title} style={{ width: '100px' }} />
//                         <p>Status: {achievement.active ? 'Active' : 'Inactive'}</p>
//                         <button onClick={() => handleToggleStatus(achievement._id, achievement.active)}>
//                             {achievement.active ? 'Deactivate' : 'Activate'}
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default AchievementsManagement;
//







import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AchievementsManagement = () => {
    
    const [achievements, setAchievements] = useState([]);
    const [newAchievement, setNewAchievement] = useState({
        title: '',
        description: '',
        achievement_date: '',
        photo: null,
    });

    // Fetch all achievements
    const fetchAchievements = async () => {
        try {
            const user_id = localStorage.getItem('userid');
            if (!user_id) {
                alert('User not authenticated.');
                return;
            }
            const { data } = await axios.post('/moox_events/api/achievements/get-achievements', { user_id });
            setAchievements(data.events);
        } catch (error) {
            console.error('Error fetching achievements:', error);
        }
    };

    // Handle adding a new achievement
    const handleAddAchievement = async () => {
        try {
            const user_id = localStorage.getItem('userid');
            if (!user_id) {
                alert('User not authenticated.');
                return;
            }

            const formData = {
                ...newAchievement,
                user_id,
                photo: newAchievement.photo.split(',')[1] // Extract base64 string
            };

            await axios.post('/moox_events/api/achievements/add-achievements', formData);
            fetchAchievements(); // Refresh achievements
            alert('Achievement added successfully!');
        } catch (error) {
            console.error('Error adding achievement:', error);
        }
    };

    // Handle toggling achievement status
    const handleToggleStatus = async (id, status) => {
        try {
            const user_id = localStorage.getItem('userid');
            if (!user_id) {
                alert('User not authenticated.');
                return;
            }
            await axios.post('/moox_events/api/achievements/change-achievements-status', { event_id: id, status: !status, user_id });
            fetchAchievements();
        } catch (error) {
            console.error('Error toggling achievement status:', error);
        }
    };

    useEffect(() => {
        fetchAchievements();
    }, []);

    return (
        <div className="font-sans p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-semibold text-gray-900 mb-6">Achievements Management</h1>

            {/* Add New Achievement */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Achievement</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={newAchievement.title}
                        onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={newAchievement.description}
                        onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="date"
                        value={newAchievement.achievement_date}
                        onChange={(e) => setNewAchievement({ ...newAchievement, achievement_date: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const reader = new FileReader();
                            reader.onload = () => setNewAchievement({ ...newAchievement, photo: reader.result });
                            reader.readAsDataURL(e.target.files[0]);
                        }}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleAddAchievement}
                        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                    >
                        Add Achievement
                    </button>
                </div>
            </div>

            {/* Display Achievements */}
            <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Achievements</h2>
                {achievements.map((achievement) => (
                    <div key={achievement._id} className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h3 className="text-xl font-semibold text-gray-900">{achievement.title}</h3>
                        <p className="text-gray-700 mt-2">{achievement.description}</p>
                        <p className="text-gray-600 mt-2">Date: {new Date(achievement.event_date).toLocaleDateString()}</p>
                        <img src={achievement.photo} alt={achievement.title} className="w-32 h-32 object-cover mt-4 rounded-md shadow-md" />
                        <p className="text-gray-600 mt-2">Status: {achievement.active ? 'Active' : 'Inactive'}</p>
                        <button
                            onClick={() => handleToggleStatus(achievement._id, achievement.active)}
                            className={`mt-4 px-4 py-2 rounded-md focus:outline-none ${achievement.active ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                        >
                            {achievement.active ? 'Deactivate' : 'Activate'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AchievementsManagement;
