import db from '../../db';
import Oppejoud from './interfaces';

const oppejoudService = {

    kuvaKoikOppejoud: (): Oppejoud[] => {
        const { oppejoud } = db;
        return oppejoud;
    },

    
    otsiOppejoudu: (id: number): Oppejoud | undefined=> {
        const oppejoud = db.oppejoud.find((element) => element.id === id);
        return oppejoud;

    },

    kustutaOppejoud: (id: number): boolean => {
        const index = db.oppejoud.findIndex((element) => element.id === id);
        db.oppejoud.splice(index, 1);
        return true;
    },

    lisaOppejoud: (eesNimi: string, pereNimi: string) => {
        const id = db.oppejoud.length + 1;
        db.oppejoud.push({
          id,
          eesNimi,
          pereNimi,
        });
        return id;
      },

      uuendaOppejoudu: (data: {id: number, eesNimi: string, pereNimi: string}): boolean => {
        const { id, eesNimi, pereNimi } = data;
        const index = db.oppejoud.findIndex((element) => element.id === id);
        if (eesNimi) {
          db.oppejoud[index].eesNimi = eesNimi;
        }
        if (pereNimi) {
          db.oppejoud[index].pereNimi = pereNimi;
        }
        return true;
      },
    };


export default oppejoudService;