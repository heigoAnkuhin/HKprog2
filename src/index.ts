import express, { Request, Response, Application } from 'express';
const app: Application = express();
app.use(express.json());

const port = 3000;

const responseCodes = {
  ok: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  notFound: 404,
};

// valisin endpointideks - õppejõud, õppeaine, koht, aeg

interface Oppejoud {
  id: number;
  eesNimi: string;
  pereNimi: string;
}

interface Oppeaine {
  id: number;
  aineNimi: string;
}

interface Koht {
  id: number;
  kohaNimi: string;
}

interface Paev {
  id: number;
  paevaNimi: string;
}

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

// õppejõu endpoint
app.get('/oppejoud', (req: Request, res: Response) => {
  res.status(responseCodes.ok).json({
    oppejoud: db.oppejoud,
  });
});


app.post('/oppejoud', (req: Request, res: Response) => {
  const { eesNimi, pereNimi } = req.body;
  const id = db.oppejoud.length + 1;
  if (!eesNimi) {
    return res.status(400).json({
      error: 'Palun täpsusta eesnimi.',
    });
  }
  if (!pereNimi) {
    return res.status(400).json({
      error: 'Palun täpsusta perenimi.',
    });
  }
  db.oppejoud.push({
    id,
    eesNimi,
    pereNimi,
  });
  return res.status(responseCodes.created).json({
    id,
  });
});

app.patch('/oppejoud/:id', (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const { eesNimi, pereNimi } = req.body;
  const index = db.oppejoud.findIndex((element) => element.id === id);

  if (!id) {
    return res.status(400).json({
      error: 'Kasutaja täpsustamiseks on vajalik ID.',
    });
  }
  if (!eesNimi && !pereNimi) {
    return res.status(400).json({
      error: 'Uuendamiseks vajalikud parameetrid puuduvad.',
    });
  }
  if (index < 0) {
    return res.status(400).json({
      error: `Kasutajat, kelle id on ${id} ei eksisteeri`,
    });
  }
  if (eesNimi) {
    db.oppejoud[index].eesNimi = eesNimi;
  }
  if (pereNimi) {
    db.oppejoud[index].pereNimi = pereNimi;
  }
  return res.status(responseCodes.noContent).send();
});

app.delete('/oppejoud/:id', (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const index = db.oppejoud.findIndex((element) => element.id === id);

  if (!id) {
    return res.status(400).json({
      error: 'Kasutaja täpsustamiseks on vajalik ID.',
    });
  }
  if (index < 0) {
    return res.status(responseCodes.badRequest).json({
      message: `Kasutajat, kelle id on ${id} ei eksisteeri.`,
    });
  }
  db.oppejoud.splice(index, 1);
  return res.status(responseCodes.noContent).send();
});

// õppeaine endpoint

app.get('/oppeaine', (req: Request, res: Response) => {
  res.status(responseCodes.ok).json({
    oppeaine: db.oppeaine,
  });
});

app.post('/oppeaine', (req: Request, res: Response) => {
  const { aineNimi } = req.body;
  const id = db.oppeaine.length + 1;
  if (!aineNimi) {
    return res.status(400).json({
      error: 'Palun täpsusta aine nimetus.',
    });
  }
  db.oppeaine.push({
    id,
    aineNimi,
  });
  return res.status(responseCodes.created).json({
    id,
  });
});

app.patch('/oppeaine/:id', (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const { aineNimi } = req.body;
  const index = db.oppeaine.findIndex((element) => element.id === id);

  if (!id) {
    return res.status(400).json({
      error: 'Õppeaine täpsustamiseks on vajalik ID.',
    });
  }
  if (!aineNimi) {
    return res.status(400).json({
      error: 'Uuendamiseks vajalikud parameetrid puuduvad.',
    });
  }
  if (index < 0) {
    return res.status(400).json({
      error: `Õppeainet, mille id on ${id} ei eksisteeri`,
    });
  }
  if (aineNimi) {
    db.oppeaine[index].aineNimi = aineNimi;
  }
  return res.status(responseCodes.noContent).send();
});

