import { Request, Response } from 'express';
import db from '../../db';
import responseCodes from '../general/responseCodes';
import paevService from './service';

const paevController = {

    kuvaKoikPaevad: (req: Request, res: Response) => {
        const nadalapaev = paevService.kuvaKoikPaevad();
        return res.status(responseCodes.ok).json({
          nadalapaev,
        });
      },

      otsiPaeva: (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id, 10);
        if (!id) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada ID',
          });
        }

        const nadalapaev = paevService.otsiPaeva(id);
        if (!nadalapaev) {
          return res.status(responseCodes.badRequest).json({
            error: `Ei leitud päeva, mille id oleks: ${id}`,
          });
        }
        return res.status(responseCodes.ok).json({
          nadalapaev,
        });
      },

      kustutaPaev:  (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id, 10);
        if (!id) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada ID',
          });
        }
        const nadalapaev = paevService.otsiPaeva(id);
        if (!nadalapaev) {
          return res.status(responseCodes.badRequest).json({
            message: `Ei leitud päeva, mille id oleks: ${id}`,
          });
        }
        paevService.kustutaPaev(id);
        return res.status(responseCodes.noContent).json({});
      },

      lisaPaev: (req: Request, res: Response) => {
        const { paevaNimi } = req.body;
        if (!paevaNimi) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada nädalapäev',
          });
        }
        const id = paevService.lisaPaev(paevaNimi);
        return res.status(responseCodes.created).json({
          id,
        });
      },

      uuendaPaeva: (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id, 10);
        const { paevaNimi } = req.body;
        if (!id) {
          return res.status(responseCodes.badRequest).json({
            error: 'Vajalik on täpsustada ID',
          });
        }
        if (!paevaNimi) {
          return res.status(responseCodes.badRequest).json({
            error: 'Pole midagi uuendada',
          });
        }
        const nadalapaev = paevService.otsiPaeva(id);
        if (!nadalapaev) {
          return res.status(responseCodes.badRequest).json({
            error: `Ei leitud päeva, mille id oleks: ${id}`,
          });
        }
        
        paevService.uuendaPaeva({ id, paevaNimi });
        return res.status(responseCodes.noContent).json({});
      },
};

export default paevController;