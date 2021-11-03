import Oppejoud from './components/oppejoud/interfaces';
import Oppeaine from './components/oppeaine/interfaces';
import Koht from './components/koht/interfaces';
import Paev from './components/paev/interfaces';  

  
  interface DB {
    oppejoud: Oppejoud[];
    oppeaine: Oppeaine[];
    koht: Koht[];
    nadalapaev: Paev[];
  }
  
  const db: DB = {
    oppejoud: [
      {
        id: 1,
        eesNimi: 'Juku',
        pereNimi: 'Juurikas',
      },
      {
        id: 2,
        eesNimi: 'Mari',
        pereNimi: 'Maasikas',
      }
    ],
    oppeaine: [
      {
        id: 1,
        aineNimi: 'Riistvara'
      },
      {
        id: 2,
        aineNimi: 'Programmeerimine',
      }
    ],
    koht : [
      {
        id: 1,
        kohaNimi: 'Klass 1'
      },
      {
        id: 2,
        kohaNimi: 'Klass 2',
      }
    ],
    nadalapaev: [
      {
        id: 1,
        paevaNimi: 'Esmaspäev'
      },
      {
        id: 2,
        paevaNimi: 'Kolmpäev',
      }
    ]
  }

  export default db;