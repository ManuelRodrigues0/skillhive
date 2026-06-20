import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { skillService } from '../services/authService';
import styles from '../styles/FindMentor.module.css';

const FindMentor = () => {
  const { user } = useContext(AuthContext);
  const [filter, setFilter] = useState('');
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    skillService
      .getAllSkills()
      .then((res) => setSkills((res.data.skills || []).filter((skill) => skill.isTeaching && skill.userId !== user?.id)))
      .catch(() => setError('Unable to load mentors right now.'))
      .finally(() => setLoading(false));
  }, [user?.id]);

  const filteredSkills = useMemo(() => {
    const value = filter.trim().toLowerCase();
    if (!value) return skills;

    return skills.filter((skill) =>
      skill.skillName.toLowerCase().includes(value) ||
      skill.category.toLowerCase().includes(value) ||
      (skill.mentor?.fullName || skill.mentor?.username || '').toLowerCase().includes(value)
    );
  }, [filter, skills]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Find Your Mentor</h1>
        <p>Browse real members who have added skills they want to teach.</p>

        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search by skill, category, or mentor name..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.mentorGrid}>
        {loading ? (
          <p className={styles.noResults}>Loading mentors...</p>
        ) : error ? (
          <p className={styles.noResults}>{error}</p>
        ) : filteredSkills.length === 0 ? (
          <p className={styles.noResults}>No mentors yet. Members will appear here after they add teaching skills.</p>
        ) : (
          filteredSkills.map((skill) => {
            const mentorName = skill.mentor?.fullName || skill.mentor?.username || 'SkillHive member';
            const initials = mentorName.slice(0, 2).toUpperCase();

            return (
              <div key={skill.id} className={styles.mentorCard}>
                <div className={styles.mentorImage}>{initials}</div>
                <h3>{mentorName}</h3>
                <p className={styles.bio}>{skill.description || 'No teaching description added yet.'}</p>

                <div className={styles.expertise}>
                  <span className={styles.badge}>{skill.skillName}</span>
                  <span className={styles.badge}>{skill.category}</span>
                  <span className={styles.badge}>{skill.proficiencyLevel}</span>
                </div>

                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <span className={styles.value}>{skill.yearsOfExperience || 0}</span>
                    <span className={styles.label}>Years</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.value}>{skill.mentor?.totalSessionsCompleted || 0}</span>
                    <span className={styles.label}>Sessions</span>
                  </div>
                </div>

                <div className={styles.creditCost}>Credits set when request is accepted</div>

                <div className={styles.actions}>
                  <Link to="/post-request" className={styles.learnBtn}>
                    Request Lesson
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FindMentor;
