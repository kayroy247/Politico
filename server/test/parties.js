import { describe, it } from 'mocha';
import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

use(chaiHttp);
const httpRequest = request(app).keepOpen();

describe('GET /api/v1/parties', () => {
  it('Should return all parties', (done) => {
    httpRequest
      .get('/api/v1/parties')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        expect(res.body).to.be.an('object');
      });
    done();
  });
});

describe('GET /api/v1/parties/1', () => {
  it('Should fetch One political party', (done) => {
    httpRequest
      .get('/api/v1/parties/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        expect(res.body).to.be.an('object');
      });
    done();
  });
});

describe('PATCH /api/v1/parties/1/name', () => {
  it('Should edit a political party name by ID', (done) => {
    const data = {
      name: 'Action Party'
    };
    httpRequest
      .patch('/api/v1/parties/1/name')
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
      });
    done();
  });
});

describe('POST /api/v1/parties', () => {
  it('Should Create a political party', (done) => {
    const data = {
      name: 'Action Alliance',
      acronym: 'AA'
    };
    httpRequest
      .post('/api/v1/parties')
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('status');
      });
    done();
  });
});

describe('DELETE /api/v1/parties/2', () => {
  it('Should delete the specific political party', (done) => {
    httpRequest
      .delete('/api/v1/parties/2')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message')
          .to.be.equal('Political Party Successfully Deleted');
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('status');
      });
    done();
  });
});
