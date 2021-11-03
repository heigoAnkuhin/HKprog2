import db from '../../db';
import Paev from './interfaces';

const paevService = {

    kuvaKoikPaevad: (): Paev[] => {
        const { nadalapaev } = db;
        return nadalapaev;
    },

    
    otsiPaeva: (id: number): Paev | undefined=> {
        const nadalapaev = db.nadalapaev.find((element) => element.id === id);
        return nadalapaev;

    },

    kustutaPaev: (id: number): boolean => {
        const index = db.koht.findIndex((element) => element.id === id);
        db.nadalapaev.splice(index, 1);
        return true;
    },

    lisaPaev: (paevaNimi: string) => {
        const id = db.nadalapaev.length + 1;
        db.nadalapaev.push({
          id,
          paevaNimi,
        });
        return id;
      },

      uuendaPaeva: (data: {id: number, paevaNimi: string}): boolean => {
        const { id, paevaNimi } = data;
        const index = db.nadalapaev.findIndex((element) => element.id === id);
        if (paevaNimi) {
          db.nadalapaev[index].paevaNimi = paevaNimi;
        }
        return true;
      },
    };


export default paevService;