import '@babel/polyfill';
import { describe, it } from 'mocha';
import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

use(chaiHttp);
let newToken;

describe('Test offices endpoints', () => {
  it('Should Login to get a token', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .set('Authorization', 'here too')
      .send({ email: 'voterA@gmail.com', password: 'password' });
    newToken = res.body.data[0].token;
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });
  it('Should return election result of an office', async () => {
    const res = await request(app)
      .get('/api/v1/office/1/result')
      .set('Authorization', `Bearer ${newToken}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('data');
    expect(res.body.data).to.be.an('array');
    expect(res.body).to.have.property('status');
  });
  it('Should Login to get a token', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .set('Authorization', 'here too')
      .send({ email: 'admin@gmail.com', password: 'password' });
    newToken = res.body.data[0].token;
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });
  it('Should return election result of an office', async () => {
    const res = await request(app)
      .get('/api/v1/office/1/result')
      .set('Authorization', `Bearer ${newToken}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('data');
    expect(res.body.data).to.be.an('array');
    expect(res.body).to.have.property('status');
  });
});
