import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { requestService, skillService } from '../services/authService';
import styles from '../styles/Dashboard.module.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    sessionsCompleted: user?.totalSessionsCompleted || 0,
    skillsShared: 0,
    skillsLearning: 0,
    activeSessions: 0,
  });
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!user?.id) return;

    Promise.all([
      skillService.getUserSkills(user.id),
      requestService.getRequests({ mine: true }),
    ])
      .then(([skillsRes, requestsRes]) => {
        const skills = skillsRes.data.skills || [];
        const userRequests = requestsRes.data.requests || [];

        setRequests(userRequests);
        setStats({
          sessionsCompleted: user?.totalSessionsCompleted || 0,
          skillsShared: skills.filter((skill) => skill.isTeaching).length,
          skillsLearning: userRequests.filter((request) => request.learnerId === user.id).length,
          activeSessions: userRequests.filter((request) => request.status === 'accepted').length,
        });
      })
      .catch(() => {
        setStats((current) => current);
      });
  }, [user]);

  const actions = [
    ['Request Lesson', 'Find a mentor for a skill you want to learn', '/post-request', 'RL'],
    ['Manage Skills', 'Add, edit, or remove the skills you can teach', '/my-skills', 'MS'],
    ['Find Mentors', 'Browse mentors and compare expertise', '/find-mentor', 'FM'],
    ['Messages', 'Continue conversations with learners and mentors', '/chat', 'CH'],
  ];

  const activeRequests = requests.filter((request) => request.status === 'accepted');

  return (
    <div className={styles.dashboard}>
      <div className={styles.container}>
        <section className={styles.welcome}>
          <div>
            <p className={styles.eyebrow}>Dashboard</p>
            <h1>Welcome, {user?.fullName || user?.username}</h1>
            <p>Your saved skills, requests, credits, and messages are connected to your account.</p>
          </div>
          <Link to="/post-request" className={styles.primaryAction}>
            New Request
          </Link>
        </section>

        <section className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{stats.sessionsCompleted}</div>
            <div className={styles.statLabel}>Sessions Completed</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{stats.skillsShared}</div>
            <div className={styles.statLabel}>Skills Teaching</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{stats.skillsLearning}</div>
            <div className={styles.statLabel}>Learning Requests</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{stats.activeSessions}</div>
            <div className={styles.statLabel}>Active Connections</div>
          </div>
        </section>

        <section className={styles.actions}>
          <h2>Quick Actions</h2>
          <div className={styles.actionGrid}>
            {actions.map(([title, description, to, icon]) => (
              <Link key={title} to={to} className={styles.actionCard}>
                <div className={styles.actionIcon}>{icon}</div>
                <h3>{title}</h3>
                <p>{description}</p>
              </Link>
            ))}
          </div>
        </section>

        <div className={styles.lowerGrid}>
          <section className={styles.panel}>
            <h2>Active Learning Connections</h2>
            {activeRequests.length ? (
              activeRequests.map((request) => (
                <p key={request.id} className={styles.noData}>
                  {request.skillName} with {request.mentor?.fullName || request.learner?.fullName || 'a member'}
                </p>
              ))
            ) : (
              <p className={styles.noData}>No active accepted requests yet.</p>
            )}
          </section>

          <section className={styles.panel}>
            <h2>Recommended Mentors</h2>
            <p className={styles.noData}>Real mentors appear after members add teaching skills.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
