import express, { Request, Response, Application } from 'express';
import { port } from './components/general/settings';
import { notFoundHandler } from "./middleware/notfound.middleware";
import { errorHandler } from "./middleware/errors.middleware";
import oppejoudController from './components/oppejoud/controller';
import oppeaineController from './components/oppeaine/controller';
import kohtController from './components/koht/controller';
import paevController from './components/paev/controller';
import db from './db';
import responseCodes from './components/general/responseCodes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './openapi.json';



const app: Application = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorHandler); // middleware 1
//app.use(notFoundHandler); // middleware 2


// **õppejõu endpoint:**

// kõikide õppejõudude kuvamine
app.get('/oppejoud', oppejoudController.kuvaKoikOppejoud);

// õppejõu otsimine id-ga
app.get('/oppejoud/:id', oppejoudController.otsiOppejoudu);

// õppejõu kustutamine
app.delete('/oppejoud/:id', oppejoudController.kustutaOppejoud);

//uue õppejõu lisamine
app.post('/oppejoud', oppejoudController.lisaOppejoud);

// õppejõu uuendamine
app.patch('/oppejoud/:id', oppejoudController.uuendaOppejoudu);



// **õppeaine endpoint:**

// kõikide õppeainete kuvamine
app.get('/oppeaine', oppeaineController.kuvaKoikOppeained);

// õppeainete otsimine id-ga
app.get('/oppeaine/:id', oppeaineController.otsiOppeainet);

// õppeaine kustutamine
app.delete('/oppeaine/:id', oppeaineController.kustutaOppeaine);

//uue õppeaine lisamine
app.post('/oppeaine', oppeaineController.lisaOppeaine);

// õppeaine uuendamine
app.patch('/oppeaine/:id', oppeaineController.uuendaOppeainet);


// **koha endpoint:**

// kõikide kohtade kuvamine
app.get('/koht', kohtController.kuvaKoikKohad);

// kohtade otsimine id-ga
app.get('/koht/:id', kohtController.otsiKohta);

// õppeaine kustutamine
app.delete('/koht/:id', kohtController.kustutaKoht);

//uue õppeaine lisamine
app.post('/koht', kohtController.lisaKoht);

// õppeaine uuendamine
app.patch('/koht/:id', kohtController.uuendaKohta);


// **aja ehk nädalapäeva endpoint:**

// kõikide aegade kuvamine
app.get('/paev', paevController.kuvaKoikPaevad);

// aegade otsimine id-ga
app.get('/paev/:id', paevController.otsiPaeva);

// aja kustutamine
app.delete('/paev/:id', paevController.kustutaPaev);

//uue aja lisamine
app.post('/paev', paevController.lisaPaev);

// aja uuendamine
app.patch('/paev/:id', paevController.uuendaPaeva);


app.listen(port, () => {
  console.log('Server is running');
});
