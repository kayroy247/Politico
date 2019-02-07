import '@babel/polyfill';
import { describe, it } from 'mocha';
import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

use(chaiHttp);
describe('Test offices endpoints', () => {
  it('Should Create an admin account', async () => {
    const data = {
      firstname: 'Olusegun',
      lastname: 'Samson',
      email: 'admin@gmail.com',
      phoneNumber: '090847823733',
      password: 'password',
      isAdmin: true
    };
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .set('Authorization', 'here too')
      .send(data);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });
  it('Should Create a user account', async () => {
    const data = {
      firstname: 'Olusegun',
      lastname: 'Samson',
      email: 'voterA@gmail.com',
      phoneNumber: '090847823733',
      password: 'password'
    };
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .set('Authorization', 'here too')
      .send(data);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });
  it('Should Create userB account', async () => {
    const data = {
      firstname: 'Olusegun',
      lastname: 'Samson',
      email: 'voterB@gmail.com',
      phoneNumber: '090847823733',
      password: 'password'
    };
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .set('Authorization', 'here too')
      .send(data);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });
  it('Should Create userC account', async () => {
    const data = {
      firstname: 'Olusegun',
      lastname: 'Samson',
      email: 'voterC@gmail.com',
      phoneNumber: '090847823733',
      password: 'password'
    };
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .set('Authorization', 'here too')
      .send(data);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });
  it('Should return pasword already in use', async () => {
    const data = {
      firstname: 'Olusegun',
      lastname: 'Samson',
      email: 'voterC@gmail.com',
      phoneNumber: '090847823733',
      password: 'password'
    };
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .set('Authorization', 'here too')
      .send(data);
    expect(res).to.have.status(409);
    expect(res.body).to.have.property('error');
    expect(res.body).to.have.property('status');
  });
});
