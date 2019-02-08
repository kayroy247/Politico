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
      .send({ email: 'admin@gmail.com', password: 'password' });
    newToken = await res.body.data[0].token;
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });
  it('Should Create a Party', async () => {
    const data = {
      name: 'Action Progressive Congress',
      hqAddress: '32, Norway st, Abuja',
      logoURL: 'http://apc.com'
    };
    const res = await request(app)
      .post('/api/v1/parties')
      .set('Authorization', `Bearer ${newToken}`)
      .send(data);

    expect(res).to.have.status(201);
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });
  it('Should Create a Party', async () => {
    const data = {
      name: 'Democratic Party',
      hqAddress: '32, Norway st, Abuja',
      logoURL: 'http://apc.com'
    };
    const res = await request(app)
      .post('/api/v1/parties')
      .set('Authorization', `Bearer ${newToken}`)
      .send(data);

    expect(res).to.have.status(201);
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });
  it('Should Create a Party', async () => {
    const data = {
      name: 'Peoples trust',
      hqAddress: '32, Norway st, Abuja',
      logoURL: 'http://apc.com'
    };
    const res = await request(app)
      .post('/api/v1/parties')
      .set('Authorization', `Bearer ${newToken}`)
      .send(data);

    expect(res).to.have.status(201);
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });
  it('Should access parties endpoint', async () => {
    const res = await request(app)
      .get('/api/v1/parties/1')
      .set('Authorization', `Bearer ${newToken}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });

  it('Should access parties endpoint', async () => {
    const res = await request(app)
      .get('/api/v1/parties')
      .set('Authorization', `Bearer ${newToken}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });
  it('Should edit a party name', async () => {
    const data = {
      name: 'Action Congress'
    };
    const res = await request(app)
      .patch('/api/v1/parties/1/name')
      .set('Authorization', `Bearer ${newToken}`)
      .send(data);
    expect(res).to.have.status(202);
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });
  it('Should delete a party by id', async () => {
    const res = await request(app)
      .delete('/api/v1/parties/3')
      .set('Authorization', `Bearer ${newToken}`);
    expect(res).to.have.status(202);
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });
  it('Should Create an office', async () => {
    const data = {
      name: 'Federal',
      type: 'Presidential office'
    };
    const res = await request(app)
      .post('/api/v1/offices')
      .set('Authorization', `Bearer ${newToken}`)
      .send(data);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });

  it('Should  test offices endpoint', async () => {
    const res = await request(app)
      .get('/api/v1/offices')
      .set('Authorization', `Bearer ${newToken}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });
  it('Should access offices endpoint', async () => {
    const res = await request(app)
      .get('/api/v1/offices/1')
      .set('Authorization', `Bearer ${newToken}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });
  it('Should Create first Candidate', async () => {
    const data = {
      party: 1,
      office: 1
    };
    const res = await request(app)
      .post('/api/v1/office/1/register')
      .set('Authorization', `Bearer ${newToken}`)
      .send(data);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });
  it('Should Create second Candidate', async () => {
    const data = {
      party: 2,
      office: 1
    };
    const res = await request(app)
      .post('/api/v1/office/2/register')
      .set('Authorization', `Bearer ${newToken}`)
      .send(data);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });
});
