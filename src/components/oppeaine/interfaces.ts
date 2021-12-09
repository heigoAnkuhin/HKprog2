import { RowDataPacket } from 'mysql2';

interface uusOppeaine {
  aineNimi: string;
  oppejoud_id: number;
  koht_id: number;
  nadalapaev_id: number;
}

interface Oppeaine extends uusOppeaine, RowDataPacket {
    id: number;
  }

interface uuendaOppeainet {
  id: number;
  aineNimi?: string;
  oppejoud_id?: number;
  koht_id?: number;
  nadalapaev_id?: number; 
}

export { Oppeaine, uuendaOppeainet, uusOppeaine };
