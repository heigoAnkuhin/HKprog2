import { Request, Response } from 'express';
import db from '../../db';
import responseCodes from '../general/responseCodes';
import kohtService from './service';

const kohtController = {

    kuvaKoikKohad: (req: Request, res: Response) => {
        const koht = kohtService.kuvaKoikKohad();
        return res.status(responseCodes.ok).json({
          koht,
        });
      },

      otsiKohta: (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id, 10);
        if (!id) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada ID',
          });
        }

        const koht = kohtService.otsiKohta(id);
        if (!koht) {
          return res.status(responseCodes.badRequest).json({
            error: `Ei leitud kohta, mille id oleks: ${id}`,
          });
        }
        return res.status(responseCodes.ok).json({
          koht,
        });
      },

      kustutaKoht:  (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id, 10);
        if (!id) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada ID',
          });
        }
        const koht = kohtService.otsiKohta(id);
        if (!koht) {
          return res.status(responseCodes.badRequest).json({
            message: `Ei leitud kohta, mille id oleks: ${id}`,
          });
        }
        kohtService.kustutaKoht(id);
        return res.status(responseCodes.noContent).json({});
      },

      lisaKoht: (req: Request, res: Response) => {
        const { kohaNimi } = req.body;
        if (!kohaNimi) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada koht',
          });
        }
        const id = kohtService.lisaKoht(kohaNimi);
        return res.status(responseCodes.created).json({
          id,
        });
      },

      uuendaKohta: (req: Request, res: Response) => {
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
        const koht = kohtService.otsiKohta(id);
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