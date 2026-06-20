import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Navigation.module.css';

const Navigation = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>SH</span>
          SkillHive
        </Link>

        <div className={styles.menu}>
          {!user ? (
            <div className={styles.authLinks}>
              <Link to="/login" className={styles.loginBtn}>
                Login
              </Link>
              <Link to="/register" className={styles.signupBtn}>
                Sign Up
              </Link>
            </div>
          ) : (
            <div className={styles.userMenu}>
              <Link to="/dashboard" className={styles.navLink}>
                Dashboard
              </Link>
              <Link to="/post-request" className={styles.navLink}>
                Post Request
              </Link>
              <Link to="/my-skills" className={styles.navLink}>
                My Skills
              </Link>
              <Link to="/find-mentor" className={styles.navLink}>
                Find Mentors
              </Link>
              <Link to="/requests" className={styles.navLink}>
                Requests
              </Link>
              <Link to="/profile" className={styles.navLink}>
                Profile
              </Link>
              <div className={styles.userInfo}>
                <span className={styles.username}>{user.fullName || user.username}</span>
                <span className={styles.credits}>{user.credits || 100} credits</span>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
