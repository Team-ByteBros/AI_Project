import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Profile.module.css';

const Profile = () => {
  const { user } = useAuth();

  // Now the user data will persist and be correct after refresh
  const profileData = {
    name: user?.name || "Meet Oza",
    email: user?.email || "meetoz305@gmail.com",
    location: "Pune",

    bio: "Passionate about renewable energy and sustainable technology. Working towards a greener future through AI-powered energy solutions.",
    joinDate: "September 2025",
    avatar: "https://imgs.search.brave.com/lD6rMe4uEU49urHQull7LMvEXrMeoZP_XAOUW5-5pjA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLmd1/aW0uY28udWsvaW1n/L21lZGlhLzUzZTMz/MzY4ZWUxNWM0OTQw/MDA1ODViODNmYmVl/ZmMxNmU2ZGU0MWUv/MF8xOTdfMzUwMF8y/MTAwL21hc3Rlci8z/NTAwLmpwZz93aWR0/aD00NjUmZHByPTEm/cz1ub25lJmNyb3A9/NTo0",
  };

  return (
    <div className={styles.profileCard}>
      {/* Header Section with Avatar */}
      <div className={styles.profileHeader}>
        <div className={styles.avatarSection}>
          <img 
            src={profileData.avatar} 
            alt={profileData.name}
            className={styles.avatar}
          />
          <div className={styles.uploadBtn}>
            <span>📷</span>
          </div>
        </div>
        <div className={styles.headerInfo}>
          <h1>{profileData.name}</h1>
          {/* <p className={styles.bio}>{profileData.bio}</p> */}
          <div className={styles.joinDate}>
            <span>🗓️ Joined {profileData.joinDate}</span>
          </div>
        </div>
      </div>

      {/* Stats Section
      <div className={styles.statsSection}>
        <div className={styles.stat}>
          <span className={styles.statNumber}>{profileData.stats.projects}</span>
          <span className={styles.statLabel}>Projects</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNumber}>{profileData.stats.energySaved}</span>
          <span className={styles.statLabel}>Energy Saved</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNumber}>{profileData.stats.co2Reduced}</span>
          <span className={styles.statLabel}>CO₂ Reduced</span>
        </div>
      </div> */}

      {/* Details Section */}
      <div className={styles.detailsSection}>
        <h2>Personal Information</h2>
        
        <div className={styles.detailItem}>
          <span className={styles.detailIcon}>👤</span>
          <div className={styles.detailInfo}>
            <span className={styles.detailLabel}>Full Name</span>
            <span className={styles.detailValue}>{profileData.name}</span>
          </div>
        </div>

        <div className={styles.detailItem}>
          <span className={styles.detailIcon}>📧</span>
          <div className={styles.detailInfo}>
            <span className={styles.detailLabel}>Email</span>
            <span className={styles.detailValue}>{profileData.email}</span>
          </div>
        </div>

        <div className={styles.detailItem}>
          <span className={styles.detailIcon}>📍</span>
          <div className={styles.detailInfo}>
            <span className={styles.detailLabel}>Location</span>
            <span className={styles.detailValue}>{profileData.location}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className={styles.actionSection}>
        <button className={styles.editBtn}>
          ✏️ Edit Profile
        </button>
        <button className={styles.settingsBtn}>
          ⚙️ Settings
        </button>
      </div>
    </div>
  );
};

export default Profile;
