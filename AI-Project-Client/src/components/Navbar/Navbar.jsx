import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
      navigate('/signin');
    } else {
      navigate('/signin');
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <span className={styles.projectIcon}>⚡</span>
        <span className={styles.projectName}>EnergyIQ</span>
      </div>

      <ul className={styles.navLinks}>
        <li><Link to="/dashboard" className={styles.navLink}>Dashboard</Link></li>
        <li><Link to="/profile" className={styles.navLink}>Profile</Link></li>
      </ul>

      {/* <div className={styles.rightSection}>
        <button 
          className={styles.signInBtn} 
          onClick={handleAuthClick}
        >
          {isAuthenticated ? 'Log Out' : 'Sign In'}
        </button>
      </div> */}
    </nav>
  );
};

export default Navbar;
