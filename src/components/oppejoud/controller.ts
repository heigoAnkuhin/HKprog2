import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import { uusOppejoud } from './interfaces';
import oppejoudService from './service';

const oppejoudController = {

    kuvaKoikOppejoud: async (req: Request, res: Response) => {
        const oppejoud = await oppejoudService.kuvaKoikOppejoud();
        return res.status(responseCodes.ok).json({
          oppejoud,
        });
      },

      otsiOppejoudu: async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id, 10);
        if (!id) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada ID',
          });
        }

        const oppejoud = await oppejoudService.otsiOppejoudu(id);
        if (!oppejoud) {
          return res.status(responseCodes.badRequest).json({
            error: `Ei leitud õppejoudu, kelle id oleks: ${id}`,
          });
        }
        return res.status(responseCodes.ok).json({
          oppejoud,
        });
      },

      kustutaOppejoud:  async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id, 10);
        if (!id) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada ID',
          });
        }
        const oppejoud = await oppejoudService.otsiOppejoudu(id);
        if (!oppejoud) {
          return res.status(responseCodes.badRequest).json({
            message: `Ei leitud õppejoudu, kelle id oleks: ${id}`,
          });
        }
        oppejoudService.kustutaOppejoud(id);
        return res.status(responseCodes.noContent).json({});
      },

      lisaOppejoud: async (req: Request, res: Response) => {
        const { eesNimi, pereNimi, kasutaja_id } = req.body;
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
        if (!kasutaja_id) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada kasutaja ID',
          });
        }
        const uusOppejoud: uusOppejoud = {
          eesNimi,
          pereNimi,
          kasutaja_id,
        };
        const id = await oppejoudService.lisaOppejoud(uusOppejoud);
        return res.status(responseCodes.created).json({
          id,
        });
      },

      uuendaOppejoudu: async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id, 10);
        const { eesNimi, pereNimi, kasutaja_id } = req.body;
        if (!id) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada ID',
          });
        }
        if (!eesNimi && !pereNimi && !kasutaja_id) {
          return res.status(responseCodes.badRequest).json({
            error: 'Pole midagi uuendada',
          });
        }
        const oppejoud = await oppejoudService.otsiOppejoudu(id);
        if (!oppejoud) {
          return res.status(responseCodes.badRequest).json({
            error: `Ei leitud õppejoudu, kelle id oleks: ${id}`,
          });
        }
        
        oppejoudService.uuendaOppejoudu({ id, eesNimi, pereNimi, kasutaja_id });
        return res.status(responseCodes.noContent).json({});
      },
};

export default oppejoudController;

