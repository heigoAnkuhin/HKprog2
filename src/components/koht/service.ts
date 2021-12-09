//import db from '../../db';
import { Koht, uusKoht, uuendaKohta } from './interfaces';
import { FieldPacket, ResultSetHeader } from 'mysql2';
import yhendus from '../../database';

const kohtService = {

    kuvaKoikKohad: async (): Promise<Koht[] | false> => {
      try {
        const [koht]: [Koht[], FieldPacket[]] = await yhendus.query('SELECT id, kohaNimi FROM koht');
        return koht;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    otsiKohta: async (id: number): Promise<Koht | false> => {
      try {
        const [koht]: [Koht[], FieldPacket[]] = await yhendus.query(
          'SELECT id, kohaNimi FROM koht WHERE id = ?', [id],
        );
        return koht[0];
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    kustutaKoht: async (id: number): Promise<boolean> => {
      try {
        await yhendus.query('DELETE FROM koht WHERE id = ?', [id]);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    lisaKoht: async (uusKoht: uusKoht): Promise<number | false> => {
      try {
        const [result]: [ResultSetHeader, FieldPacket[]] = await yhendus.query('INSERT INTO koht SET kohaNimi = ?', [uusKoht.kohaNimi]);
        return result.insertId;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    uuendaKohta: async (koht: uuendaKohta): Promise<boolean> => {
      try {
        const uuendatavKoht = { ...koht };
        const result = await yhendus.query('UPDATE koht SET ? WHERE id = ?', [uuendatavKoht, koht.id]);
        console.log(result);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  };


export default kohtService;