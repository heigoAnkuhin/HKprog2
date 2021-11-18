// Kasutaja interface

 interface uusKasutaja {
    eesNimi: string;
    pereNimi: string;
    kasutajaNimi: string;
    parool: string;
    roll: 'Administraator' | 'Kasutaja';
  }
  
  interface Kasutaja extends uusKasutaja{
    id: number;
  }
  
  interface uuendaKasutajat {
    id: number;
    eesNimi?: string;
    pereNimi?: string;
    kasutajaNimi?: string;
    parool?: string;
    roll?: 'Administraator' | 'Kasutaja';
  }
  
  export { Kasutaja, uuendaKasutajat, uusKasutaja };
  