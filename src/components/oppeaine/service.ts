import db from '../../db';
import Oppeaine from './interfaces';

const oppeaineService = {

    kuvaKoikOppeained: (): Oppeaine[] => {
        const { oppeaine } = db;
        return oppeaine;
    },

    
    otsiOppeainet: (id: number): Oppeaine | undefined=> {
        const oppeaine = db.oppeaine.find((element) => element.id === id);
        return oppeaine;

    },

    kustutaOppeaine: (id: number): boolean => {
        const index = db.oppeaine.findIndex((element) => element.id === id);
        db.oppeaine.splice(index, 1);
        return true;
    },

    lisaOppeaine: (aineNimi: string) => {
        const id = db.oppeaine.length + 1;
        db.oppeaine.push({
          id,
          aineNimi,
        });
        return id;
      },

      uuendaOppeainet: (data: {id: number, aineNimi: string}): boolean => {
        const { id, aineNimi } = data;
        const index = db.oppeaine.findIndex((element) => element.id === id);
        if (aineNimi) {
          db.oppeaine[index].aineNimi = aineNimi;
        }
        return true;
      },
    };


export default oppeaineService;