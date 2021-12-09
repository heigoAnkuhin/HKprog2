import { Oppejoud, uusOppejoud, uuendaOppejoudu } from './interfaces';
import { FieldPacket, ResultSetHeader } from 'mysql2';
import yhendus from '../../database';

const oppejoudService = {

  kuvaKoikOppejoud: async (): Promise<Oppejoud[] | false> => {
    try {
      const [oppejoud]: [Oppejoud[], FieldPacket[]] = await yhendus.query('SELECT id, eesNimi, pereNimi, kasutaja_id FROM oppejoud');
      return oppejoud;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  otsiOppejoudu: async (id: number): Promise<Oppejoud | false> => {
    try {
      const [oppejoud]: [Oppejoud[], FieldPacket[]] = await yhendus.query(
        'SELECT id, eesNimi, pereNimi, kasutaja_id FROM oppejoud WHERE id = ?', [id],
      );
      return oppejoud[0];
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  kustutaOppejoud: async (id: number): Promise<boolean> => {
    try {
      await yhendus.query('DELETE FROM oppejoud WHERE id = ?', [id]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  lisaOppejoud: async (uusOppejoud: uusOppejoud): Promise<number | false> => {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await yhendus.query('INSERT INTO oppejoud SET eesNimi = ?, pereNimi = ?, kasutaja_id = ?', [uusOppejoud.eesNimi, uusOppejoud.pereNimi, uusOppejoud.kasutaja_id]);
      return result.insertId;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  uuendaOppejoudu: async (oppejoud: uuendaOppejoudu): Promise<boolean> => {
    try {
      const uuendatavOppejoud = { ...oppejoud };
      const result = await yhendus.query('UPDATE oppejoud SET ? WHERE id = ?', [uuendatavOppejoud, oppejoud.id]);
      console.log(result);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },  
    };


export default oppejoudService;