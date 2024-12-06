// import React, { useEffect, useState } from "react";
// import styles from "./AchivHome.module.css";
// import axios from "axios";
// // Initializing the profiles state
// const AchivHome = () => {
//     const ip = import.meta.env.VITE_IP;
//   const [profiles, setProfiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetching achievements data from the API
//     const fetchAchievements = async () => {
//       try {
//         const response = await axios.post(`http://${ip}/moox_events/api/achievements/get-all-achievements`);
//         const data = await response.data.events;
//         console.log(data.events);  
//         if (data && Array.isArray(data)) {
//           setProfiles(data);
//         } else {
//           setError("Unexpected data format received");
//         }
//       } catch (err) {
//         setError("Failed to fetch data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAchievements();
//   }, []); // Empty dependency array ensures this runs only once on component mount

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   const ProfileCard = ({ profile }) => (
//     <div className={styles.achievement_box}>
//       <div className={styles.achievement_box_top}>
//         {/* Check if image exists or use a fallback image */}
//         <img
//           className={styles.achievement_box_image}
//           src={profile.photo || "/award1.jpg"}
//           alt={profile.title}
//         />
//         <div className={styles.achievement_title_flex}>
//           <h3 className={styles.achievement_box_title}>{profile.title}</h3>
//           <p className={styles.achievement_user_follow_info}>{new Date(profile.event_date).toLocaleDateString()}</p>
//         </div>
//         <p className={styles.achievement_description}>{profile.description}</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className={styles.achievement_wrap}>
//       {profiles.map((profile) => (
//         <ProfileCard key={profile._id} profile={profile} />
//       ))}
//     </div>
//   );
// };

// export default AchivHome;


import React, { useEffect, useState } from "react";
import styles from "./AchivHome.module.css";
import axios from "axios";
import { div } from "framer-motion/client";

const AchivHome = () => {
  const ip = import.meta.env.VITE_IP;
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.post(`http://${ip}/moox_events/api/achievements/get-all-achievements`);
        const data = response.data.events;
        if (data && Array.isArray(data)) {
          setProfiles(data);
        } else {
          setError("Unexpected data format received");
        }
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const ProfileCard = ({ profile }) => (
    <div className={`${styles.achievement_box} glass-card`}>
      <div className={styles.achievement_box_top}>
        <img
          className={styles.achievement_box_image}
          src={profile.photo || "/award1.jpg"}
          alt={profile.title}
        />
        <div className={styles.achievement_title_flex}>
          <h3 className={styles.achievement_box_title}>{profile.title}</h3>
          <p className={styles.achievement_user_follow_info}>
            {new Date(profile.event_date).toLocaleDateString()}
          </p>
        </div>
        <p className={styles.achievement_description}>{profile.description}</p>
      </div>
    </div>
  );

  return (
    <div className="flex justify-center items-center">
    <div className={styles.achievement_wrap}>
      {profiles.map((profile) => (
        <ProfileCard key={profile._id} profile={profile} />
      ))}
    </div>
    </div>
  );
};

export default AchivHome;
