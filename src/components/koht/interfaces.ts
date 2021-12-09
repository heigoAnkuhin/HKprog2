import { RowDataPacket } from 'mysql2';

interface uusKoht {
  kohaNimi: string;
}

interface Koht extends uusKoht, RowDataPacket {
  id: number;
}

interface uuendaKohta {
  id: number;
  kohaNimi?: string;
}

export { Koht, uuendaKohta, uusKoht };