app.delete('/oppeaine/:id', (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const index = db.oppeaine.findIndex((element) => element.id === id);

  if (!id) {
    return res.status(400).json({
      error: 'Õppeaine täpsustamiseks on vajalik ID.',
    });
  }
  if (index < 0) {
    return res.status(responseCodes.badRequest).json({
      message: `Õppeainet, mille id on ${id} ei eksisteeri.`,
    });
  }
  db.oppeaine.splice(index, 1);
  return res.status(responseCodes.noContent).send();
});

// koha endpoint
app.get('/koht', (req: Request, res: Response) => {
  res.status(responseCodes.ok).json({
    koht: db.koht,
  });
});

app.post('/koht', (req: Request, res: Response) => {
  const { kohaNimi } = req.body;
  const id = db.koht.length + 1;
  if (!kohaNimi) {
    return res.status(400).json({
      error: 'Palun täpsusta klassiruum.',
    });
  }
  db.koht.push({
    id,
    kohaNimi,
  });
  return res.status(responseCodes.created).json({
    id,
  });
});

app.patch('/koht/:id', (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const { kohaNimi } = req.body;
  const index = db.koht.findIndex((element) => element.id === id);

  if (!id) {
    return res.status(400).json({
      error: 'Koha täpsustamiseks on vajalik ID.',
    });
  }
  if (!kohaNimi) {
    return res.status(400).json({
      error: 'Uuendamiseks vajalikud parameetrid puuduvad.',
    });
  }
  if (index < 0) {
    return res.status(400).json({
      error: `Klassiruumi, mille id on ${id} ei eksisteeri`,
    });
  }
  if (kohaNimi) {
    db.koht[index].kohaNimi = kohaNimi;
  }
  return res.status(responseCodes.noContent).send();
});

app.delete('/koht/:id', (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const index = db.koht.findIndex((element) => element.id === id);

  if (!id) {
    return res.status(400).json({
      error: 'Koha täpsustamiseks on vajalik ID.',
    });
  }
  if (index < 0) {
    return res.status(responseCodes.badRequest).json({
      message: `Klassiruumi, mille id on ${id} ei eksisteeri.`,
    });
  }
  db.koht.splice(index, 1);
  return res.status(responseCodes.noContent).send();
});

// aja ehk nädalapäeva endpoint
app.get('/nadalapaev', (req: Request, res: Response) => {
  res.status(responseCodes.ok).json({
    nadalapaev: db.nadalapaev,
  });
});

app.post('/nadalapaev', (req: Request, res: Response) => {
  const { paevaNimi } = req.body;
  const id = db.nadalapaev.length + 1;
  if (!paevaNimi) {
    return res.status(400).json({
      error: 'Palun täpsusta nädalapäev.',
    });
  }
  db.nadalapaev.push({
    id,
    paevaNimi,
  });
  return res.status(responseCodes.created).json({
    id,
  });
});

app.patch('/nadalapaev/:id', (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const { paevaNimi } = req.body;
  const index = db.nadalapaev.findIndex((element) => element.id === id);

  if (!id) {
    return res.status(400).json({
      error: 'Päeva täpsustamiseks on vajalik ID.',
    });
  }
  if (!paevaNimi) {
    return res.status(400).json({
      error: 'Uuendamiseks vajalikud parameetrid puuduvad.',
    });
  }
  if (index < 0) {
    return res.status(400).json({
      error: `Nädalapäeva, mille id on ${id} ei eksisteeri`,
    });
  }
  if (paevaNimi) {
    db.nadalapaev[index].paevaNimi = paevaNimi;
  }
  return res.status(responseCodes.noContent).send();
});

app.delete('/nadalapaev/:id', (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const index = db.nadalapaev.findIndex((element) => element.id === id);

  if (!id) {
    return res.status(400).json({
      error: 'Päeva täpsustamiseks on vajalik ID.',
    });
  }
  if (index < 0) {
    return res.status(responseCodes.badRequest).json({
      message: `Nädalapäeva, mille id on ${id} ei eksisteeri.`,
    });
  }
  db.nadalapaev.splice(index, 1);
  return res.status(responseCodes.noContent).send();
});


app.listen(port, () => {
  console.log('Server is running');
});
