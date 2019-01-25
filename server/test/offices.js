import { describe, it } from 'mocha';
import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

use(chaiHttp);
const httpRequest = request(app).keepOpen();

describe('GET /', () => {
  it('Should return the message of the base url', (done) => {
    httpRequest
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message')
          .to.be.equal('Welcome to Politico Application');
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('status');
      });
    done();
  });
});

describe('GET /api/v1', () => {
  it('Should return version 1 welcome message', (done) => {
    httpRequest
      .get('/api/v1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message')
          .to.be.equal('Welcome to Politico API VERSION 1');
        expect(res.body).not.to.be.have.property('status');
      });
    done();
  });
});

describe('GET /api/v1/offices', () => {
  it('Should return all offices', (done) => {
    httpRequest
      .get('/api/v1/offices')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        expect(res.body).to.be.an('object');
      });
    done();
  });
});

describe('GET /api/v1/offices/1', () => {
  it('Should fetch One office by officeID', (done) => {
    httpRequest
      .get('/api/v1/offices/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        expect(res.body).to.be.an('object');
      });
    done();
  });
});


describe('POST /api/v1/offices', () => {
  it('Should create a new Political Office', (done) => {
    const data = {
      type: 'Presidential',
      name: 'Presidential',
      location: 'Nigeria'
    };
    httpRequest
      .post('/api/v1/offices')
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message')
          .to.be.equal('Political Office Successfully Created');
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('status');
      });
    done();
  });
});
