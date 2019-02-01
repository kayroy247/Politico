import { describe, it, before } from 'mocha';
import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

use(chaiHttp);
const httpRequest = request(app).keepOpen();
let newToken = '';

describe('Test offices endpoints', () => {
  before((done) => {
    const data = {
      email: 'okunladekayode@gmail',
      password: 'password'
    };
    httpRequest
      .post('api/v1/auth/login')
      .send(data)
      .end((err, res) => {
        const { token } = res.body;
        newToken = token;
      });
    done();
  });
  it('Should return all parties', (done) => {
    httpRequest
      .get('/api/v1/parties')
      .set({ Authorization: `Bearer ${newToken}` })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
      });
    done();
  });
  it('Should return all parties', (done) => {
    httpRequest
      .get('/api/v1/offices')
      .set({ Authorization: `Bearer ${newToken}` })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
      });
    done();
  });
});
