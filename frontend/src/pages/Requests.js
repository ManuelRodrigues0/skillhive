import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { requestService } from '../services/authService';
import styles from '../styles/FindMentor.module.css';

const Requests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const res = await requestService.getRequests({ status: 'pending' });
      setRequests(res.data.requests || []);
    } catch (err) {
      setError('Unable to load requests.');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      await requestService.acceptRequest(requestId);
      loadRequests();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to accept request');
    }
  };

  const filteredRequests = requests.filter((req) => {
    if (filter === 'mine') return req.learnerId === user?.id;
    if (filter === 'teaching') return req.mentorId === user?.id;
    return true;
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Learning Requests</h1>
        <p>Browse and accept learning requests from other members.</p>

        <div className={styles.filterBox}>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className={styles.filterSelect}>
            <option value="all">All Requests</option>
            <option value="mine">My Requests</option>
            <option value="teaching">Teaching</option>
          </select>
        </div>
      </div>

      <div className={styles.mentorGrid}>
        {loading ? (
          <p className={styles.noResults}>Loading requests...</p>
        ) : error ? (
          <p className={styles.noResults}>{error}</p>
        ) : filteredRequests.length === 0 ? (
          <p className={styles.noResults}>No requests found. Check back later!</p>
        ) : (
          filteredRequests.map((request) => {
            const learnerName = request.learner?.fullName || request.learner?.username || 'SkillHive member';
            const initials = learnerName.slice(0, 2).toUpperCase();
            const isMyRequest = request.learnerId === user?.id;
            const isTeaching = request.mentorId === user?.id;

            return (
              <div key={request.id} className={styles.mentorCard}>
                <div className={styles.mentorImage}>{initials}</div>
                <h3>{request.skillName}</h3>
                <p className={styles.bio}>{request.description || 'No description provided'}</p>

                <div className={styles.expertise}>
                  <span className={styles.badge}>{request.category}</span>
                  <span className={styles.badge}>{request.duration} hours</span>
                  <span className={styles.badge}>{request.preferredSchedule}</span>
                </div>

                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <span className={styles.value}>{learnerName}</span>
                    <span className={styles.label}>Learner</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.value}>{request.status}</span>
                    <span className={styles.label}>Status</span>
                  </div>
                </div>

                {request.expectedOutcomes && (
                  <p className={styles.bio}>
                    <strong>Expected:</strong> {request.expectedOutcomes}
                  </p>
                )}

                <div className={styles.actions}>
                  {!isMyRequest && !isTeaching && request.status === 'pending' && (
                    <button
                      onClick={() => handleAccept(request.id)}
                      className={styles.acceptBtn}
                    >
                      Accept Request
                    </button>
                  )}
                  {isTeaching && (
                    <span className={styles.acceptedBadge}>You are teaching this</span>
                  )}
                  {isMyRequest && (
                    <span className={styles.myRequestBadge}>Your Request</span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Requests;