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

    }
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
      .send({ email: 'samsam@gmail.com', password: 'password' });
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
});