import { describe, it } from 'mocha';
import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

use(chaiHttp);
const httpRequest = request(app).keepOpen();

describe('Test parties', () => {
  it('Should Create a political party', (done) => {
    const data = {
      name: 'Action Alliance',
      hqAddress: '345, Billing way, New City',
      logoURL: 'http://aa.com'
    };
    httpRequest
      .post('/api/v1/parties')
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('status');
      });
    done();
  });
  it('Should Create a political party', (done) => {
    const data = {
      name: 'Action Alliance',
      hqAddress: '345, Billing way, New City',
      logoURL: 'http://aa.com'
    };
    httpRequest
      .post('/api/v1/auth/signup')
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('status');
      });
    done();
  });
  it('Should Create a user account', (done) => {
    const data = {
      firstname: 'kayode',
      lastname: 'jonh',
      email: 'kaykaykay1@gmail.com',
      password: 'constantin',
      phoneNumber: '0705499335350',
      isAdmin: true,
      passportURL: 'http://aa.com'
    };
    httpRequest
      .post('/api/v1/auth/signup')
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('status');
      });
    done();
  });
});
