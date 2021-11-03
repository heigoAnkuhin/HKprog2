import db from '../../db';
import Koht from './interfaces';

const kohtService = {

    kuvaKoikKohad: (): Koht[] => {
        const { koht } = db;
        return koht;
    },

    
    otsiKohta: (id: number): Koht | undefined=> {
        const koht = db.koht.find((element) => element.id === id);
        return koht;

    },

    kustutaKoht: (id: number): boolean => {
        const index = db.koht.findIndex((element) => element.id === id);
        db.koht.splice(index, 1);
        return true;
    },

    lisaKoht: (kohaNimi: string) => {
        const id = db.koht.length + 1;
        db.koht.push({
          id,
          kohaNimi,
        });
        return id;
      },

      uuendaKohta: (data: {id: number, kohaNimi: string}): boolean => {
        const { id, kohaNimi } = data;
        const index = db.koht.findIndex((element) => element.id === id);
        if (kohaNimi) {
          db.koht[index].kohaNimi = kohaNimi;
        }
        return true;
      },
    };


export default kohtService;