//import db from '../../db';
import { FieldPacket, ResultSetHeader } from 'mysql2';
import yhendus from '../../database';
import { Kasutaja, uuendaKasutajat, uusKasutaja } from './interfaces';
import hashService from '../general/services/hashService';

const kasutajaService = {
  kuvaKoikKasutajad: async (): Promise<Kasutaja[] | false> => {
    try {
      const [kasutaja]: [Kasutaja[], FieldPacket[]] = await yhendus.query('SELECT id, eesNimi, pereNimi, kasutajaNimi, roll FROM kasutaja');
      return kasutaja;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  otsiKasutajat_id: async (id: number): Promise<Kasutaja | false> => {
    try {
      const [kasutaja]: [Kasutaja[], FieldPacket[]] = await yhendus.query(
        'SELECT id, eesNimi, pereNimi, kasutajaNimi FROM kasutaja WHERE id = ?', [id],
      );
      return kasutaja[0];
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  otsiKasutajat_kasutajaNimi: async (kasutajaNimi: string): Promise<Kasutaja | false> => {
    try {
      const [kasutaja]: [Kasutaja[], FieldPacket[]] = await yhendus.query('SELECT * FROM kasutaja WHERE kasutajaNimi = ?', [kasutajaNimi]);
      return kasutaja[0];
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  kustutaKasutaja: async (id: number): Promise<boolean> => {
    try {
      await yhendus.query('DELETE FROM kasutaja WHERE id = ?', [id]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  lisaKasutaja: async (uusKasutaja: uusKasutaja): Promise<number | false> => {
    try {
      const hashitudParool = await hashService.hash(uusKasutaja.parool);
      const kasutaja = {
        ...uusKasutaja,
        parool: hashitudParool,
      };
      const [result]: [ResultSetHeader, FieldPacket[]] = await yhendus.query('INSERT INTO kasutaja SET ?', [kasutaja]);
      return result.insertId;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  uuendaKasutajat: async (kasutaja: uuendaKasutajat): Promise<boolean> => {
    try {
      const uuendatavKasutaja = { ...kasutaja };
      if (kasutaja.parool) uuendatavKasutaja.parool = await hashService.hash(kasutaja.parool);
      const result = await yhendus.query('UPDATE kasutaja SET ? WHERE id = ?', [uuendatavKasutaja, kasutaja.id]);
      console.log(result);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

export default kasutajaService;
