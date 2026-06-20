import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { skillService } from '../services/authService';
import styles from '../styles/MySkills.module.css';

const MySkills = () => {
  const { user } = useContext(AuthContext);
  const [skills, setSkills] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    skillName: '',
    category: '',
    description: '',
    proficiencyLevel: 'Intermediate',
    yearsOfExperience: 0,
    isTeaching: true,
  });

  const categories = [
    'Coding', 'Languages', 'Cooking', 'Education', 'Plantation', 'Sports', 'Repair', 'Art', 'Music', 'Other'
  ];

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    skillService
      .getUserSkills(user.id)
      .then((res) => setSkills(res.data.skills || []))
      .catch(() => setError('Unable to load your skills right now.'))
      .finally(() => setLoading(false));
  }, [user?.id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      skillName: '',
      category: '',
      description: '',
      proficiencyLevel: 'Intermediate',
      yearsOfExperience: 0,
      isTeaching: true,
    });
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const res = await skillService.addSkill({
        ...formData,
        yearsOfExperience: Number(formData.yearsOfExperience),
        isLearning: false,
      });
      setSkills((current) => [res.data.skill, ...current]);
      resetForm();
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not add this skill.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSkill = async (id) => {
    setError('');
    try {
      await skillService.deleteSkill(id);
      setSkills(skills.filter((skill) => skill.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Could not delete this skill.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.skillsContainer}>
        <div className={styles.headerRow}>
          <div>
            <h1>My Skills</h1>
            <p>Add and manage the skills you want to teach.</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className={styles.addBtn}>
            {showForm ? 'Close Form' : 'Add Skill'}
          </button>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        {showForm && (
          <form onSubmit={handleAddSkill} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="skillName">Skill Name *</label>
              <input
                type="text"
                id="skillName"
                name="skillName"
                value={formData.skillName}
                onChange={handleChange}
                required
                placeholder="e.g., Python Programming"
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
                  <option key={cat} value={cat}>{cat}</option>
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
                placeholder="What can you teach about this skill?"
                rows="3"
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="proficiencyLevel">Proficiency Level *</label>
                <select
                  id="proficiencyLevel"
                  name="proficiencyLevel"
                  value={formData.proficiencyLevel}
                  onChange={handleChange}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="yearsOfExperience">Years of Experience</label>
                <input
                  type="number"
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  min="0"
                />
              </div>
            </div>

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="isTeaching"
                checked={formData.isTeaching}
                onChange={handleChange}
              />
              I want to teach this skill
            </label>

            <div className={styles.formActions}>
              <button type="submit" disabled={saving} className={styles.submitBtn}>
                {saving ? 'Adding...' : 'Add Skill'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className={styles.cancelBtn}>
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className={styles.skillsList}>
          {loading ? (
            <p className={styles.noSkills}>Loading skills...</p>
          ) : skills.length === 0 ? (
            <p className={styles.noSkills}>No skills added yet. Add your first skill to get started.</p>
          ) : (
            skills.map((skill) => (
              <div key={skill.id} className={styles.skillCard}>
                <div className={styles.skillHeader}>
                  <h3>{skill.skillName}</h3>
                  <span className={styles.category}>{skill.category}</span>
                </div>
                <p className={styles.description}>{skill.description || 'No description added.'}</p>
                <div className={styles.skillInfo}>
                  <span className={styles.level}>{skill.proficiencyLevel}</span>
                  <span className={styles.experience}>{skill.yearsOfExperience || 0} years</span>
                  {skill.isTeaching && <span className={styles.teaching}>Teaching</span>}
                </div>
                <button onClick={() => handleDeleteSkill(skill.id)} className={styles.deleteBtn}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MySkills;
