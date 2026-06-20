const request = require('supertest');
const { app } = require('../src/server');

describe('Auth API', () => {
  let token = '';
  // Use a unique email for each test run to avoid conflict with existing users
  const uniqueSuffix = Date.now();
  const uniqueEmail = `testuser_${uniqueSuffix}@example.com`;
  const testUser = {
    username: `testuser_${uniqueSuffix}`,
    email: uniqueEmail,
    password: 'Password123',
    fullName: 'Test User',
  };

  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send(testUser);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('should login with correct credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testUser.email, password: testUser.password });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('should get current user when authenticated', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('email', testUser.email);
  });
});
