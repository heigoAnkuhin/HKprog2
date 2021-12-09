import { Oppeaine, uusOppeaine, uuendaOppeainet } from './interfaces';
import { FieldPacket, ResultSetHeader } from 'mysql2';
import yhendus from '../../database';


const oppeaineService = {

  kuvaKoikOppeained: async (): Promise<Oppeaine[] | false> => {
    try {
      const [oppeaine]: [Oppeaine[], FieldPacket[]] = await yhendus.query(
        `SELECT oppeaine.id, aineNimi, CONCAT(oppejoud.eesNimi, " ", oppejoud.pereNimi) AS Oppejoud,
         koht.kohaNimi AS Koht, nadalapaev.paevaNimi AS Paev FROM oppeaine
         INNER JOIN oppejoud ON oppejoud_id = oppejoud.id
         INNER JOIN koht ON koht_id = koht.id
         INNER JOIN nadalapaev ON nadalapaev_id = nadalapaev.id`);
      return oppeaine;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  otsiOppeainet: async (id: number): Promise<Oppeaine | false> => {
    try {
      const [oppeaine]: [Oppeaine[], FieldPacket[]] = await yhendus.query(
        `SELECT oppeaine.id, aineNimi, CONCAT(oppejoud.eesNimi, " ", oppejoud.pereNimi) AS Oppejoud,
        koht.kohaNimi AS Koht, nadalapaev.paevaNimi AS Paev FROM oppeaine
        INNER JOIN oppejoud ON oppejoud_id = oppejoud.id
        INNER JOIN koht ON koht_id = koht.id
        INNER JOIN nadalapaev ON nadalapaev_id = nadalapaev.id WHERE oppeaine.id = ?`, [id],
      );
      return oppeaine[0];
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  otsiOppeainet_oppejoud: async (id: number): Promise<Oppeaine[] | false> => {
    try {
      const [oppeaine]: [Oppeaine[], FieldPacket[]] = await yhendus.query(
        `SELECT oppeaine.id, aineNimi, CONCAT(oppejoud.eesNimi, " ", oppejoud.pereNimi) AS Oppejoud,
        koht.kohaNimi AS Koht, nadalapaev.paevaNimi AS Paev FROM oppeaine
        INNER JOIN oppejoud ON oppejoud_id = oppejoud.id
        INNER JOIN koht ON koht_id = koht.id
        INNER JOIN nadalapaev ON nadalapaev_id = nadalapaev.id WHERE oppejoud.id = ?`, [id]);
      return oppeaine;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  kustutaOppeaine: async (id: number): Promise<boolean> => {
    try {
      await yhendus.query('DELETE FROM oppeaine WHERE id = ?', [id]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  lisaOppeaine: async (uusOppeaine: uusOppeaine): Promise<number | false> => {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await yhendus.query('INSERT INTO oppeaine SET aineNimi = ?, oppejoud_id = ?, koht_id = ?, nadalapaev_id = ?', [uusOppeaine.aineNimi, uusOppeaine.oppejoud_id, uusOppeaine.koht_id, uusOppeaine.nadalapaev_id]);
      return result.insertId;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  uuendaOppeainet: async (oppeaine: uuendaOppeainet): Promise<boolean> => {
    try {
      const uuendatavOppeaine = { ...oppeaine };
      const result = await yhendus.query('UPDATE oppeaine SET ? WHERE id = ?', [uuendatavOppeaine, oppeaine.id]);
      console.log(result);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },  
    };


export default oppeaineService;