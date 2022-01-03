import request from 'supertest';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import app from '../app';

const kasutaja = {
  kasutajaNimi: 'paavelpasun',
  parool: 'paavel123',
};

let token: string;
let koht_id: number;

describe('Koha controller', () => {
  describe('GET /koht', () => {
    it('sisselogituna vastab päringule tokeni ja koodiga 200', async () => {
      const response = await request(app)
        .post('/login')
        .send(kasutaja);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('token');
      expect(response.body.token).to.be.a('string');
      token = response.body.token;
    });
    it('vastab päringule koodiga 401 puuduva tokeni tõttu', async () => {
      const response = await request(app).get('/koht');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Puudub vajalik token');
    });
    it('vastab päringule koodiga 401 invaliidse tokeni tõttu', async () => {
      const response = await request(app)
        .get('/koht')
        .set('Authorization', 'Bearer ölkxjdkljdglkjdgöljeöotuiöjkvlnvösodhg');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Token ei ole valiidne');
    });
    it('vastab päringule koodiga 200 ja tagastab kohtade massiivi', async () => {
      const response = await request(app)
        .get('/koht')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('koht');
      expect(response.body.koht).to.be.a('array');
      expect(response.body.koht.length).to.greaterThan(0);
    });
  });
  describe('POST /koht', () => {
    it('vastab päringule koodiga 400 ja veateatega puuduva koha nimetuse tõttu', async () => {
      const response = await request(app)
        .post('/koht')
        .set('Authorization', `Bearer ${token}`)
        .send({
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Vajalik on täpsustada koht');
    });
    it('vastab päringule koodiga 201 ja uue koha ID-ga', async () => {
      const response = await request(app)
        .post('/koht')
        .set('Authorization', `Bearer ${token}`)
        .send({
          kohaNimi: 'KAB-123',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.have.key('id');
      expect(response.body.id).to.be.a('number');
      koht_id = response.body.id;
    });
  });
  describe('DELETE /koht/:id', () => {
    it('vastab päringule koodiga 204 ja tagastab tühja objekti', async () => {
      const response = await request(app)
        .delete(`/koht/${koht_id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(204);
    });
  });
});
