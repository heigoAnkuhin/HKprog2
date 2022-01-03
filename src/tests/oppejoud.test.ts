import request from 'supertest';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import app from '../app';

const kasutaja = {
  kasutajaNimi: 'paavelpasun',
  parool: 'paavel123',
};

let token: string;
let oppejoud_id: number;

describe('Õppejõu controller', () => {
  describe('GET /oppejoud', () => {
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
      const response = await request(app).get('/oppejoud');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Puudub vajalik token');
    });
    it('vastab päringule koodiga 401 invaliidse tokeni tõttu', async () => {
      const response = await request(app)
        .get('/oppejoud')
        .set('Authorization', 'Bearer ölkxjdkljdglkjdgöljeöotuiöjkvlnvösodhg');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Token ei ole valiidne');
    });
    it('vastab päringule koodiga 200 ja tagastab õppejõudude massiivi', async () => {
      const response = await request(app)
        .get('/oppejoud')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('oppejoud');
      expect(response.body.oppejoud).to.be.a('array');
      expect(response.body.oppejoud.length).to.greaterThan(0);
    });
  });
  describe('POST /oppejoud', () => {
    it('vastab päringule koodiga 400 ja veateatega puuduva õppejõu kasutaja tõttu', async () => {
      const response = await request(app)
        .post('/oppejoud')
        .set('Authorization', `Bearer ${token}`)
        .send({
            eesNimi: "Pauno",
            pereNimi: "Palk",
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Vajalik on täpsustada kasutaja ID');
    });
    it('vastab päringule koodiga 201 ja uue õppejõu ID-ga', async () => {
      const response = await request(app)
        .post('/oppejoud')
        .set('Authorization', `Bearer ${token}`)
        .send({
            eesNimi: "Pauno",
            pereNimi: "Palk",
            kasutaja_id: 1
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.have.key('id');
      expect(response.body.id).to.be.a('number');
      oppejoud_id = response.body.id;
    });
  });
  describe('DELETE /oppejoud/:id', () => {
    it('vastab päringule koodiga 204 ja tagastab tühja objekti', async () => {
      const response = await request(app)
        .delete(`/oppejoud/${oppejoud_id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(204);
    });
  });
});
