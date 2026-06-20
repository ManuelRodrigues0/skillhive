import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Home.module.css';

const features = [
  ['Learn Skills', 'Post requests and connect with mentors who can help you make progress.'],
  ['Teach Skills', 'Offer what you know, support other learners, and earn credits.'],
  ['Real-Time Chat', 'Keep lesson details, questions, and next steps in one workspace.'],
  ['Video Sessions', 'Run focused one-on-one learning sessions when text is not enough.'],
  ['Credit Exchange', 'Trade time and knowledge without money changing hands.'],
  ['Reputation', 'Build trust through completed sessions and stronger profiles.'],
];

const Home = () => {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Community skill exchange</p>
          <h1>SkillHive</h1>
          <p>
            A practical marketplace where learners and mentors exchange skills with credits,
            clear requests, and direct communication.
          </p>
          <div className={styles.heroActions}>
            <Link to="/register" className={styles.ctaButton}>
              Create Account
            </Link>
            <Link to="/login" className={styles.secondaryButton}>
              Login
            </Link>
          </div>
        </div>
        <div className={styles.heroPanel} aria-label="SkillHive activity snapshot">
          <div>
            <span>Active mentors</span>
            <strong>5,000+</strong>
          </div>
          <div>
            <span>Skills exchanged</span>
            <strong>10,000+</strong>
          </div>
          <div>
            <span>Sessions completed</span>
            <strong>50,000+</strong>
          </div>
        </div>
      </header>

      <section className={styles.features}>
        {features.map(([title, description]) => (
          <div key={title} className={styles.featureCard}>
            <span className={styles.featureIcon}>{title.slice(0, 2).toUpperCase()}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        ))}
      </section>

      <section className={styles.cta}>
        <div>
          <h2>Start with one skill</h2>
          <p>Join, post what you want to learn, or add a skill you can teach.</p>
        </div>
        <Link to="/register" className={styles.ctaButton}>
          Get Started
        </Link>
      </section>
    </main>
  );
};

export default Home;
