import { Paev, uusPaev, uuendaPaeva } from './interfaces';
import { FieldPacket, ResultSetHeader } from 'mysql2';
import yhendus from '../../database';

const paevService = {

  kuvaKoikPaevad: async (): Promise<Paev[] | false> => {
    try {
      const [paev]: [Paev[], FieldPacket[]] = await yhendus.query('SELECT id, paevaNimi FROM nadalapaev');
      return paev;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  otsiPaeva: async (id: number): Promise<Paev | false> => {
    try {
      const [paev]: [Paev[], FieldPacket[]] = await yhendus.query(
        'SELECT id, paevaNimi FROM nadalapaev WHERE id = ?', [id],
      );
      return paev[0];
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  kustutaPaev: async (id: number): Promise<boolean> => {
    try {
      await yhendus.query('DELETE FROM nadalapaev WHERE id = ?', [id]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  lisaPaev: async (uusPaev: uusPaev): Promise<number | false> => {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await yhendus.query('INSERT INTO nadalapaev SET paevaNimi = ?', [uusPaev.paevaNimi]);
      return result.insertId;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
      uuendaPaeva: async (paev: uuendaPaeva): Promise<boolean> => {
        try {
          const uuendatavPaev = { ...paev };
          const result = await yhendus.query('UPDATE nadalapaev SET ? WHERE id = ?', [uuendatavPaev, paev.id]);
          console.log(result);
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }, 
    };


export default paevService;