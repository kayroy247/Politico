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
    newToken = res.body.token;
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('token');
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });
  it('Should vote a Candidate', async () => {
    const data = {
      office: 1,
      candidate: 1
    };
    const res = await request(app)
      .post('/api/v1/votes')
      .set('Authorization', `Bearer ${newToken}`)
      .send(data);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });
  it('Should not be able to vote the same office again', async () => {
    const data = {
      office: 1,
      candidate: 1
    };
    const res = await request(app)
      .post('/api/v1/votes')
      .set('Authorization', `Bearer ${newToken}`)
      .send(data);
    expect(res).to.have.status(409);
    expect(res.body).to.have.property('error')
      .to.be.equal('You can only vote once');
    expect(res.body).to.have.property('status');
  });
  it('Should Login to get a token', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .set('Authorization', 'here too')
      .send({ email: 'voterB@gmail.com', password: 'password' });
    newToken = res.body.token;
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('token');
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });
  it('Should vote a Candidate', async () => {
    const data = {
      office: 1,
      candidate: 1
    };
    const res = await request(app)
      .post('/api/v1/votes')
      .set('Authorization', `Bearer ${newToken}`)
      .send(data);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });
  it('Should not be able to vote the same office again', async () => {
    const data = {
      office: 1,
      candidate: 2
    };
    const res = await request(app)
      .post('/api/v1/votes')
      .set('Authorization', `Bearer ${newToken}`)
      .send(data);
    expect(res).to.have.status(409);
    expect(res.body).to.have.property('error')
      .to.be.equal('You can only vote once');
    expect(res.body).to.have.property('status');
  });
  it('Should Login to get a token', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .set('Authorization', 'here too')
      .send({ email: 'voterC@gmail.com', password: 'password' });
    newToken = res.body.token;
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('token');
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });
  it('Should vote a Candidate', async () => {
    const data = {
      office: 1,
      candidate: 2
    };
    const res = await request(app)
      .post('/api/v1/votes')
      .set('Authorization', `Bearer ${newToken}`)
      .send(data);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });
  it('Should not be able to vote the same office again', async () => {
    const data = {
      office: 1,
      candidate: 1
    };
    const res = await request(app)
      .post('/api/v1/votes')
      .set('Authorization', `Bearer ${newToken}`)
      .send(data);
    expect(res).to.have.status(409);
    expect(res.body).to.have.property('error')
      .to.be.equal('You can only vote once');
    expect(res.body).to.have.property('status');
  });
});
