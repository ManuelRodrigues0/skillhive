import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { userService } from '../services/authService';
import styles from '../styles/Profile.module.css';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    bio: user?.bio || '',
    profilePhoto: user?.profilePhoto || '',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const res = await userService.updateProfile(user.id, formData);
      setUser({
        ...user,
        ...res.data.user,
      });
      setMessage('Profile saved.');
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save your profile.');
    } finally {
      setSaving(false);
    }
  };

  const initials = (user?.fullName || user?.username || 'User').slice(0, 2).toUpperCase();

  return (
    <div className={styles.container}>
      <div className={styles.profileBox}>
        <div className={styles.profileHeader}>
          <div className={styles.profilePhoto}>
            {formData.profilePhoto ? (
              <img src={formData.profilePhoto} alt="Profile" />
            ) : (
              <div className={styles.avatarPlaceholder}>{initials}</div>
            )}
          </div>
          <div className={styles.profileInfo}>
            <h1>{user?.fullName || user?.username}</h1>
            <p className={styles.email}>{user?.email}</p>
          </div>
          <button onClick={() => setIsEditing(!isEditing)} className={styles.editBtn}>
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{user?.credits || 100}</span>
            <span className={styles.statLabel}>Credits</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{user?.reputation?.toFixed(1) || 0}</span>
            <span className={styles.statLabel}>Reputation</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{user?.totalSessionsCompleted || 0}</span>
            <span className={styles.statLabel}>Sessions</span>
          </div>
        </div>

        {message && <div className={styles.notice}>{message}</div>}
        {error && <div className={styles.error}>{error}</div>}

        {isEditing ? (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell others about yourself"
                rows="4"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="profilePhoto">Profile Photo URL</label>
              <input
                type="url"
                id="profilePhoto"
                name="profilePhoto"
                value={formData.profilePhoto}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <button type="submit" disabled={saving} className={styles.submitBtn}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        ) : (
          <div className={styles.bioSection}>
            <h3>About Me</h3>
            <p>{formData.bio || 'No bio added yet'}</p>
          </div>
        )}

        <div className={styles.section}>
          <h3>Account Information</h3>
          <div className={styles.infoItem}>
            <span className={styles.label}>Username:</span>
            <span className={styles.value}>{user?.username}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Email:</span>
            <span className={styles.value}>{user?.email}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Status:</span>
            <span className={styles.value}>{user?.status || 'active'}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Verified:</span>
            <span className={styles.value}>{user?.isVerified ? 'Yes' : 'No'}</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.dangerBtn}>Change Password</button>
          <button className={styles.dangerBtn}>Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
