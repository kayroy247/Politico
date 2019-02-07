import { describe, it } from 'mocha';
import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

use(chaiHttp);


describe('Test offices endpoints', () => {
  it('Should return the message of the base url', (done) => {
    request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message')
          .to.be.equal('Welcome to Politico Application');
        expect(res.body).to.have.property('status');
      });
    done();
  });
  it('Should return version 1 welcome message', (done) => {
    request(app)
      .get('/api/v1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message')
          .to.be.equal('Welcome to Politico API VERSION 1');
        expect(res.body).to.have.property('status')
          .to.be.equal(200);
      });
    done();
  });
  it('Should return 404', (done) => {
    request(app)
      .get('/api/v1/notfound')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error')
          .to.be.equal('Resource Not Found');
        expect(res.body).to.have.property('status')
          .to.be.equal(404);
      });
    done();
  });
  it('Should return error', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('status')
          .to.be.equal(400);
      });
    done();
  });
  it('Should return error message and 404', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('status')
          .to.be.equal(400);
      });
    done();
  });
  it('Should not be able the access the votes endpoint', (done) => {
    request(app)
      .post('/api/v1/votes')
      .end((err, res) => {
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('status');
      });
    done();
  });
  it('Should return 401', (done) => {
    request(app)
      .get('/api/v1/parties')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('status')
          .to.be.equal(401);
      });
    done();
  });
  it('Should return 401', (done) => {
    request(app)
      .get('/api/v1/offices')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('status')
          .to.be.equal(401);
      });
    done();
  });
});
