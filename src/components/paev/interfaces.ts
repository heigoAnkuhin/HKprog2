import { RowDataPacket } from 'mysql2';

interface uusPaev {
  paevaNimi: string;
}

interface Paev extends uusPaev, RowDataPacket {
  id: number;
}

interface uuendaPaeva {
  id: number;
  paevaNimi?: string;
}

export { Paev, uuendaPaeva, uusPaev };