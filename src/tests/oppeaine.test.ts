import request from 'supertest';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import app from '../app';

const kasutaja = {
  kasutajaNimi: 'paavelpasun',
  parool: 'paavel123',
};

let token: string;
let oppeaine_id: number;

describe('Õppeaine controller', () => {
  describe('GET /oppeaine', () => {
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
      const response = await request(app).get('/oppeaine');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Puudub vajalik token');
    });
    it('vastab päringule koodiga 401 invaliidse tokeni tõttu', async () => {
      const response = await request(app)
        .get('/oppeaine')
        .set('Authorization', 'Bearer ölkxjdkljdglkjdgöljeöotuiöjkvlnvösodhg');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Token ei ole valiidne');
    });
    it('vastab päringule koodiga 200 ja tagastab õppeainete massiivi', async () => {
      const response = await request(app)
        .get('/oppeaine')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('oppeaine');
      expect(response.body.oppeaine).to.be.a('array');
      expect(response.body.oppeaine.length).to.greaterThan(0);
    });
  });
  describe('POST /oppeaine', () => {
    it('vastab päringule koodiga 400 ja veateatega puuduva aine nimetuse tõttu', async () => {
      const response = await request(app)
        .post('/oppeaine')
        .set('Authorization', `Bearer ${token}`)
        .send({
          oppejoud_id: 1,
          koht_id: 2,
          nadalapaev_id: 1,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Vajalik on täpsustada aine nimetus');
    });
    it('vastab päringule koodiga 201 ja uue õppeaine ID-ga', async () => {
      const response = await request(app)
        .post('/oppeaine')
        .set('Authorization', `Bearer ${token}`)
        .send({
          aineNimi: 'Robootika',
          oppejoud_id: 2,
          koht_id: 1,
          nadalapaev_id: 1,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.have.key('id');
      expect(response.body.id).to.be.a('number');
      oppeaine_id = response.body.id;
    });
  });
  describe('DELETE /oppeaine/:id', () => {
    it('vastab päringule koodiga 204 ja tagastab tühja objekti', async () => {
      const response = await request(app)
        .delete(`/oppeaine/${oppeaine_id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(204);
    });
  });
});
