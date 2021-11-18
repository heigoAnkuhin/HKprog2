import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import kasutajaService from './service';
import { uuendaKasutajat, uusKasutaja } from './interfaces';

const kasutajaController = {
  kuvaKoikKasutajad: (req: Request, res: Response) => {
    const kasutaja = kasutajaService.kuvaKoikKasutajad();
    return res.status(responseCodes.ok).json({
      kasutaja,
    });
  },
  otsiKasutajat_id: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'Vajalik on täpsustada ID',
      });
    }
    const kasutaja = kasutajaService.otsiKasutajat_id(id);
    if (!kasutaja) {
      return res.status(responseCodes.badRequest).json({
        error: `Ei leitud kasutajat, kelle id oleks: ${id}`,
      });
    }
    return res.status(responseCodes.ok).json({
      kasutaja,
    });
  },
  kustutaKasutaja: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'Vajalik on täpsustada ID',
      });
    }
    const kasutaja = kasutajaService.otsiKasutajat_id(id);
    if (!kasutaja) {
      return res.status(responseCodes.badRequest).json({
        message: `Ei leitud kasutajat, kelle id oleks: ${id}`,
      });
    }
    kasutajaService.kustutaKasutaja(id);
    return res.status(responseCodes.noContent).json({});
  },
  lisaKasutaja: async (req: Request, res: Response) => {
    const {
      eesNimi, pereNimi, parool, kasutajaNimi,
    } = req.body;
    if (!eesNimi) {
      return res.status(responseCodes.badRequest).json({
        error: 'Vajalik on täpsustada eesnimi',
      });
    }
    if (!pereNimi) {
      return res.status(responseCodes.badRequest).json({
        error: 'Vajalik on täpsustada perenimi',
      });
    }
    if (!kasutajaNimi) {
      return res.status(responseCodes.badRequest).json({
        error: 'Vajalik on täpsustada kasutajanimi',
      });
    }
    if (!parool) {
      return res.status(responseCodes.badRequest).json({
        error: 'Vajalik on täpsustada parool',
      });
    }
    const uusKasutaja: uusKasutaja = {
      eesNimi,
      pereNimi,
      kasutajaNimi,
      parool,
      roll: 'Kasutaja',
    };
    const id = await kasutajaService.lisaKasutaja(uusKasutaja);
    return res.status(responseCodes.created).json({
      id,
    });
  },
  uuendaKasutajat: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { eesNimi, pereNimi } = req.body;
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'Vajalik on täpsustada ID',
      });
    }
    if (!eesNimi && !pereNimi) {
      return res.status(responseCodes.badRequest).json({
        error: 'Pole midagi uuendada',
      });
    }
    const kasutaja = kasutajaService.otsiKasutajat_id(id);
    if (!kasutaja) {
      return res.status(responseCodes.badRequest).json({
        error: `Ei leitud kasutajat, kelle id oleks: ${id}`,
      });
    }
    const uuendaKasutajat: uuendaKasutajat = {
      id,
      eesNimi,
      pereNimi,
    };
    kasutajaService.uuendaKasutajat(uuendaKasutajat);
    return res.status(responseCodes.noContent).json({});
  },
};

export default kasutajaController;
