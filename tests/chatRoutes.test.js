const request = require('supertest');
const app = require('../server');

describe('POST /messages', () => {
  it('should respond with JSON', async () => {
    const response = await request(app)
      .post('/api/messages')
      .send({ message: 'Hello, Kevin!' })
      .expect('Content-Type', /json/)
      .expect(200)
      .catch(error => {
        console.error("Error during POST /messages test:", error.message);
        console.error(error.stack);
        throw error;
      });

    expect(response.body).toHaveProperty('response');
    console.log('POST /messages responded with JSON as expected.');
  });
});