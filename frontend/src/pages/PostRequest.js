import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { requestService } from '../services/authService';
import styles from '../styles/PostRequest.module.css';

const PostRequest = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    skillName: '',
    category: '',
    description: '',
    preferredSchedule: '',
    duration: 1,
    expectedOutcomes: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const categories = [
    'Coding',
    'Languages',
    'Cooking',
    'Education',
    'Plantation',
    'Sports',
    'Repair',
    'Art',
    'Music',
    'Other',
  ];

  const scheduleOptions = [
    'Weekdays Morning',
    'Weekdays Afternoon',
    'Weekdays Evening',
    'Weekend Morning',
    'Weekend Afternoon',
    'Weekend Evening',
    'Flexible',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await requestService.createRequest({
        ...formData,
        duration: Number(formData.duration),
      });
      setSuccess('Learning request posted successfully. Mentors will start connecting with you.');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not post this request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.postContainer}>
        <h1>Post a Learning Request</h1>
        <p>Tell mentors what skill you want to learn.</p>

        {success && <div className={styles.success}>{success}</div>}
        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="skillName">Skill Name *</label>
            <input
              type="text"
              id="skillName"
              name="skillName"
              value={formData.skillName}
              onChange={handleChange}
              required
              placeholder="e.g., Python Programming, Spanish, Guitar"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what you want to learn and your experience level"
              rows="4"
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="preferredSchedule">Preferred Schedule *</label>
              <select
                id="preferredSchedule"
                name="preferredSchedule"
                value={formData.preferredSchedule}
                onChange={handleChange}
                required
              >
                <option value="">Select schedule</option>
                {scheduleOptions.map((schedule) => (
                  <option key={schedule} value={schedule}>
                    {schedule}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="duration">Duration (hours) *</label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                min="1"
                max="10"
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="expectedOutcomes">Expected Outcomes</label>
            <textarea
              id="expectedOutcomes"
              name="expectedOutcomes"
              value={formData.expectedOutcomes}
              onChange={handleChange}
              placeholder="What do you hope to achieve by learning this skill?"
              rows="3"
            />
          </div>

          <div className={styles.creditInfo}>
            <p>This will cost <strong>2 credits</strong> per session from your account ({user?.credits || 100} available).</p>
          </div>

          <button type="submit" disabled={loading} className={styles.submitBtn}>
            {loading ? 'Posting Request...' : 'Post Learning Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostRequest;
