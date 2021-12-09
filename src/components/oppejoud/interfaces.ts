import { RowDataPacket } from 'mysql2';

interface uusOppejoud {
  eesNimi: string;
  pereNimi: string;
  kasutaja_id: number;
}

interface Oppejoud extends uusOppejoud, RowDataPacket {
  id: number;
}

interface uuendaOppejoudu {
  id: number;
  eesNimi?: string;
  pereNimi?: string;
  kasutaja_id?: number;
}

export { Oppejoud, uuendaOppejoudu, uusOppejoud };