import { Request, Response } from 'express';
import db from '../../db';
import responseCodes from '../general/responseCodes';
import oppejoudService from './service';

const oppejoudController = {

    kuvaKoikOppejoud: (req: Request, res: Response) => {
        const users = oppejoudService.kuvaKoikOppejoud();
        return res.status(responseCodes.ok).json({
          users,
        });
      },

      otsiOppejoudu: (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id, 10);
        if (!id) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada ID',
          });
        }

        const oppejoud = oppejoudService.otsiOppejoudu(id);
        if (!oppejoud) {
          return res.status(responseCodes.badRequest).json({
            error: `Ei leitud õppejoudu, kelle id oleks: ${id}`,
          });
        }
        return res.status(responseCodes.ok).json({
          oppejoud,
        });
      },

      kustutaOppejoud:  (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id, 10);
        if (!id) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada ID',
          });
        }
        const oppejoud = oppejoudService.otsiOppejoudu(id);
        if (!oppejoud) {
          return res.status(responseCodes.badRequest).json({
            message: `Ei leitud õppejoudu, kelle id oleks: ${id}`,
          });
        }
        oppejoudService.kustutaOppejoud(id);
        return res.status(responseCodes.noContent).json({});
      },

      lisaOppejoud: (req: Request, res: Response) => {
        const { eesNimi, pereNimi } = req.body;
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
        const id = oppejoudService.lisaOppejoud(eesNimi, pereNimi);
        return res.status(responseCodes.created).json({
          id,
        });
      },

      uuendaOppejoudu: (req: Request, res: Response) => {
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
        const oppejoud = oppejoudService.otsiOppejoudu(id);
        if (!oppejoud) {
          return res.status(responseCodes.badRequest).json({
            error: `Ei leitud õppejoudu, kelle id oleks: ${id}`,
          });
        }
        
        oppejoudService.uuendaOppejoudu({ id, eesNimi, pereNimi });
        return res.status(responseCodes.noContent).json({});
      },
};

export default oppejoudController;

