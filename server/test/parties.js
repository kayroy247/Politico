import '@babel/polyfill';
import { describe, it } from 'mocha';
import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

use(chaiHttp);
let newToken;

describe('Test offices endpoints', () => {
  it('Should  version  message', (done) => {
    request(app)
      .post('/api/v1/offices')
      .set('Authorization', 'here too')
      .send({ name: 'manana' })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('status');
      });
    done();
  });

  it('Should Create a user account', async () => {
    const data = {
      firstname: 'Olusegun',
      lastname: 'Samson',
      email: 'samsam@gmail.com',
      phoneNumber: '090847823733',
      password: 'password',
      passportURL: 'http://chapa.com',
      isAdmin: true
    };
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .set('Authorization', 'here too')
      .send(data);
    newToken = res.body.token;
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('token');
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });
  it('Should Login to get a token', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .set('Authorization', 'here too')
      .send({ email: 'okunladekayode@gmail.com', password: 'password' });
    newToken = res.body.token;
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('token');
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

  it('Should  test offices endpoint', async () => {
    const res = await request(app)
      .get('/api/v1/offices')
      .set('Authorization', `Bearer ${newToken}`);
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
  it('Should access parties endpoint', async () => {
    const res = await request(app)
      .get('/api/v1/parties/1')
      .set('Authorization', `Bearer ${newToken}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });
  it('Should Create a office', async () => {
    const data = {
      name: 'Federal',
      type: 'Presidential office'
    };
    const res = await request(app)
      .post('/api/v1/offices')
      .set('Authorization', `Bearer ${newToken}`)
      .send(data);
    console.log(res.body.error);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });
  it('Should access parties endpoint', async () => {
    const res = await request(app)
      .get('/api/v1/offices/1')
      .set('Authorization', `Bearer ${newToken}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });
  it('Should Create a Candidate', async () => {
    const data = {
      party: 1,
      office: 1
    };
    const res = await request(app)
      .post('/api/v1/office/1/register')
      .set('Authorization', `Bearer ${newToken}`)
      .send(data);
    console.log(res.body.error);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });
  it('Should vote a Candidate', async () => {
    const data = {
      office: 1,
      candidate: 1,
      voter: 1
    };
    const res = await request(app)
      .post('/api/v1/votes')
      .set('Authorization', `Bearer ${newToken}`)
      .send(data);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });
  it('Should vote a Candidate', async () => {
    const data = {
      office: 1,
      candidate: 1,
      voter: 2
    };
    const res = await request(app)
      .post('/api/v1/votes')
      .set('Authorization', `Bearer ${newToken}`)
      .send(data);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });
  it('A candidate should not be able to vote twice', async () => {
    const data = {
      office: 1,
      candidate: 1,
      voter: 1
    };
    const res = await request(app)
      .post('/api/v1/votes')
      .set('Authorization', `Bearer ${newToken}`)
      .send(data);
    expect(res).to.have.status(409);
    expect(res.body).to.have.property('error');
    expect(res.body).to.have.property('status');
  });
  it('Should election result of an office', async () => {
    const res = await request(app)
      .get('/api/v1/office/1/result')
      .set('Authorization', `Bearer ${newToken}`);
    console.log(res.body);
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
      .delete('/api/v1/parties/1')
      .set('Authorization', `Bearer ${newToken}`);
    expect(res).to.have.status(202);
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('status');
  });
});
