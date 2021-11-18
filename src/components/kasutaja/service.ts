import db from '../../db';
import { Kasutaja, uuendaKasutajat, uusKasutaja } from './interfaces';
import hashService from '../general/services/hashService';

const kasutajaService = {
  kuvaKoikKasutajad: (): Kasutaja[] => {
    const { kasutaja } = db;
    return kasutaja;
  },

  otsiKasutajat_id: (id: number): Kasutaja | undefined => {
    const kasutaja = db.kasutaja.find((element) => element.id === id);
    return kasutaja;
  },
  otsiKasutajat_kasutajaNimi: (kasutajaNimi: string): Kasutaja | undefined => {
    const kasutaja = db.kasutaja.find((element) => element.kasutajaNimi === kasutajaNimi);
    return kasutaja;
  },
  kustutaKasutaja: (id: number): boolean => {
    const index = db.kasutaja.findIndex((element) => element.id === id);
    db.kasutaja.splice(index, 1);
    return true;
  },
  lisaKasutaja: async (uusKasutaja: uusKasutaja) => {
    const id = db.kasutaja.length + 1;
    const hashitudParool = await hashService.hash(uusKasutaja.parool);
    db.kasutaja.push({
      id,
      ...uusKasutaja,
      parool: hashitudParool,
    });
    return id;
  },
  uuendaKasutajat: (user: uuendaKasutajat): boolean => {
    const { id, eesNimi, pereNimi } = user;
    const index = db.kasutaja.findIndex((element) => element.id === id);
    if (eesNimi) {
      db.kasutaja[index].eesNimi = eesNimi;
    }
    if (pereNimi) {
      db.kasutaja[index].pereNimi = pereNimi;
    }
    return true;
  },
};

export default kasutajaService;
