import request from 'supertest';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import app from '../app';

const kasutaja = {
  kasutajaNimi: 'paavelpasun',
  parool: 'paavel123',
};

let token: string;
let kasutaja_id: number;

describe('Kasutaja controller', () => {
  describe('GET /kasutaja', () => {
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
      const response = await request(app).get('/kasutaja');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Puudub vajalik token');
    });
    it('vastab päringule koodiga 401 invaliidse tokeni tõttu', async () => {
      const response = await request(app)
        .get('/kasutaja')
        .set('Authorization', 'Bearer ölkxjdkljdglkjdgöljeöotuiöjkvlnvösodhg');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Token ei ole valiidne');
    });
    it('vastab päringule koodiga 200 ja tagastab kasutajate massiivi', async () => {
      const response = await request(app)
        .get('/kasutaja')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('kasutaja');
      expect(response.body.kasutaja).to.be.a('array');
      expect(response.body.kasutaja.length).to.greaterThan(0);
    });
  });
  describe('POST /kasutaja', () => {
    it('vastab päringule koodiga 400 ja veateatega puuduva parooli tõttu', async () => {
      const response = await request(app)
        .post('/oppejoud')
        .set('Authorization', `Bearer ${token}`)
        .send({
            eesNimi: "Pauno",
            pereNimi: "Palk",
            kasutajaNimi: "paunopalk",
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Vajalik on täpsustada parool');
    });
    it('vastab päringule koodiga 201 ja uue kasutaja ID-ga', async () => {
      const response = await request(app)
        .post('/kasutaja')
        .set('Authorization', `Bearer ${token}`)
        .send({
            eesNimi: "Pauno",
            pereNimi: "Palk",
            kasutajaNimi: "paunopalk",
            parool: "pauno123",
            roll: "Kasutaja",
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.have.key('id');
      expect(response.body.id).to.be.a('number');
      kasutaja_id = response.body.id;
    });
  });
  describe('DELETE /kasutaja/:id', () => {
    it('vastab päringule koodiga 204 ja tagastab tühja objekti', async () => {
      const response = await request(app)
        .delete(`/kasutaja/${kasutaja_id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(204);
    });
  });
});
