const request = require('supertest');
const { app } = require('../src/server');

describe('Skill Request API', () => {
  let learnerToken = '';
  let mentorToken = '';
  let createdRequestId = '';
  const suffix = Date.now();

  const learner = {
    username: `learner_${suffix}`,
    email: `learner_${suffix}@example.com`,
    password: 'Password123',
    fullName: 'Learner User',
  };

  const mentor = {
    username: `mentor_${suffix}`,
    email: `mentor_${suffix}@example.com`,
    password: 'Password123',
    fullName: 'Mentor User',
  };

  beforeAll(async () => {
    const learnerRes = await request(app).post('/api/auth/register').send(learner);
    learnerToken = learnerRes.body.token;

    const mentorRes = await request(app).post('/api/auth/register').send(mentor);
    mentorToken = mentorRes.body.token;
  });

  it('should create an authenticated learning request', async () => {
    const res = await request(app)
      .post('/api/requests')
      .set('Authorization', `Bearer ${learnerToken}`)
      .send({
        skillName: 'JavaScript',
        category: 'Coding',
        description: 'I want to learn React fundamentals',
        preferredSchedule: 'Flexible',
        duration: 2,
        expectedOutcomes: 'Build a small project',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.request).toHaveProperty('skillName', 'JavaScript');
    expect(res.body.request).toHaveProperty('status', 'pending');
    createdRequestId = res.body.request.id;
  });

  it('should list created requests', async () => {
    const res = await request(app).get('/api/requests?category=Coding');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.requests)).toBe(true);
    expect(res.body.requests.some((item) => item.id === createdRequestId)).toBe(true);
  });

  it('should allow a mentor to accept a pending request', async () => {
    const res = await request(app)
      .post(`/api/requests/${createdRequestId}/accept`)
      .set('Authorization', `Bearer ${mentorToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.request).toHaveProperty('status', 'accepted');
  });

  it('should allow a participant to complete a request', async () => {
    const res = await request(app)
      .put(`/api/requests/${createdRequestId}`)
      .set('Authorization', `Bearer ${learnerToken}`)
      .send({ status: 'completed' });

    expect(res.statusCode).toBe(200);
    expect(res.body.request).toHaveProperty('status', 'completed');
  });
});
