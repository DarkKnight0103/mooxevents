// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
//
// function Dashboard() {
//     const navigate = useNavigate();
//
//     const logout = () => {
//         // Clear localStorage and redirect to the login page
//         localStorage.clear();
//         window.location.reload();
//     };
//
//     return (
//         <div>
//             <header>
//                 <h1 className="text-3xl font-bold underline">Admin Dashboard</h1>
//                 <nav>
//                     <ul>
//                         <li><Link to="/services">Manage Services</Link></li>
//                         <li><Link to="/clients">Manage Clients</Link></li>
//                         <li><Link to="/gallery">Gallery Management</Link></li>
//                         <li><Link to="/career">Career Management</Link></li>
//                         <li><Link to="/memorable-events">Memorable Event Management</Link></li>
//                         <li><Link to="/contactus">Contact Us</Link></li>
//                         <li><Link to="/team">Team Management</Link></li>
//                         <li><Link to="/enquiry">Enquiry Management</Link></li>
//                         <li><Link to="/achievements">Achievements Management</Link></li>
//                     </ul>
//                 </nav>
//             </header>
//             <button onClick={logout}>LOGOUT</button>
//         </div>
//     );
// }
//
// export default Dashboard;






import React, { useState } from "react";
import AddService from "./addService";
import ClientManagement from "./addClient";
import Enquiry from "./enquiry";
import EventManagement from "./Events";
import GalleryManagement from "./Gallery";
import ContactUs from "./contactus";
import TeamManagement from "./team";
import CareerManagement from "./career";
import AchievementsManagement from "./acheivements";

const  Dashboard = () => {
    const [activeComponent, setActiveComponent] = useState("ManageServices");

    const renderComponent = () => {
        switch (activeComponent) {
            case "ManageServices":
                return <AddService />;
            case "ManageClients":
                return <ClientManagement />;
            case "GalleryManagement":
                return <GalleryManagement />;
            case "CareerManagement":
                return <CareerManagement />;
            case "MemorableEvents":
                return <EventManagement />;
            case "ContactUs":
                return <ContactUs />;
            case "TeamManagement":
                return <TeamManagement />;
            case "EnquiryManagement":
                return <Enquiry />;
            case "AchievementsManagement":
                return <AchievementsManagement />;
            default:
                return <div>Select an option from the sidebar.</div>;
        }
    };

    const menuItems = [
        { label: "Manage Services", key: "ManageServices" },
        { label: "Manage Clients", key: "ManageClients" },
        { label: "Gallery Management", key: "GalleryManagement" },
        { label: "Career Management", key: "CareerManagement" },
        { label: "Memorable Events", key: "MemorableEvents" },
        { label: "Contact Us", key: "ContactUs" },
        { label: "Team Management", key: "TeamManagement" },
        { label: "Enquiry Management", key: "EnquiryManagement" },
        { label: "Achievements Management", key: "AchievementsManagement" },
    ];

    return (
        <div className="flex bg-gray-100 min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white shadow-lg h-screen sticky top-0">
                <div className="p-6 border-b border-blue-700">
                    <h1 className="text-2xl font-bold font-parkin text-white">Moox Events Pvt Ltd</h1>
                    <h4 className="text-center font-bold font-parkin">Admin Panel</h4>
                </div>
                <nav className="mt-6 p-3 font-parkin">
                    <ul>
                        {menuItems.map((item) => (
                            <li key={item.key} className="my-2">
                                <button
                                    onClick={() => setActiveComponent(item.key)}
                                    className={`w-full px-4 py-3 text-left rounded-md transition-all ${
                                        activeComponent === item.key
                                            ? "bg-white text-blue-800 font-bold shadow-md"
                                            : "hover:bg-blue-700"
                                    }`}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 p-8">
                {/* Header */}
                <header className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-700">Dashboard</h2>
                    <button
                        onClick={() => {
                            localStorage.clear();
                            window.location.reload();
                        }}
                        className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700"
                    >
                        Logout
                    </button>
                </header>

                {/* Dynamic Component Rendering */}
                <div className="bg-white mt-8 p-6 rounded-lg shadow-lg border border-gray-200">
                    {renderComponent()}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
