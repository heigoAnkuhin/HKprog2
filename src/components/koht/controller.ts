import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import { uusKoht } from './interfaces';
import kohtService from './service';

const kohtController = {

    kuvaKoikKohad: async (req: Request, res: Response) => {
        const koht = await kohtService.kuvaKoikKohad();
        return res.status(responseCodes.ok).json({
          koht,
        });
      },

      otsiKohta: async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id, 10);
        if (!id) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada ID',
          });
        }

        const koht = await kohtService.otsiKohta(id);
        if (!koht) {
          return res.status(responseCodes.badRequest).json({
            error: `Ei leitud kohta, mille id oleks: ${id}`,
          });
        }
        return res.status(responseCodes.ok).json({
          koht,
        });
      },

      kustutaKoht:  async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id, 10);
        if (!id) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada ID',
          });
        }
        const koht = await kohtService.otsiKohta(id);
        if (!koht) {
          return res.status(responseCodes.badRequest).json({
            message: `Ei leitud kohta, mille id oleks: ${id}`,
          });
        }
        kohtService.kustutaKoht(id);
        return res.status(responseCodes.noContent).json({});
      },

      lisaKoht: async (req: Request, res: Response) => {
        const { kohaNimi } = req.body;
        if (!kohaNimi) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada koht',
          });
        }
        const uusKoht: uusKoht = {
          kohaNimi,
        };
        const id = await kohtService.lisaKoht(kohaNimi);
        return res.status(responseCodes.created).json({
          id,
        });
      },

      uuendaKohta: async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id, 10);
        const { kohaNimi } = req.body;
        if (!id) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada ID',
          });
        }
        if (!kohaNimi) {
          return res.status(responseCodes.badRequest).json({
            error: 'Pole midagi uuendada',
          });
        }
        const koht = await kohtService.otsiKohta(id);
        if (!koht) {
          return res.status(responseCodes.badRequest).json({
            error: `Ei leitud kohta, mille id oleks: ${id}`,
          });
        }
        
        kohtService.uuendaKohta({ id, kohaNimi });
        return res.status(responseCodes.noContent).json({});
      },
};

export default kohtController;